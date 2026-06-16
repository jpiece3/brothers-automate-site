import type { IncomingMessage, ServerResponse } from 'http';

interface VercelRequest extends IncomingMessage {
  method: string;
  headers: Record<string, string | string[] | undefined>;
  body: any;
}

interface VercelResponse extends ServerResponse {
  status(code: number): VercelResponse;
  json(data: any): void;
}

// ---------------------------------------------------------------------------
// Email-gated step of the Free AI Audit. Takes the scan signals + the lead's
// details, turns them into a prioritized AI-opportunity report (ChatGPT when
// OPENAI_API_KEY is set, deterministic rule-based fallback otherwise), then
// captures the lead (Gumloop webhook + Supabase, both best-effort).
// ---------------------------------------------------------------------------

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_AUDIT_MODEL || 'gpt-4o-mini';

// Gumloop webhook for audit leads. Falls back to logging so the form stays
// functional before the pipeline is wired up. Mirrors api/rfq-submit.ts.
const AUDIT_WEBHOOK_URL = process.env.AUDIT_WEBHOOK_URL || '';
const AUDIT_WEBHOOK_AUTH = process.env.AUDIT_WEBHOOK_AUTH || 'Bearer 14fc1dec6b58454e8c528db04f4e744d';

// Audit leads live in the dedicated Brothers Automate Supabase project
// (ghoomqpsgdtvffielnaq), separate from the legacy client-intel project.
// Override via Vercel env vars if you rotate keys.
const AUDIT_SUPABASE_URL =
  process.env.AUDIT_SUPABASE_URL || 'https://ghoomqpsgdtvffielnaq.supabase.co';
const AUDIT_SUPABASE_KEY =
  process.env.AUDIT_SUPABASE_PUBLISHABLE_KEY ||
  process.env.AUDIT_SUPABASE_KEY ||
  'sb_publishable_q-1g28SUvy8lEqbjkWwJvg_TJPXQn5O';

// Brothers Automate build catalog, used to ground recommendations so the LLM
// (and the fallback) always map findings back to something we actually ship.
const BUILDS = [
  { name: 'Inbound AI SDR', slug: 'inbound-ai-sdr', summary: 'Reads, scores, replies to and logs every inbound lead in under 60 seconds.' },
  { name: 'Lead Qualification Quiz', slug: 'quiz-funnels', summary: 'Interactive quiz that qualifies, scores, and nurtures leads automatically.' },
  { name: 'AI Quote Generator', slug: 'cpq-agent', summary: 'Generates and sends accurate quotes in under two minutes.' },
  { name: 'SEO Audit Engine', slug: 'client-scan', summary: 'Automated technical SEO + presence scans turned into client-ready reports.' },
  { name: 'Client Onboarding Automation', slug: 'onboarding-workflow', summary: 'Contracts, questionnaires, provisioning, and kickoff scheduling with zero manual steps.' },
  { name: 'AI Resume Screener', slug: 'screenfast', summary: 'Ingests, ranks, and shortlists candidates from hundreds of resumes in minutes.' },
  { name: 'After-Hours AI Chat', slug: 'after-hours-agent', summary: 'Answers and captures leads 24/7 when no human is at the desk.' },
  { name: 'AI Brand Research', slug: 'brand-research', summary: 'Automated prospect and brand research compiled before every call.' },
];

const BUILD_BY_SLUG = Object.fromEntries(BUILDS.map((b) => [b.slug, b]));

function clean(value: unknown, max = 4000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function isLikelyEmail(email: string): boolean {
  return email.length >= 5 && email.indexOf('@') > 0 && email.lastIndexOf('.') > email.indexOf('@');
}

interface Recommendation {
  title: string;
  category: 'quick-win' | 'strategic';
  impact: 'High' | 'Medium' | 'Low';
  effort: 'Low' | 'Medium' | 'High';
  description: string;
  build: { name: string; slug: string } | null;
  reasoning: string;
}

interface AuditReport {
  headline: string;
  executiveSummary: string;
  recommendations: Recommendation[];
  estimatedHoursPerWeek: number;
  source: 'ai' | 'rules';
}

// ----------------------------- rule-based fallback -------------------------

function ruleBasedReport(signals: any, painPoint: string, domain: string): AuditReport {
  const recs: Recommendation[] = [];
  const s = signals || {};
  const pain = (painPoint || '').toLowerCase();

  const noInstantResponse = !s.hasBookingTool && !s.hasChatWidget;
  if (!s.hasContactForm || noInstantResponse || /lead|follow.?up|response|reply|inbox|miss/.test(pain)) {
    recs.push({
      title: 'Reply to every inbound lead in under 60 seconds',
      category: 'quick-win',
      impact: 'High',
      effort: 'Medium',
      description: 'Auto-score, reply to, and log every inbound inquiry the moment it lands, and ping you on the hot ones.',
      build: BUILD_BY_SLUG['inbound-ai-sdr'],
      reasoning: !s.hasContactForm
        ? 'No contact/quote form was detected, so inbound interest has nowhere to land and nothing to respond to it.'
        : 'No booking link or chat was found, so leads currently wait on a human to reply.',
    });
  }

  if (noInstantResponse) {
    recs.push({
      title: 'Capture after-hours leads with a 24/7 AI chat',
      category: 'quick-win',
      impact: 'High',
      effort: 'Low',
      description: 'An always-on assistant answers common questions and captures contact details when no one is at the desk.',
      build: BUILD_BY_SLUG['after-hours-agent'],
      reasoning: 'There is no chat widget or booking tool, so visitors outside business hours leave without a way to engage.',
    });
  }

  if (/quote|estimate|pricing|proposal|bid/.test(pain) || !s.hasBookingTool) {
    recs.push({
      title: 'Send quotes before the prospect hangs up',
      category: 'strategic',
      impact: 'High',
      effort: 'Medium',
      description: 'Turn call or form details into an accurate, branded quote delivered to their inbox in under two minutes.',
      build: BUILD_BY_SLUG['cpq-agent'],
      reasoning: 'Manual quoting is one of the slowest, most deal-losing steps for service businesses.',
    });
  }

  const seoWeak = (s.seoScore != null && s.seoScore < 75) || !s.hasMetaDescription || s.h1Count !== 1 || (s.wordCount || 0) < 400;
  if (seoWeak) {
    recs.push({
      title: 'Turn your site into a lead-qualifying funnel',
      category: 'strategic',
      impact: 'Medium',
      effort: 'Medium',
      description: 'Add an interactive quiz that qualifies and segments visitors, then routes hot leads straight to your calendar.',
      build: BUILD_BY_SLUG['quiz-funnels'],
      reasoning: 'SEO and on-page signals are soft, so the traffic you do earn is not being converted or qualified.',
    });
  }

  if (/hire|hiring|resume|recruit|staff|applicant/.test(pain)) {
    recs.push({
      title: 'Shortlist the best candidates automatically',
      category: 'strategic',
      impact: 'Medium',
      effort: 'Medium',
      description: 'Screen and rank inbound resumes so you only spend time on the few worth interviewing.',
      build: BUILD_BY_SLUG['screenfast'],
      reasoning: 'You mentioned hiring pressure, screening is a high-volume, rules-based task AI handles well.',
    });
  }

  if (/onboard|contract|paperwork|intake|welcome/.test(pain)) {
    recs.push({
      title: 'Onboard new clients with zero manual steps',
      category: 'quick-win',
      impact: 'Medium',
      effort: 'Low',
      description: 'Automate contracts, questionnaires, account setup, and kickoff scheduling the moment a client says yes.',
      build: BUILD_BY_SLUG['onboarding-workflow'],
      reasoning: 'Onboarding came up as a pain point, and it is a repeatable sequence ideal for automation.',
    });
  }

  // Always ensure at least the research build is present as a closer.
  if (recs.length < 3) {
    recs.push({
      title: 'Walk into every call already researched',
      category: 'quick-win',
      impact: 'Medium',
      effort: 'Low',
      description: 'Auto-compile prospect and brand research before each meeting so prep takes seconds, not hours.',
      build: BUILD_BY_SLUG['brand-research'],
      reasoning: 'A fast, universal win that frees up prep time across the whole team.',
    });
  }

  const trimmed = recs.slice(0, 6);
  const hours = 4 + trimmed.length * 1.5;

  return {
    headline: `Where AI fits in ${domain || 'your business'}`,
    executiveSummary: `Based on a scan of ${domain || 'your site'}${painPoint ? ` and what you told us ("${painPoint.slice(0, 120)}")` : ''}, the biggest opportunities are around capturing and responding to inbound leads faster and removing repetitive manual steps. We mapped ${trimmed.length} automations to the gaps we found, ordered by how quickly they pay off.`,
    recommendations: trimmed,
    estimatedHoursPerWeek: Math.round(hours),
    source: 'rules',
  };
}

// ----------------------------- OpenAI (ChatGPT) ----------------------------

async function openAiReport(signals: any, painPoint: string, business: string, domain: string): Promise<AuditReport | null> {
  if (!OPENAI_API_KEY) return null;

  const system = `You are a senior automation consultant at Brothers Automate, a firm that builds AI systems for service businesses doing $1-15M in revenue. You analyze a website audit and a stated pain point, then recommend 5-7 specific, high-leverage AI/automation opportunities. Every recommendation MUST map to one of these Brothers Automate builds (use the exact slug):\n${BUILDS.map((b) => `- ${b.name} (slug: ${b.slug}): ${b.summary}`).join('\n')}\n\nBe concrete and grounded in the audit signals. No fluff. Prioritize quick wins first. Return ONLY valid JSON (no markdown, no code fences) matching exactly:\n{\n  "headline": "string (<=60 chars)",\n  "executiveSummary": "string (2-3 sentences)",\n  "estimatedHoursPerWeek": number,\n  "recommendations": [\n    {\n      "title": "string",\n      "category": "quick-win" | "strategic",\n      "impact": "High" | "Medium" | "Low",\n      "effort": "Low" | "Medium" | "High",\n      "description": "string (1-2 sentences, what it does)",\n      "buildSlug": "one of the slugs above",\n      "reasoning": "string (tie it to a specific audit signal or the pain point)"\n    }\n  ]\n}`;

  const user = `WEBSITE: ${domain}\nBUSINESS: ${business || 'unknown'}\nSTATED PAIN POINT: ${painPoint || '(none provided)'}\n\nAUDIT SIGNALS (JSON):\n${JSON.stringify(signals).slice(0, 6000)}`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.4,
        max_tokens: 1600,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });

    if (!res.ok) {
      console.error('OpenAI audit error', res.status, await res.text().catch(() => ''));
      return null;
    }

    const data: any = await res.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const recs: Recommendation[] = (parsed.recommendations || [])
      .slice(0, 7)
      .map((r: any) => {
        const build = BUILD_BY_SLUG[r.buildSlug] || null;
        return {
          title: clean(r.title, 120),
          category: r.category === 'strategic' ? 'strategic' : 'quick-win',
          impact: ['High', 'Medium', 'Low'].includes(r.impact) ? r.impact : 'Medium',
          effort: ['Low', 'Medium', 'High'].includes(r.effort) ? r.effort : 'Medium',
          description: clean(r.description, 400),
          build: build ? { name: build.name, slug: build.slug } : null,
          reasoning: clean(r.reasoning, 400),
        };
      })
      .filter((r: Recommendation) => r.title && r.description);

    if (!recs.length) return null;

    return {
      headline: clean(parsed.headline, 80) || `Where AI fits in ${domain}`,
      executiveSummary: clean(parsed.executiveSummary, 800),
      recommendations: recs,
      estimatedHoursPerWeek: Number.isFinite(parsed.estimatedHoursPerWeek) ? Math.round(parsed.estimatedHoursPerWeek) : 6,
      source: 'ai',
    };
  } catch (err) {
    console.error('OpenAI audit parse/network error', err);
    return null;
  }
}

// ----------------------------- lead capture --------------------------------

async function forwardLead(payload: Record<string, unknown>): Promise<void> {
  if (!AUDIT_WEBHOOK_URL) {
    console.warn('audit-submit: AUDIT_WEBHOOK_URL not configured, lead logged only', {
      email: payload.email,
      business: payload.business,
      url: payload.scanned_url,
    });
    return;
  }
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (AUDIT_WEBHOOK_AUTH) headers.Authorization = AUDIT_WEBHOOK_AUTH;
    const r = await fetch(AUDIT_WEBHOOK_URL, { method: 'POST', headers, body: JSON.stringify(payload) });
    if (!r.ok) console.error('audit-submit: webhook non-200', r.status, await r.text().catch(() => ''));
  } catch (err) {
    console.error('audit-submit: webhook failed', err);
  }
}

async function persistSupabase(row: Record<string, unknown>): Promise<void> {
  try {
    const r = await fetch(`${AUDIT_SUPABASE_URL}/rest/v1/audit_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: AUDIT_SUPABASE_KEY,
        Authorization: `Bearer ${AUDIT_SUPABASE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    if (!r.ok) console.error('audit-submit: supabase insert non-200', r.status, await r.text().catch(() => ''));
  } catch (err) {
    console.error('audit-submit: supabase insert failed', err);
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot, bots fill this; humans never see it. Silently succeed.
  if (clean(body.website_hp, 200)) {
    res.status(200).json({ status: 'ok' });
    return;
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);
  const business = clean(body.business, 160);
  const businessType = clean(body.business_type, 120);
  const painPoint = clean(body.pain_point, 2000);
  const scannedUrl = clean(body.url, 300);
  const domain = clean(body.domain, 160) || scannedUrl;
  const score = Number.isFinite(body.score as number) ? Number(body.score) : null;
  const signals = (body.signals && typeof body.signals === 'object') ? body.signals : {};
  const source = clean(body.source, 80) || 'free-ai-audit';

  if (!name) {
    res.status(400).json({ error: 'Name is required.' });
    return;
  }
  if (!email || !isLikelyEmail(email)) {
    res.status(400).json({ error: 'A valid email is required.' });
    return;
  }

  // Build the report, AI first, deterministic fallback if anything is off.
  const report = (await openAiReport(signals, painPoint, business || businessType, domain)) || ruleBasedReport(signals, painPoint, domain);

  const submittedAt = new Date().toISOString();

  // Lead capture, both best-effort and non-blocking for the response UX.
  const leadPayload = {
    name,
    email,
    phone,
    business: business || businessType,
    business_type: businessType,
    pain_point: painPoint,
    scanned_url: scannedUrl,
    audit_score: score,
    recommended_builds: report.recommendations.map((r) => r.build?.name).filter(Boolean).join(', '),
    report_source: report.source,
    source,
    submitted_at: submittedAt,
  };

  await Promise.allSettled([
    forwardLead(leadPayload),
    persistSupabase({
      name,
      email,
      phone: phone || null,
      business: business || businessType || null,
      business_type: businessType || null,
      pain_point: painPoint || null,
      scanned_url: scannedUrl || null,
      audit_score: score,
      recommendations: report.recommendations,
      report_source: report.source,
      source,
      created_at: submittedAt,
    }),
  ]);

  res.status(200).json({ status: 'ok', report });
}
