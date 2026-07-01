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

const GUMLOOP_USER_ID = 'hECDCz0xLeYL0xTqi3S7bhbTPlM2';
const GUMLOOP_SAVED_ITEM_ID = '2xf7HgFbJf6dDWQDZUVDxZ';
// Secret lives in Vercel env only — never commit it (this repo is public).
const GUMLOOP_API_KEY = process.env.GUMLOOP_API_KEY || '';

const GUMLOOP_URL = `https://api.gumloop.com/api/v1/start_pipeline?user_id=${GUMLOOP_USER_ID}&saved_item_id=${GUMLOOP_SAVED_ITEM_ID}`;

// Supabase logging target. The anon key is public by design (it ships to
// every browser via the site) and the tables are INSERT-only under RLS.
const SUPABASE_URL = process.env.QUIZ_SUPABASE_URL || 'https://nnxbgderdyjanzwgabxl.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.QUIZ_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ueGJnZGVyZHlqYW56d2dhYnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxODA3MzgsImV4cCI6MjA4NDc1NjczOH0.jpjZ_gH1-2GZgyhXPRzPrZzWWnJtAVgU4yui4KM6wZ8';

const VALID_RESULTS = new Set(['high', 'mid', 'low']);
const VALID_SEGMENTS = new Set(['partner-ready', 'partner-nurture']);

function clean(value: unknown, max = 4000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function isLikelyEmail(email: string): boolean {
  return email.length >= 5 && email.indexOf('@') > 0 && email.lastIndexOf('.') > email.indexOf('@');
}

interface QuizLead {
  name: string;
  email: string;
  quizScore: string;
  quizResult: string;
  quizSegment: string;
  recommendedAutomation: string;
}

// Logs the lead and per-question answers to Supabase. The tables have an
// INSERT-only RLS policy for anon, so PostgREST can't RETURN the inserted
// row — we generate the lead id here instead of asking for it back.
async function logToSupabase(lead: QuizLead, answersJson: string): Promise<boolean> {
  const headers = {
    'Content-Type': 'application/json',
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    Prefer: 'return=minimal',
  };

  try {
    const leadId = crypto.randomUUID();
    const score = Number(lead.quizScore);

    const leadRes = await fetch(`${SUPABASE_URL}/rest/v1/meta_quiz_leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        id: leadId,
        name: lead.name,
        email: lead.email,
        quiz_score: Number.isFinite(score) ? Math.round(score) : null,
        quiz_result: lead.quizResult,
        quiz_segment: lead.quizSegment,
        recommended_automation: lead.recommendedAutomation || null,
      }),
    });
    if (!leadRes.ok) {
      console.error('quiz-submit: supabase lead insert non-200', leadRes.status, await leadRes.text().catch(() => ''));
      return false;
    }

    let parsed: any[] = [];
    try {
      const maybe = JSON.parse(answersJson);
      if (Array.isArray(maybe)) parsed = maybe;
    } catch {
      // answers logging is best-effort; the lead row is what matters
    }
    if (parsed.length) {
      const rows = parsed.slice(0, 50).map((a, i) => ({
        lead_id: leadId,
        question_index: i,
        question_text: clean(a?.question, 500) || null,
        answer_text: clean(a?.answer, 500) || null,
        answer_value: a?.value == null ? null : String(a.value).slice(0, 40),
      }));
      const respRes = await fetch(`${SUPABASE_URL}/rest/v1/meta_quiz_responses`, {
        method: 'POST',
        headers,
        body: JSON.stringify(rows),
      });
      if (!respRes.ok) {
        console.error('quiz-submit: supabase responses insert non-200', respRes.status, await respRes.text().catch(() => ''));
      }
    }
    return true;
  } catch (err) {
    console.error('quiz-submit: supabase logging failed', err);
    return false;
  }
}

async function forwardToGumloop(lead: QuizLead, answersJson: string): Promise<{ ok: boolean; runId: string | null }> {
  if (!GUMLOOP_API_KEY) {
    console.error('quiz-submit: GUMLOOP_API_KEY is not configured; skipping pipeline forward');
    return { ok: false, runId: null };
  }

  // The Gumloop pipeline at saved_item_id 2xf7HgFbJf6dDWQDZUVDxZ has named
  // Input nodes (not a Webhook Input), so we keep the pipeline_inputs array
  // shape that the existing downstream segmentation logic depends on.
  const payload = {
    pipeline_inputs: [
      { input_name: 'name', value: lead.name },
      { input_name: 'email', value: lead.email },
      { input_name: 'quiz_score', value: lead.quizScore },
      { input_name: 'quiz_result', value: lead.quizResult },
      { input_name: 'quiz_segment', value: lead.quizSegment },
      { input_name: 'recommended_automation', value: lead.recommendedAutomation },
      { input_name: 'answers', value: answersJson },
    ],
  };

  try {
    const gumloopRes = await fetch(GUMLOOP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${GUMLOOP_API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!gumloopRes.ok) {
      const text = await gumloopRes.text().catch(() => '');
      console.error('Gumloop quiz error', gumloopRes.status, text);
      return { ok: false, runId: null };
    }

    const data = (await gumloopRes.json().catch(() => ({}))) as { run_id?: string };
    return { ok: true, runId: data.run_id ?? null };
  } catch (err) {
    console.error('Quiz submit failed', err);
    return { ok: false, runId: null };
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = (req.body ?? {}) as Record<string, unknown>;

  if (clean(body.website_hp, 200)) {
    res.status(200).json({ status: 'ok' });
    return;
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const quizScore = clean(body.quiz_score, 8);
  const quizResultRaw = clean(body.quiz_result, 16);
  const quizSegmentRaw = clean(body.quiz_segment, 32);
  const recommendedAutomation = clean(body.recommended_automation, 200);
  const answers = clean(body.answers, 8000);

  if (!name) {
    res.status(400).json({ error: 'Name is required.' });
    return;
  }
  if (!email || !isLikelyEmail(email)) {
    res.status(400).json({ error: 'A valid email is required.' });
    return;
  }

  const lead: QuizLead = {
    name,
    email,
    quizScore,
    quizResult: VALID_RESULTS.has(quizResultRaw) ? quizResultRaw : 'low',
    quizSegment: VALID_SEGMENTS.has(quizSegmentRaw) ? quizSegmentRaw : 'partner-nurture',
    recommendedAutomation,
  };

  // Both legs are attempted; the lead survives as long as one lands.
  const [gumloop, supabaseLogged] = await Promise.all([
    forwardToGumloop(lead, answers),
    logToSupabase(lead, answers),
  ]);

  if (!gumloop.ok && !supabaseLogged) {
    res.status(502).json({ error: 'Upstream pipeline error.' });
    return;
  }

  res.status(200).json({ status: 'ok', run_id: gumloop.runId });
}
