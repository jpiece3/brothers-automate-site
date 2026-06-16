#!/usr/bin/env python3
"""
Brothers Automate, AI Audit, Transcript Analyzer
================================================

Ingests a discovery-call transcript (Fathom, Fireflies, plain text, whatever)
and produces a prioritized set of AI automation recommendations mapped to
Brothers Automate builds, plus a Gamma-ready Markdown report and JSON.

This is the internal counterpart to the public /free-ai-audit flow. It powers
Phase 2 (AI Analysis) and Phase 3 (Report) of the audit process:

    1. Discovery call      -> recorded, transcribed
    2. AI analysis         -> THIS SCRIPT
    3. Report              -> THIS SCRIPT (--markdown), drop into Gamma
    4. Review call         -> walk the client through it

Two analysis modes:
  * LLM mode (default when OPENAI_API_KEY is set): sends the transcript to
    ChatGPT with Brothers Automate's build catalog as grounding and asks for
    structured recommendations. Catches nuance keyword matching misses.
  * Keyword mode (fallback / --no-llm): fast, deterministic pain-point match.

Usage:
  export OPENAI_API_KEY=sk-...            # optional but recommended
  python audit_transcript.py call.txt
  python audit_transcript.py call.txt --markdown report.md --json report.json
  python audit_transcript.py call.txt --no-llm
  python audit_transcript.py call.txt --client "Acme HVAC" --hourly-rate 75

Dependencies: requests (only needed for LLM mode). See requirements.txt.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
from dataclasses import dataclass, field, asdict
from datetime import date
from typing import Optional

# ---------------------------------------------------------------------------
# Brothers Automate build catalog. Keep this in sync with the live site
# (api/audit-submit.ts BUILDS array and src/data/projects.ts).
# ---------------------------------------------------------------------------

TOOL_LIBRARY: dict[str, dict] = {
    "lead_followup": {
        "tool": "Inbound AI SDR",
        "slug": "inbound-ai-sdr",
        "impact": "High",
        "effort": "Medium",
        "description": "Reads, scores (1-10), replies to, and logs every inbound lead in under 60 seconds, and pings you on the hot ones.",
        "keywords": ["late reply", "slow follow", "follow up", "follow-up", "respond to leads",
                     "inbound lead", "missed lead", "didn't get back", "lost the lead", "lead falls through"],
    },
    "lead_qualification": {
        "tool": "Lead Qualification Quiz",
        "slug": "quiz-funnels",
        "impact": "High",
        "effort": "Medium",
        "description": "Interactive quiz that qualifies, scores, segments, and nurtures leads automatically so you only talk to people ready to buy.",
        "keywords": ["unqualified", "tire kicker", "tire-kicker", "qualify", "pre-qualify",
                     "price shopper", "not a fit", "wasting time on leads"],
    },
    "quoting": {
        "tool": "AI Quote Generator",
        "slug": "cpq-agent",
        "impact": "High",
        "effort": "Medium",
        "description": "Turns call or form details into an accurate, branded quote delivered to the inbox in under two minutes.",
        "keywords": ["quote", "estimate", "pricing", "proposal", "bid", "takes forever to quote",
                     "quoting", "send a quote"],
    },
    "onboarding": {
        "tool": "Client Onboarding Automation",
        "slug": "onboarding-workflow",
        "impact": "Medium",
        "effort": "Low",
        "description": "Automates contracts, questionnaires, account provisioning, and kickoff scheduling the moment a client says yes.",
        "keywords": ["onboarding", "onboard", "welcome new client", "sending contracts", "kickoff",
                     "intake", "paperwork", "new client setup"],
    },
    "resume_screening": {
        "tool": "AI Resume Screener",
        "slug": "screenfast",
        "impact": "Medium",
        "effort": "Medium",
        "description": "Ingests, ranks, and shortlists candidates from hundreds of resumes in minutes.",
        "keywords": ["resume", "resumé", "applications", "hiring", "recruit", "cv", "candidates",
                     "screening applicants", "job posting"],
    },
    "after_hours": {
        "tool": "After-Hours AI Chat",
        "slug": "after-hours-agent",
        "impact": "High",
        "effort": "Low",
        "description": "Always-on assistant answers common questions and captures contact details when no one is at the desk.",
        "keywords": ["after hours", "after-hours", "missed call", "voicemail", "nights and weekends",
                     "no one answers", "24/7", "off hours"],
    },
    "research": {
        "tool": "AI Brand Research",
        "slug": "brand-research",
        "impact": "Medium",
        "effort": "Low",
        "description": "Auto-compiles prospect and brand research before each meeting so prep takes seconds, not hours.",
        "keywords": ["research", "background on", "prep for the call", "look them up", "due diligence",
                     "copying across tabs", "spreadsheet research"],
    },
    "reporting": {
        "tool": "Custom Workflow Automation",
        "slug": "signal-engine",
        "impact": "Medium",
        "effort": "Medium",
        "description": "Syncs data across CRM, marketing platforms, spreadsheets, and Slack, and builds the reports you make by hand each week.",
        "keywords": ["manual report", "weekly report", "copy data", "duplicate entry", "update the crm",
                     "spreadsheet", "reconcile", "data entry", "by hand"],
    },
    "review_management": {
        "tool": "5-Star Autopilot",
        "slug": "signal-engine",
        "impact": "Medium",
        "effort": "Low",
        "description": "Automatically requests reviews from happy clients and drafts responses to the ones that come in.",
        "keywords": ["review", "google review", "reputation", "testimonial", "respond to reviews"],
    },
}

IMPACT_RANK = {"High": 3, "Medium": 2, "Low": 1, "Variable": 1}
EFFORT_RANK = {"Low": 1, "Medium": 2, "High": 3, "Variable": 2}


# ---------------------------------------------------------------------------
# Data model
# ---------------------------------------------------------------------------

@dataclass
class Recommendation:
    pain_point: str
    tool: str
    slug: str
    impact: str
    effort: str
    category: str          # "Quick Win" | "Strategic"
    description: str
    reasoning: str
    evidence: list[str] = field(default_factory=list)
    occurrences: int = 0

    @property
    def priority_score(self) -> float:
        # Higher impact and lower effort float to the top.
        return IMPACT_RANK.get(self.impact, 1) * 2 - EFFORT_RANK.get(self.effort, 2)


@dataclass
class AuditAnalysis:
    client: str
    generated_on: str
    analysis_mode: str     # "llm" | "keyword"
    executive_summary: str
    recommendations: list[Recommendation]
    estimated_hours_per_week: float
    hourly_rate: float

    @property
    def estimated_monthly_value(self) -> float:
        return round(self.estimated_hours_per_week * self.hourly_rate * 4.33, 2)


# ---------------------------------------------------------------------------
# Keyword analysis (deterministic fallback)
# ---------------------------------------------------------------------------

def categorize(impact: str, effort: str) -> str:
    if EFFORT_RANK.get(effort, 2) <= 1 and IMPACT_RANK.get(impact, 1) >= 2:
        return "Quick Win"
    if IMPACT_RANK.get(impact, 1) >= 3:
        return "Strategic"
    return "Quick Win" if EFFORT_RANK.get(effort, 2) <= 2 else "Strategic"


def find_evidence(transcript: str, keywords: list[str], limit: int = 2) -> list[str]:
    sentences = re.split(r"(?<=[.!?])\s+", transcript)
    hits: list[str] = []
    low_kw = [k.lower() for k in keywords]
    for sentence in sentences:
        s = sentence.strip()
        if any(k in s.lower() for k in low_kw):
            snippet = re.sub(r"\s+", " ", s)
            if len(snippet) > 220:
                snippet = snippet[:217] + "..."
            hits.append(snippet)
        if len(hits) >= limit:
            break
    return hits


def keyword_analysis(transcript: str) -> list[Recommendation]:
    low = transcript.lower()
    recs: list[Recommendation] = []
    for key, info in TOOL_LIBRARY.items():
        count = sum(low.count(kw.lower()) for kw in info["keywords"])
        if count <= 0:
            continue
        recs.append(
            Recommendation(
                pain_point=key.replace("_", " ").title(),
                tool=info["tool"],
                slug=info["slug"],
                impact=info["impact"],
                effort=info["effort"],
                category=categorize(info["impact"], info["effort"]),
                description=info["description"],
                reasoning=f"Mentioned {count} time(s) in the transcript.",
                evidence=find_evidence(transcript, info["keywords"]),
                occurrences=count,
            )
        )
    recs.sort(key=lambda r: (r.priority_score, r.occurrences), reverse=True)
    return recs


# ---------------------------------------------------------------------------
# LLM analysis (ChatGPT / OpenAI)
# ---------------------------------------------------------------------------

def llm_analysis(transcript: str, client: str) -> Optional[list[Recommendation]]:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return None
    try:
        import requests  # noqa: WPS433 (local import keeps keyword mode dependency-free)
    except ImportError:
        print("[warn] requests not installed; falling back to keyword mode.", file=sys.stderr)
        return None

    model = os.environ.get("OPENAI_AUDIT_MODEL", "gpt-4o-mini")
    catalog = "\n".join(
        f'- {info["tool"]} (slug: {info["slug"]}): {info["description"]}'
        for info in TOOL_LIBRARY.values()
    )
    system = (
        "You are a senior automation consultant at Brothers Automate. You analyze a discovery-call "
        "transcript from a service business and identify 5-7 specific, high-leverage AI automation "
        "opportunities. Every recommendation MUST map to one of these Brothers Automate builds "
        f"(use the exact slug):\n{catalog}\n\n"
        "Pull problems straight from what the owner said. Quote them as evidence. Prioritize quick wins. "
        "Return ONLY valid JSON (no markdown) matching exactly:\n"
        "{\n"
        '  "executive_summary": "string (2-3 sentences)",\n'
        '  "estimated_hours_per_week": number,\n'
        '  "recommendations": [\n'
        '    {"pain_point": "string", "tool": "string", "buildSlug": "slug from list",\n'
        '     "impact": "High|Medium|Low", "effort": "Low|Medium|High",\n'
        '     "category": "Quick Win|Strategic", "description": "string",\n'
        '     "reasoning": "string", "evidence": ["direct quote from transcript"]}\n'
        "  ]\n"
        "}"
    )
    user = f"CLIENT: {client}\n\nTRANSCRIPT:\n{transcript[:18000]}"

    try:
        resp = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
            json={
                "model": model,
                "temperature": 0.4,
                "max_tokens": 1800,
                "response_format": {"type": "json_object"},
                "messages": [
                    {"role": "system", "content": system},
                    {"role": "user", "content": user},
                ],
            },
            timeout=60,
        )
        resp.raise_for_status()
        content = resp.json()["choices"][0]["message"]["content"]
        data = json.loads(content)
    except Exception as exc:  # noqa: BLE001
        print(f"[warn] LLM analysis failed ({exc}); falling back to keyword mode.", file=sys.stderr)
        return None

    slug_to_info = {info["slug"]: info for info in TOOL_LIBRARY.values()}
    recs: list[Recommendation] = []
    for r in data.get("recommendations", [])[:7]:
        slug = r.get("buildSlug", "")
        info = slug_to_info.get(slug, {})
        recs.append(
            Recommendation(
                pain_point=str(r.get("pain_point", "")).strip(),
                tool=str(r.get("tool") or info.get("tool", "")).strip(),
                slug=slug or info.get("slug", ""),
                impact=r.get("impact", "Medium") if r.get("impact") in IMPACT_RANK else "Medium",
                effort=r.get("effort", "Medium") if r.get("effort") in EFFORT_RANK else "Medium",
                category=r.get("category") if r.get("category") in ("Quick Win", "Strategic") else "Quick Win",
                description=str(r.get("description", "")).strip(),
                reasoning=str(r.get("reasoning", "")).strip(),
                evidence=[str(e).strip() for e in r.get("evidence", []) if str(e).strip()][:3],
            )
        )
    recs = [r for r in recs if r.tool and r.description]
    if not recs:
        return None

    # Stash the LLM summary + hours estimate on the first rec via attributes
    # is messy; instead return a tuple-like via module-level. Simpler: attach
    # to the list object. We read them back in run_analysis.
    recs_summary = str(data.get("executive_summary", "")).strip()
    hours = data.get("estimated_hours_per_week")
    setattr(recs, "_summary", recs_summary)  # type: ignore[attr-defined]
    setattr(recs, "_hours", hours)  # type: ignore[attr-defined]
    return recs


# ---------------------------------------------------------------------------
# Orchestration
# ---------------------------------------------------------------------------

def run_analysis(transcript: str, client: str, hourly_rate: float, use_llm: bool) -> AuditAnalysis:
    mode = "keyword"
    recs: Optional[list[Recommendation]] = None
    summary = ""
    hours: Optional[float] = None

    if use_llm:
        recs = llm_analysis(transcript, client)
        if recs is not None:
            mode = "llm"
            summary = getattr(recs, "_summary", "")
            hours = getattr(recs, "_hours", None)

    if recs is None:
        recs = keyword_analysis(transcript)

    if not summary:
        if recs:
            top = ", ".join(r.tool for r in recs[:3])
            summary = (
                f"Based on the discovery call with {client}, the biggest opportunities are around "
                f"{recs[0].pain_point.lower()} and removing repetitive manual work. We mapped "
                f"{len(recs)} automations to what came up, led by {top}."
            )
        else:
            summary = (
                "No clear automation pain points surfaced from the transcript. Recommend a deeper "
                "discovery call focused on where time actually goes day to day."
            )

    if hours is None:
        hours = 3.0 + len(recs) * 1.5

    return AuditAnalysis(
        client=client,
        generated_on=date.today().isoformat(),
        analysis_mode=mode,
        executive_summary=summary,
        recommendations=recs,
        estimated_hours_per_week=round(float(hours), 1),
        hourly_rate=hourly_rate,
    )


# ---------------------------------------------------------------------------
# Rendering
# ---------------------------------------------------------------------------

def render_markdown(a: AuditAnalysis) -> str:
    """Gamma-ready Markdown, one '---' between slides."""
    lines: list[str] = []
    lines.append(f"# AI Opportunity Audit, {a.client}")
    lines.append("")
    lines.append(f"Prepared by Brothers Automate · {a.generated_on}")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Executive Summary")
    lines.append("")
    lines.append(a.executive_summary)
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Priority Matrix")
    lines.append("")
    lines.append("| # | Opportunity | Build | Impact | Effort | Type |")
    lines.append("|---|-------------|-------|--------|--------|------|")
    for i, r in enumerate(a.recommendations, 1):
        lines.append(f"| {i} | {r.pain_point} | {r.tool} | {r.impact} | {r.effort} | {r.category} |")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Recommendations")
    lines.append("")
    for i, r in enumerate(a.recommendations, 1):
        lines.append(f"### {i}. {r.tool}  ·  {r.category}")
        lines.append("")
        lines.append(f"**Addresses:** {r.pain_point}  |  **Impact:** {r.impact}  |  **Effort:** {r.effort}")
        lines.append("")
        lines.append(r.description)
        lines.append("")
        if r.reasoning:
            lines.append(f"_Why:_ {r.reasoning}")
            lines.append("")
        for q in r.evidence:
            lines.append(f"> \"{q}\"")
            lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## 4-Day Quick Start")
    lines.append("")
    quick = [r for r in a.recommendations if r.category == "Quick Win"][:4] or a.recommendations[:4]
    day_titles = ["Day 1", "Day 2", "Day 3", "Day 4"]
    for day, r in zip(day_titles, quick):
        lines.append(f"- **{day}, {r.tool}:** {r.description}")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Financial Impact")
    lines.append("")
    lines.append(f"- Estimated time freed up: **{a.estimated_hours_per_week} hours/week**")
    lines.append(f"- At an assumed **${a.hourly_rate:.0f}/hour** loaded cost: **${a.estimated_monthly_value:,.0f}/month** in recovered capacity")
    lines.append("- Typical tooling cost to run these systems: **~$40/month**")
    lines.append("")
    lines.append("---")
    lines.append("")
    lines.append("## Next Steps")
    lines.append("")
    lines.append("1. Pick the top 1-2 quick wins to implement first.")
    lines.append("2. Decide: build it in-house, or have Brothers Automate build it.")
    lines.append("3. Book the review call to walk through the roadmap.")
    lines.append("")
    lines.append("**Book a call:** https://cal.com/james-pinder/simple-automation-discovery")
    lines.append("")
    return "\n".join(lines)


def render_terminal(a: AuditAnalysis) -> str:
    out = [
        "=" * 64,
        f"AI OPPORTUNITY AUDIT, {a.client}",
        f"Generated {a.generated_on} · mode: {a.analysis_mode}",
        "=" * 64,
        "",
        "EXECUTIVE SUMMARY",
        a.executive_summary,
        "",
        "RECOMMENDATIONS (priority order):",
    ]
    for i, r in enumerate(a.recommendations, 1):
        out.append(f"  {i}. {r.tool}  [{r.category}]  impact={r.impact} effort={r.effort}")
        out.append(f"     addresses: {r.pain_point}")
        out.append(f"     {r.description}")
        if r.evidence:
            out.append(f'     evidence: "{r.evidence[0]}"')
        out.append("")
    out.append(
        f"FINANCIAL IMPACT: ~{a.estimated_hours_per_week} hrs/week "
        f"(~${a.estimated_monthly_value:,.0f}/mo at ${a.hourly_rate:.0f}/hr)"
    )
    return "\n".join(out)


def analysis_to_dict(a: AuditAnalysis) -> dict:
    d = asdict(a)
    d["estimated_monthly_value"] = a.estimated_monthly_value
    return d


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main() -> int:
    parser = argparse.ArgumentParser(description="Analyze a discovery-call transcript into AI audit recommendations.")
    parser.add_argument("transcript", help="Path to the transcript text file.")
    parser.add_argument("--client", default="the client", help="Client / business name for the report.")
    parser.add_argument("--hourly-rate", type=float, default=60.0, help="Loaded hourly cost used for ROI math.")
    parser.add_argument("--no-llm", action="store_true", help="Skip the LLM pass and use keyword matching only.")
    parser.add_argument("--markdown", metavar="PATH", help="Write a Gamma-ready Markdown report to PATH.")
    parser.add_argument("--json", dest="json_path", metavar="PATH", help="Write the structured analysis JSON to PATH.")
    args = parser.parse_args()

    try:
        with open(args.transcript, "r", encoding="utf-8") as fh:
            transcript = fh.read()
    except OSError as exc:
        print(f"Could not read transcript: {exc}", file=sys.stderr)
        return 1

    if not transcript.strip():
        print("Transcript is empty.", file=sys.stderr)
        return 1

    analysis = run_analysis(transcript, args.client, args.hourly_rate, use_llm=not args.no_llm)

    print(render_terminal(analysis))

    if args.markdown:
        with open(args.markdown, "w", encoding="utf-8") as fh:
            fh.write(render_markdown(analysis))
        print(f"\n[ok] Markdown report written to {args.markdown}")

    if args.json_path:
        with open(args.json_path, "w", encoding="utf-8") as fh:
            json.dump(analysis_to_dict(analysis), fh, indent=2)
        print(f"[ok] JSON written to {args.json_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
