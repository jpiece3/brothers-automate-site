# Brothers Automate, Internal Audit Tooling

Two command-line tools that power the **Free AI Audit** process behind the
scenes. They are the internal counterparts to the public flow on
[`/free-ai-audit`](../src/pages/free-ai-audit.astro):

| Tool | Maps to | What it does |
|------|---------|--------------|
| `audit_website.py` | `api/audit-scan.ts` | Scans a prospect's site, scores it, and (optionally) summarizes where AI fits. Use it to pre-audit a target before a call or batch-screen a list. |
| `audit_transcript.py` | `api/audit-submit.ts` | Turns a discovery-call transcript into a prioritized, Gamma-ready audit report. This is Phase 2 + 3 of the audit framework. |

## Setup

```bash
cd tools
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

### Environment variables (all optional)

| Var | Used for | If unset |
|-----|----------|----------|
| `OPENAI_API_KEY` | ChatGPT analysis / summaries | Falls back to deterministic keyword/heuristic mode |
| `OPENAI_AUDIT_MODEL` | Override the model (default `gpt-4o-mini`) | Uses the default |
| `PAGESPEED_API_KEY` | Higher PageSpeed Insights rate limits | Calls keyless (works, just rate-limited) |

## The 4-phase audit process

1. **Discovery call (30-45 min)** — record it (Fathom/Fireflies). Pull problems, don't pitch tools.
2. **AI analysis** — run `audit_transcript.py` on the transcript.
3. **Report** — use `--markdown` output, paste into Gamma, polish, send.
4. **Review call (30 min)** — walk the client through the roadmap. Ask: "Build it yourself, or want help?"

Pre-call, run `audit_website.py` on their domain so you walk in already informed.

## Usage

### Website scan

```bash
python audit_website.py --url robertblue.com --name "Robert E. Blue"
python audit_website.py --url graffen.com --json out.json --markdown out.md
python audit_website.py --url example.com --no-llm        # heuristics only
```

### Transcript analysis

```bash
export OPENAI_API_KEY=sk-...
python audit_transcript.py call.txt --client "Acme HVAC" --hourly-rate 75 \
  --markdown acme-report.md --json acme-report.json

python audit_transcript.py call.txt --no-llm              # keyword mode only
```

The Markdown report is structured as discrete slides (separated by `---`):
Title, Executive Summary, Priority Matrix, Recommendations, 4-Day Quick Start,
Financial Impact, Next Steps. Import straight into Gamma or Google Slides.

## Keeping it in sync

The build catalog (`TOOL_LIBRARY` in `audit_transcript.py`, `BUILDS` in
`audit_website.py`) mirrors `api/audit-submit.ts` and `src/data/projects.ts`.
When we ship a new build, update all of them so recommendations stay accurate.
