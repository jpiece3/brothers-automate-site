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
// AI Workflow Scorecard submission. Takes the questionnaire answers (plus the
// optional website scan context), produces a prioritized workflow report of
// 3-5 opportunities (ChatGPT when OPENAI_API_KEY is set, deterministic
// rule-based fallback otherwise), then captures the lead in Supabase and the
// optional webhook. The report NEVER invents volume, cost, or time-saving
// numbers: estimates are ranges derived from the submitted frequency and
// time-per-occurrence, or explicitly marked "Needs confirmation".
// ---------------------------------------------------------------------------

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || '';
const OPENAI_MODEL = process.env.OPENAI_AUDIT_MODEL || 'gpt-4o-mini';

const AUDIT_WEBHOOK_URL = process.env.AUDIT_WEBHOOK_URL || '';
const AUDIT_WEBHOOK_AUTH = process.env.AUDIT_WEBHOOK_AUTH || 'Bearer 14fc1dec6b58454e8c528db04f4e744d';

const AUDIT_SUPABASE_URL =
  process.env.AUDIT_SUPABASE_URL || 'https://ghoomqpsgdtvffielnaq.supabase.co';
const AUDIT_SUPABASE_KEY =
  process.env.AUDIT_SUPABASE_PUBLISHABLE_KEY ||
  process.env.AUDIT_SUPABASE_KEY ||
  'sb_publishable_q-1g28SUvy8lEqbjkWwJvg_TJPXQn5O';

function clean(value: unknown, max = 4000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function isLikelyEmail(email: string): boolean {
  return email.length >= 5 && email.indexOf('@') > 0 && email.lastIndexOf('.') > email.indexOf('@');
}

// ----------------------------- types ---------------------------------------

type NextStep = 'train' | 'automate' | 'clarify' | 'leave';
type Risk = 'low' | 'medium' | 'high';

interface Opportunity {
  title: string;
  currentProcess: string;
  trigger: string;
  inputs: string;
  proposedWorkflow: string;
  humanReview: string;
  volume: string;
  timeSaving: string;
  assumptions: string[];
  risk: Risk;
  nextStep: NextStep;
}

interface WorkflowReport {
  headline: string;
  summary: string;
  opportunities: Opportunity[];
  source: 'ai' | 'rules';
}

interface Answers {
  business_type: string;
  team_size: string;
  after_hours: string;
  repeat_tasks: string;
  inquiries: string;
  estimates: string;
  tools: string;
  copying: string;
  delays: string;
  frequency: string;
  time_each: string;
  example: string;
}

// ----------------------------- volume math ---------------------------------
// The only place time-saving ranges come from. Everything else says
// "Needs confirmation".

const FREQ_PER_WEEK: Record<string, [number, number, string]> = {
  'multiple-daily': [10, 25, 'several times a day'],
  daily: [5, 7, 'about daily'],
  'few-weekly': [2, 4, 'a few times a week'],
  weekly: [1, 1, 'about weekly'],
  monthly: [0.25, 0.25, 'about monthly'],
};

const MINUTES_EACH: Record<string, [number, number, string]> = {
  'under-15': [5, 15, 'under 15 min each'],
  '15-30': [15, 30, '15-30 min each'],
  '30-60': [30, 60, '30-60 min each'],
  '60-120': [60, 120, '1-2 hrs each'],
  'over-120': [120, 180, '2+ hrs each'],
};

interface VolumeBasis {
  volumeLabel: string;
  savingLabel: string;
  basis: string;
}

function computeVolumeBasis(frequency: string, timeEach: string): VolumeBasis | null {
  const f = FREQ_PER_WEEK[frequency];
  const t = MINUTES_EACH[timeEach];
  if (!f || !t) return null;

  const lowMin = f[0] * t[0];
  const highMin = f[1] * t[1];
  const fmt = (mins: number) => (mins >= 60 ? `${Math.round((mins / 60) * 10) / 10} hrs` : `${Math.round(mins)} min`);

  // Assume an AI-assisted version recovers roughly 40-70% of the manual time.
  // This assumption is surfaced verbatim in the report, never hidden.
  const saveLow = fmt(lowMin * 0.4);
  const saveHigh = fmt(highMin * 0.7);

  return {
    volumeLabel: `${f[2]}, ${t[2]} (as submitted)`,
    savingLabel: `${saveLow}-${saveHigh} per week`,
    basis: `${f[2]} x ${t[2]} = ${fmt(lowMin)}-${fmt(highMin)}/week of current manual time; range assumes AI assistance recovers 40-70% of it`,
  };
}

// ----------------------------- rule-based fallback --------------------------

function quote(text: string, max = 180): string {
  const t = text.replace(/\s+/g, ' ').trim();
  return t.length > max ? `${t.slice(0, max)}…` : t;
}

function ruleBasedReport(a: Answers): WorkflowReport {
  const ops: Opportunity[] = [];
  const vb = computeVolumeBasis(a.frequency, a.time_each);
  const NEEDS = 'Needs confirmation';

  // The frequency/time answer applies to the single most time-consuming
  // process the user described, so only the first (highest-priority) card
  // gets the computed range.
  let volumeUsed = false;
  function volumeFor(): { volume: string; timeSaving: string; basisAssumption: string | null } {
    if (vb && !volumeUsed) {
      volumeUsed = true;
      return { volume: vb.volumeLabel, timeSaving: vb.savingLabel, basisAssumption: `Time-saving basis: ${vb.basis}.` };
    }
    return { volume: NEEDS, timeSaving: NEEDS, basisAssumption: null };
  }

  if (a.inquiries) {
    const v = volumeFor();
    ops.push({
      title: 'Inbound inquiry intake and first response',
      currentProcess: `You told us: "${quote(a.inquiries)}"`,
      trigger: 'A new inquiry arrives (call, email, form, or referral).',
      inputs: 'The inquiry itself, plus whatever context your team needs to respond (service area, availability, pricing rules).',
      proposedWorkflow: 'AI drafts the first reply, logs the inquiry, and flags which ones look urgent. A person reviews and sends.',
      humanReview: 'A person approves every outgoing reply before it is sent, at least until the drafts are consistently right.',
      volume: v.volume,
      timeSaving: v.timeSaving,
      assumptions: [
        'Assumes inquiries arrive through channels AI can read (email, form, transcribed calls).',
        v.basisAssumption || 'We did not get enough volume detail to estimate time saved; we would confirm this on a call.',
      ].filter(Boolean) as string[],
      risk: 'medium',
      nextStep: 'automate',
    });
  }

  if (a.estimates) {
    const v = volumeFor();
    ops.push({
      title: 'Estimate and proposal drafting',
      currentProcess: `You told us: "${quote(a.estimates)}"`,
      trigger: 'A qualified inquiry needs a price, proposal, or written report.',
      inputs: 'Job details, your pricing rules or past examples, and the template you already use.',
      proposedWorkflow: 'AI assembles a first draft from your rules and past examples. The person who owns estimates reviews, adjusts, and sends.',
      humanReview: 'The estimate owner reviews every draft. Pricing never goes out without human sign-off.',
      volume: v.volume,
      timeSaving: v.timeSaving,
      assumptions: [
        'Assumes your pricing follows rules or past examples that can be written down.',
        v.basisAssumption || 'Volume and time per estimate need confirmation before we can put a range on this.',
      ].filter(Boolean) as string[],
      risk: 'medium',
      nextStep: 'train',
    });
  }

  if (a.copying) {
    const v = volumeFor();
    const toolsKnown = Boolean(a.tools);
    ops.push({
      title: 'Manual copying between systems',
      currentProcess: `You told us: "${quote(a.copying)}"`,
      trigger: 'Information lands in one place (email, form, spreadsheet) and has to be re-typed into another.',
      inputs: `The source and destination systems${toolsKnown ? ` (you mentioned: ${quote(a.tools, 100)})` : ''} and the rules for what goes where.`,
      proposedWorkflow: toolsKnown
        ? 'A repeatable automation moves the data between the tools you named, with an exception queue for anything it is not sure about.'
        : 'Map exactly which fields move between which systems first. Once the path is written down, this is usually a strong automation candidate.',
      humanReview: 'A person spot-checks the exception queue; the automation never guesses on ambiguous records.',
      volume: v.volume,
      timeSaving: v.timeSaving,
      assumptions: [
        toolsKnown
          ? 'Assumes the tools you named have usable exports, APIs, or integration options; we verify this before building.'
          : 'We need to confirm which systems are involved before scoping this.',
        v.basisAssumption,
      ].filter(Boolean) as string[],
      risk: 'low',
      nextStep: toolsKnown ? 'automate' : 'clarify',
    });
  }

  if (a.delays) {
    const v = volumeFor();
    ops.push({
      title: 'Work that gets delayed or depends on one person',
      currentProcess: `You told us: "${quote(a.delays)}"`,
      trigger: 'A task is waiting on someone, approaching a deadline, or stuck because only one person knows how to do it.',
      inputs: 'Where the work lives today (inbox, spreadsheet, job board) and who owns each step.',
      proposedWorkflow: 'Start by writing the process down and training the team to use AI on the drafting-heavy parts. Reminders and status tracking can be automated once the process is stable.',
      humanReview: 'The current owner keeps ownership; AI assists with drafts and reminders, not decisions.',
      volume: v.volume,
      timeSaving: v.timeSaving,
      assumptions: [
        'Assumes the bottleneck is process clarity and drafting time, not a staffing gap.',
        v.basisAssumption || 'We would confirm how often this bites you before estimating recovered time.',
      ].filter(Boolean) as string[],
      risk: 'low',
      nextStep: 'clarify',
    });
  }

  if (a.repeat_tasks && ops.length < 4) {
    const v = volumeFor();
    ops.push({
      title: 'Recurring daily and weekly admin',
      currentProcess: `You told us: "${quote(a.repeat_tasks)}"`,
      trigger: 'The same task comes up on a daily or weekly rhythm.',
      inputs: 'A written example of the task done well, plus wherever its inputs come from today.',
      proposedWorkflow: 'Train the people who own these tasks to use AI for the repetitive drafting and summarizing parts. This is usually training, not automation, until one task proves high-volume enough to systematize.',
      humanReview: 'The task owner stays the owner. AI produces drafts; the person finishes and files them.',
      volume: v.volume,
      timeSaving: v.timeSaving,
      assumptions: [
        'Assumes the output quality of these tasks is easy for the owner to judge quickly.',
        v.basisAssumption,
      ].filter(Boolean) as string[],
      risk: 'low',
      nextStep: 'train',
    });
  }

  // Nothing substantive submitted: return a single honest "clarify" card
  // instead of padding the report.
  if (!ops.length) {
    ops.push({
      title: 'Map the workflow before recommending anything',
      currentProcess: 'The scorecard answers did not include enough detail about how work moves through the business today.',
      trigger: 'N/A until the process is written down.',
      inputs: 'A 30-minute walkthrough of how an inquiry becomes a finished, invoiced job.',
      proposedWorkflow: 'Walk through one real job end to end, note every handoff and re-typed piece of information, and score each step for repetition, time, and risk. Then decide what deserves AI at all.',
      humanReview: 'This step is entirely human; nothing is automated yet.',
      volume: 'Needs confirmation',
      timeSaving: 'Needs confirmation',
      assumptions: ['No volume or process detail was submitted, so no estimate is possible or honest.'],
      risk: 'low',
      nextStep: 'clarify',
    });
  }

  const trimmed = ops.slice(0, 5);
  const biz = a.business_type ? ` (${quote(a.business_type, 60)})` : '';

  return {
    headline: 'Your workflow report',
    summary: `Based on what you told us about the business${biz}, here ${trimmed.length === 1 ? 'is where we would start' : `are the ${trimmed.length} places we would look first`}. Each card says what should stay human, what the estimate assumes, and whether the right next move is training, automation, clarifying the process, or leaving it alone.`,
    opportunities: trimmed,
    source: 'rules',
  };
}

// ----------------------------- OpenAI (ChatGPT) ----------------------------

const VALID_STEPS: NextStep[] = ['train', 'automate', 'clarify', 'leave'];
const VALID_RISKS: Risk[] = ['low', 'medium', 'high'];

async function openAiReport(a: Answers, website: any): Promise<WorkflowReport | null> {
  if (!OPENAI_API_KEY) return null;

  const vb = computeVolumeBasis(a.frequency, a.time_each);

  const system = `You are a pragmatic operations consultant at Brothers Automate, two former service-business operators who help other service businesses apply AI to real workflows. You are writing a prioritized workflow report from a questionnaire.

HARD RULES — violating any of these makes the report worthless:
1. NEVER invent volume, cost, revenue, ROI, or time-saving numbers. The ONLY permitted time-saving estimate is the precomputed range provided below (apply it ONLY to the single process the user said it describes), or the exact string "Needs confirmation".
2. Output 3-5 opportunities MAXIMUM. Fewer high-confidence opportunities beat padding. If the answers only support 2, output 2.
3. Every opportunity must trace directly to something the user actually wrote. Quote or closely paraphrase their words in currentProcess.
4. nextStep must show judgment: use "train" for work employees should keep owning with AI assistance, "automate" only for genuinely repeatable rule-based processes, "clarify" when the process is too vague to act on, and "leave" for high-risk or low-value tasks. Do NOT recommend automation for everything.
5. Every opportunity states where a human stays in control (humanReview).
6. List the assumptions behind every estimate explicitly.
7. Plain operator language. No words like "revolutionize", "supercharge", "unlock", "transform", "leverage", "seamless".

${vb ? `PRECOMPUTED TIME BASIS (the user said their single most time-consuming process runs ${vb.volumeLabel}): timeSaving="${vb.savingLabel}", basis="${vb.basis}". Use this on that one process only; all other opportunities get "Needs confirmation".` : 'The user did not provide usable frequency/time data. EVERY timeSaving and volume field must be "Needs confirmation".'}

Return ONLY valid JSON (no markdown fences) matching exactly:
{
  "headline": "string (<=70 chars, plain)",
  "summary": "string (2-3 sentences, plain, references what they submitted)",
  "opportunities": [
    {
      "title": "string (<=80 chars)",
      "currentProcess": "string (their words, quoted or closely paraphrased)",
      "trigger": "string (what kicks the process off and what inputs exist)",
      "inputs": "string (what information/documents the workflow needs)",
      "proposedWorkflow": "string (the AI-assisted version, concrete)",
      "humanReview": "string (exactly where a person stays in control)",
      "volume": "string (submitted volume or 'Needs confirmation')",
      "timeSaving": "string (the precomputed range or 'Needs confirmation')",
      "assumptions": ["string", "..."],
      "risk": "low" | "medium" | "high",
      "nextStep": "train" | "automate" | "clarify" | "leave"
    }
  ]
}`;

  const user = `QUESTIONNAIRE ANSWERS:
Business type: ${a.business_type || '(not provided)'}
People on office/admin/sales/coordination work: ${a.team_size || '(not provided)'}
Owner's after-hours work: ${a.after_hours || '(not provided)'}
Tasks repeating daily/weekly: ${a.repeat_tasks || '(not provided)'}
How inquiries are received/assigned/followed up: ${a.inquiries || '(not provided)'}
How estimates/proposals/reports are created: ${a.estimates || '(not provided)'}
Tools in use: ${a.tools || '(not provided)'}
Where info is manually copied between systems: ${a.copying || '(not provided)'}
Work that is delayed/forgotten/one-person-dependent: ${a.delays || '(not provided)'}
Sanitized example provided: ${a.example ? a.example.slice(0, 1500) : '(none)'}
${website && website.domain ? `\nWEBSITE SCAN CONTEXT (separate assessment, use only as supporting color): ${website.domain} scored ${website.score}/100 on the website & lead-capture scan.` : ''}`;

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.3,
        max_tokens: 2400,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
      }),
    });

    if (!res.ok) {
      console.error('workflow-submit: OpenAI error', res.status, await res.text().catch(() => ''));
      return null;
    }

    const data: any = await res.json();
    const raw = data?.choices?.[0]?.message?.content;
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    const ops: Opportunity[] = (parsed.opportunities || [])
      .slice(0, 5)
      .map((o: any) => ({
        title: clean(o.title, 120),
        currentProcess: clean(o.currentProcess, 500),
        trigger: clean(o.trigger, 400),
        inputs: clean(o.inputs, 400),
        proposedWorkflow: clean(o.proposedWorkflow, 600),
        humanReview: clean(o.humanReview, 400),
        volume: clean(o.volume, 160) || 'Needs confirmation',
        timeSaving: clean(o.timeSaving, 160) || 'Needs confirmation',
        assumptions: Array.isArray(o.assumptions) ? o.assumptions.map((s: any) => clean(s, 300)).filter(Boolean).slice(0, 4) : [],
        risk: VALID_RISKS.includes(o.risk) ? o.risk : 'medium',
        nextStep: VALID_STEPS.includes(o.nextStep) ? o.nextStep : 'clarify',
      }))
      .filter((o: Opportunity) => o.title && o.proposedWorkflow && o.currentProcess);

    if (!ops.length) return null;

    return {
      headline: clean(parsed.headline, 90) || 'Your workflow report',
      summary: clean(parsed.summary, 700),
      opportunities: ops,
      source: 'ai',
    };
  } catch (err) {
    console.error('workflow-submit: OpenAI parse/network error', err);
    return null;
  }
}

// ----------------------------- lead capture --------------------------------

async function forwardLead(payload: Record<string, unknown>): Promise<void> {
  if (!AUDIT_WEBHOOK_URL) {
    console.warn('workflow-submit: AUDIT_WEBHOOK_URL not configured, lead logged only', {
      email: payload.email,
      business: payload.business,
    });
    return;
  }
  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (AUDIT_WEBHOOK_AUTH) headers.Authorization = AUDIT_WEBHOOK_AUTH;
    const r = await fetch(AUDIT_WEBHOOK_URL, { method: 'POST', headers, body: JSON.stringify(payload) });
    if (!r.ok) console.error('workflow-submit: webhook non-200', r.status, await r.text().catch(() => ''));
  } catch (err) {
    console.error('workflow-submit: webhook failed', err);
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
    if (!r.ok) console.error('workflow-submit: supabase insert non-200', r.status, await r.text().catch(() => ''));
  } catch (err) {
    console.error('workflow-submit: supabase insert failed', err);
  }
}

// ----------------------------- handler -------------------------------------

const VALID_INTENTS = ['website_audit', 'workflow_audit', 'workflow_sprint', 'clinic_host'];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: bots fill this; humans never see it. Silently succeed.
  if (clean(body.website_hp, 200)) {
    res.status(200).json({ status: 'ok' });
    return;
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const phone = clean(body.phone, 40);

  if (!name) {
    res.status(400).json({ error: 'Please enter your name.' });
    return;
  }
  if (!email || !isLikelyEmail(email)) {
    res.status(400).json({ error: 'A valid email is required.' });
    return;
  }

  const rawAnswers = (body.answers && typeof body.answers === 'object' ? body.answers : {}) as Record<string, unknown>;
  const answers: Answers = {
    business_type: clean(rawAnswers.business_type, 200),
    team_size: clean(rawAnswers.team_size, 40),
    after_hours: clean(rawAnswers.after_hours, 1500),
    repeat_tasks: clean(rawAnswers.repeat_tasks, 1500),
    inquiries: clean(rawAnswers.inquiries, 1500),
    estimates: clean(rawAnswers.estimates, 1500),
    tools: clean(rawAnswers.tools, 500),
    copying: clean(rawAnswers.copying, 1500),
    delays: clean(rawAnswers.delays, 1500),
    frequency: clean(rawAnswers.frequency, 40),
    time_each: clean(rawAnswers.time_each, 40),
    example: clean(rawAnswers.example, 4000),
  };

  if (!answers.business_type) {
    res.status(400).json({ error: 'Please tell us what type of business you operate.' });
    return;
  }

  const websiteRaw = body.website && typeof body.website === 'object' ? (body.website as Record<string, unknown>) : null;
  const website = websiteRaw
    ? {
        url: clean(websiteRaw.url, 300),
        domain: clean(websiteRaw.domain, 160),
        score: Number.isFinite(websiteRaw.score as number) ? Number(websiteRaw.score) : null,
      }
    : null;

  const attrRaw = body.attribution && typeof body.attribution === 'object' ? (body.attribution as Record<string, unknown>) : {};
  const attribution = {
    lead_source: clean(attrRaw.lead_source, 80),
    referral_partner: clean(attrRaw.referral_partner, 120),
    event_name: clean(attrRaw.event_name, 120),
    utm_source: clean(attrRaw.utm_source, 120),
    utm_medium: clean(attrRaw.utm_medium, 120),
    utm_campaign: clean(attrRaw.utm_campaign, 120),
  };

  const intentRaw = clean(body.intent, 40);
  const intent = VALID_INTENTS.includes(intentRaw) ? intentRaw : 'workflow_audit';
  const source = clean(body.source, 80) || 'free-ai-audit';

  const report = (await openAiReport(answers, website)) || ruleBasedReport(answers);

  const submittedAt = new Date().toISOString();

  const leadPayload = {
    name,
    email,
    phone,
    business: answers.business_type,
    business_type: answers.business_type,
    team_size: answers.team_size,
    intent,
    scanned_url: website?.url || '',
    audit_score: website?.score ?? null,
    report_source: report.source,
    opportunity_titles: report.opportunities.map((o) => o.title).join('; '),
    ...attribution,
    source,
    submitted_at: submittedAt,
  };

  await Promise.allSettled([
    forwardLead(leadPayload),
    persistSupabase({
      name,
      email,
      phone: phone || null,
      business: answers.business_type || null,
      business_type: answers.business_type || null,
      // Kept for dashboard compatibility with earlier audit leads.
      pain_point: answers.repeat_tasks || answers.after_hours || null,
      scanned_url: website?.url || null,
      audit_score: website?.score ?? null,
      recommendations: report.opportunities,
      report_source: report.source,
      source,
      intent,
      metadata: {
        attribution,
        answers,
        website,
      },
      created_at: submittedAt,
    }),
  ]);

  res.status(200).json({ status: 'ok', report });
}
