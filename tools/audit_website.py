#!/usr/bin/env python3
"""
Brothers Automate, AI Audit, Website Scanner
============================================

Internal CLI counterpart to the public /api/audit-scan endpoint. Crawls a
business's homepage, derives SEO / trust / mobile / lead-capture signals,
pulls a real Google Lighthouse score from PageSpeed Insights (free), and
optionally writes a ChatGPT summary of where AI fits.

Use it to pre-audit a prospect before a discovery call, or to batch-screen a
target list. The scoring mirrors the live site so what you see here matches
what a prospect sees on brothersautomate.com/free-ai-audit.

Usage:
  python audit_website.py --url robertblue.com --name "Robert E. Blue"
  python audit_website.py --url graffen.com --json out.json --markdown out.md
  PAGESPEED_API_KEY=... OPENAI_API_KEY=... python audit_website.py --url example.com

Dependencies: requests, beautifulsoup4, lxml. See requirements.txt.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from dataclasses import dataclass, field, asdict
from datetime import date
from urllib.parse import urlparse, urljoin

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    print("Missing deps. Run: pip install -r tools/requirements.txt", file=sys.stderr)
    raise

PSI_ENDPOINT = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
SOCIAL_HOSTS = ["facebook.com", "instagram.com", "linkedin.com", "twitter.com", "x.com", "youtube.com", "tiktok.com"]
CHAT_HINTS = ["intercom", "drift", "tawk.to", "crisp.chat", "hubspot", "livechat", "tidio", "zendesk"]
BOOKING_HINTS = ["calendly", "cal.com", "acuityscheduling", "youcanbook", "squareup.com/appointments"]


@dataclass
class Signals:
    final_url: str = ""
    status_code: int = 0
    has_ssl: bool = False
    load_ms: int = 0
    title: str = ""
    title_length: int = 0
    has_meta_description: bool = False
    meta_description_length: int = 0
    h1_count: int = 0
    word_count: int = 0
    has_viewport: bool = False
    has_contact_form: bool = False
    has_phone: bool = False
    has_schema: bool = False
    has_open_graph: bool = False
    has_favicon: bool = False
    social_links: list[str] = field(default_factory=list)
    has_chat_widget: bool = False
    has_booking_tool: bool = False
    performance_score: int | None = None
    seo_score: int | None = None
    accessibility_score: int | None = None
    best_practices_score: int | None = None


@dataclass
class Category:
    key: str
    label: str
    score: int
    status: str
    detail: str


@dataclass
class WebsiteAudit:
    business_name: str
    url: str
    domain: str
    scanned_on: str
    score: int
    grade: str
    categories: list[Category]
    findings: list[dict]
    signals: Signals
    ai_summary: str = ""


def normalize_url(raw: str) -> str:
    raw = (raw or "").strip()
    if not raw:
        return ""
    if not re.match(r"^https?://", raw, re.I):
        raw = "https://" + raw
    return raw


def fetch_html(url: str) -> tuple[str, int, int, str]:
    headers = {"User-Agent": "Mozilla/5.0 (compatible; BrothersAutomate-Audit/1.0; +https://brothersautomate.com)"}
    start = time.time()
    resp = requests.get(url, headers=headers, timeout=15, allow_redirects=True)
    load_ms = int((time.time() - start) * 1000)
    resp.raise_for_status()
    return resp.text, resp.status_code, load_ms, resp.url


def analyze_html(html: str, final_url: str, status_code: int, load_ms: int) -> Signals:
    soup = BeautifulSoup(html, "lxml")
    low = html.lower()
    parsed = urlparse(final_url)

    title = (soup.title.string or "").strip() if soup.title and soup.title.string else ""
    meta = soup.find("meta", attrs={"name": "description"})
    meta_desc = (meta.get("content") or "").strip() if meta else ""

    body = soup.body.get_text(separator=" ", strip=True) if soup.body else ""
    word_count = len(body.split())

    forms = soup.find_all("form")
    has_email_tel = any(
        inp.get("type") in {"email", "tel"} for form in forms for inp in form.find_all("input")
    )

    social = sorted({
        host for host in SOCIAL_HOSTS
        for a in soup.find_all("a", href=True)
        if host in a["href"].lower()
    })

    return Signals(
        final_url=final_url,
        status_code=status_code,
        has_ssl=parsed.scheme == "https",
        load_ms=load_ms,
        title=title,
        title_length=len(title),
        has_meta_description=bool(meta_desc),
        meta_description_length=len(meta_desc),
        h1_count=len(soup.find_all("h1")),
        word_count=word_count,
        has_viewport=soup.find("meta", attrs={"name": "viewport"}) is not None,
        has_contact_form=bool(forms) or has_email_tel,
        has_phone="tel:" in low,
        has_schema=("application/ld+json" in low) or ("itemscope" in low),
        has_open_graph='property="og:' in low or "property='og:" in low,
        has_favicon=bool(soup.find("link", rel=lambda v: v and "icon" in v.lower())),
        social_links=social,
        has_chat_widget=any(h in low for h in CHAT_HINTS),
        has_booking_tool=any(h in low for h in BOOKING_HINTS),
    )


def run_pagespeed(url: str) -> dict:
    api_key = os.environ.get("PAGESPEED_API_KEY", "")
    params = [("url", url), ("strategy", "mobile")]
    for cat in ("performance", "seo", "best-practices", "accessibility"):
        params.append(("category", cat))
    if api_key:
        params.append(("key", api_key))
    try:
        resp = requests.get(PSI_ENDPOINT, params=params, timeout=30)
        if not resp.ok:
            return {}
        cats = resp.json().get("lighthouseResult", {}).get("categories", {})

        def pct(c):
            s = cats.get(c, {}).get("score")
            return round(s * 100) if isinstance(s, (int, float)) else None

        return {
            "performance_score": pct("performance"),
            "seo_score": pct("seo"),
            "accessibility_score": pct("accessibility"),
            "best_practices_score": pct("best-practices"),
        }
    except Exception:  # noqa: BLE001
        return {}


def band(score: int) -> str:
    if score >= 75:
        return "pass"
    if score >= 45:
        return "warn"
    return "fail"


def score_categories(s: Signals) -> list[Category]:
    perf = s.performance_score
    if perf is None:
        perf = 90 if s.load_ms <= 800 else 78 if s.load_ms <= 1500 else 60 if s.load_ms <= 2800 else 40 if s.load_ms <= 4500 else 25

    seo = s.seo_score
    if seo is None:
        v = 0
        if s.title and 15 <= s.title_length <= 65:
            v += 25
        elif s.title:
            v += 12
        if s.has_meta_description and s.meta_description_length >= 70:
            v += 25
        elif s.has_meta_description:
            v += 12
        v += 20 if s.h1_count == 1 else (8 if s.h1_count > 1 else 0)
        v += 15 if s.word_count >= 500 else (8 if s.word_count >= 250 else 0)
        v += 15 if s.has_schema else 0
        seo = min(100, v)

    trust = 0
    trust += 22 if s.has_ssl else 0
    trust += 20 if s.has_contact_form else 0
    trust += 12 if s.has_phone else 0
    trust += 16 if s.has_booking_tool else 0
    trust += 14 if len(s.social_links) >= 2 else (7 if s.social_links else 0)
    trust += 8 if s.has_open_graph else 0
    trust += 8 if s.has_favicon else 0
    trust = min(100, trust)

    capture = 0
    capture += 30 if s.has_contact_form else 0
    capture += 25 if s.has_booking_tool else 0
    capture += 25 if s.has_chat_widget else 0
    capture += 10 if s.has_phone else 0
    capture += 10 if s.social_links else 0
    capture = min(100, capture)

    mobile = 100 if s.has_viewport else 30

    return [
        Category("performance", "Speed & Performance", perf, band(perf),
                 "Google Lighthouse (mobile)." if s.performance_score is not None else f"Estimated from a {s.load_ms/1000:.1f}s response."),
        Category("seo", "SEO Foundations", seo, band(seo),
                 "Google Lighthouse." if s.seo_score is not None else "Title, meta, headings, content depth, schema."),
        Category("mobile", "Mobile Readiness", mobile, band(mobile),
                 "Responsive viewport detected." if s.has_viewport else "No mobile viewport tag."),
        Category("trust", "Trust & Credibility", trust, band(trust),
                 "SSL, contact paths, booking, social proof, link previews."),
        Category("capture", "Lead Capture & Automation", capture, band(capture),
                 "How well the site captures and routes inbound interest."),
    ]


def build_findings(categories: list[Category], s: Signals) -> list[dict]:
    findings: list[dict] = []
    if not s.has_contact_form:
        findings.append({"label": "Lead Capture", "severity": "high", "message": "No contact or quote form detected, inbound interest has nowhere to land."})
    if not s.has_booking_tool and not s.has_chat_widget:
        findings.append({"label": "Instant Response", "severity": "high", "message": "No booking link or chat widget, leads wait on a human to reply."})
    if not s.has_meta_description:
        findings.append({"label": "SEO", "severity": "medium", "message": "Missing meta description, lower click-through from search."})
    if s.h1_count != 1:
        findings.append({"label": "SEO", "severity": "medium", "message": f"Found {s.h1_count} H1 tags, search engines want exactly one."})
    if not s.has_ssl:
        findings.append({"label": "Trust", "severity": "high", "message": 'No HTTPS/SSL, browsers flag the site as "Not Secure".'})
    for c in sorted(categories, key=lambda x: x.score):
        if len(findings) >= 5:
            break
        if c.score < 75 and not any(c.key in f["label"].lower() for f in findings):
            findings.append({"label": c.label, "severity": "high" if c.score < 45 else "medium",
                             "message": f"{c.label} scored {c.score}/100, real room to improve."})
    return findings[:5]


def ai_summary(audit_signals: Signals, categories: list[Category], business: str, domain: str) -> str:
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return ""
    model = os.environ.get("OPENAI_AUDIT_MODEL", "gpt-4o-mini")
    payload = {
        "business": business,
        "domain": domain,
        "score_by_category": {c.label: c.score for c in categories},
        "signals": asdict(audit_signals),
    }
    system = (
        "You are an automation consultant at Brothers Automate. Given a website audit, write a tight "
        "3-4 sentence summary of the single biggest opportunity to capture more leads or save time with "
        "AI/automation, grounded in the signals. No fluff, no preamble."
    )
    try:
        resp = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers={"Authorization": f"Bearer {api_key}", "Content-Type": "application/json"},
            json={
                "model": model,
                "temperature": 0.4,
                "max_tokens": 300,
                "messages": [
                    {"role": "system", "content": system},
                    {"role": "user", "content": json.dumps(payload)[:6000]},
                ],
            },
            timeout=45,
        )
        resp.raise_for_status()
        return resp.json()["choices"][0]["message"]["content"].strip()
    except Exception as exc:  # noqa: BLE001
        print(f"[warn] AI summary failed: {exc}", file=sys.stderr)
        return ""


def run_audit(business: str, raw_url: str, use_llm: bool) -> WebsiteAudit:
    url = normalize_url(raw_url)
    html, status, load_ms, final_url = fetch_html(url)
    signals = analyze_html(html, final_url, status, load_ms)
    for k, v in run_pagespeed(final_url).items():
        setattr(signals, k, v)

    categories = score_categories(signals)
    overall = round(sum(c.score for c in categories) / len(categories))
    grade = "A" if overall >= 90 else "B" if overall >= 80 else "C" if overall >= 70 else "D" if overall >= 55 else "F"
    findings = build_findings(categories, signals)
    domain = urlparse(final_url).hostname or raw_url
    domain = domain.replace("www.", "")

    summary = ai_summary(signals, categories, business, domain) if use_llm else ""

    return WebsiteAudit(
        business_name=business,
        url=final_url,
        domain=domain,
        scanned_on=date.today().isoformat(),
        score=overall,
        grade=grade,
        categories=categories,
        findings=findings,
        signals=signals,
        ai_summary=summary,
    )


def render_terminal(a: WebsiteAudit) -> str:
    out = [
        "=" * 60,
        f"WEBSITE AUDIT, {a.business_name}",
        f"{a.url}  ·  {a.scanned_on}",
        "=" * 60,
        f"OVERALL: {a.score}/100  (grade {a.grade})",
        "",
        "CATEGORIES:",
    ]
    for c in a.categories:
        out.append(f"  [{c.status.upper():>4}] {c.label:<26} {c.score:>3}/100  {c.detail}")
    out.append("")
    out.append("TOP FINDINGS:")
    for f in a.findings:
        out.append(f"  ({f['severity']}) {f['label']}: {f['message']}")
    if a.ai_summary:
        out.append("")
        out.append("AI OPPORTUNITY SUMMARY:")
        out.append(f"  {a.ai_summary}")
    return "\n".join(out)


def render_markdown(a: WebsiteAudit) -> str:
    lines = [
        f"# Website Audit, {a.business_name}",
        "",
        f"{a.url} · scanned {a.scanned_on} · Brothers Automate",
        "",
        f"## Overall Score: {a.score}/100 (grade {a.grade})",
        "",
        "| Category | Score | Status | Detail |",
        "|----------|-------|--------|--------|",
    ]
    for c in a.categories:
        lines.append(f"| {c.label} | {c.score}/100 | {c.status} | {c.detail} |")
    lines += ["", "## Top Findings", ""]
    for f in a.findings:
        lines.append(f"- **{f['label']}** ({f['severity']}): {f['message']}")
    if a.ai_summary:
        lines += ["", "## Where AI Fits", "", a.ai_summary]
    lines += ["", "---", "", "**Book a free audit review:** https://cal.com/james-pinder/simple-automation-discovery", ""]
    return "\n".join(lines)


def audit_to_dict(a: WebsiteAudit) -> dict:
    d = asdict(a)
    return d


def main() -> int:
    parser = argparse.ArgumentParser(description="Audit a business website for AI/automation opportunities.")
    parser.add_argument("--url", required=True, help="Website URL (scheme optional).")
    parser.add_argument("--name", default="", help="Business name (for the report header).")
    parser.add_argument("--no-llm", action="store_true", help="Skip the ChatGPT opportunity summary.")
    parser.add_argument("--markdown", metavar="PATH", help="Write a Markdown report to PATH.")
    parser.add_argument("--json", dest="json_path", metavar="PATH", help="Write structured JSON to PATH.")
    args = parser.parse_args()

    business = args.name or (urlparse(normalize_url(args.url)).hostname or args.url).replace("www.", "")

    try:
        audit = run_audit(business, args.url, use_llm=not args.no_llm)
    except requests.RequestException as exc:
        print(f"Could not fetch the site: {exc}", file=sys.stderr)
        return 1

    print(render_terminal(audit))

    if args.markdown:
        with open(args.markdown, "w", encoding="utf-8") as fh:
            fh.write(render_markdown(audit))
        print(f"\n[ok] Markdown written to {args.markdown}")
    if args.json_path:
        with open(args.json_path, "w", encoding="utf-8") as fh:
            json.dump(audit_to_dict(audit), fh, indent=2)
        print(f"[ok] JSON written to {args.json_path}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
