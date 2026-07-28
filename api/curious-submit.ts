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
const GUMLOOP_SAVED_ITEM_ID = 'mdFhBuc3fUEdd6ifQskQc5';
// API key is sent server-to-server via the Authorization header, per
// Gumloop's webhook docs. Secret lives in Vercel env only — never commit
// it (this repo is public).
const GUMLOOP_API_KEY = process.env.GUMLOOP_API_KEY || '';

const GUMLOOP_URL = `https://api.gumloop.com/api/v1/start_pipeline?user_id=${GUMLOOP_USER_ID}&saved_item_id=${GUMLOOP_SAVED_ITEM_ID}`;

// Durable lead store. Gumloop is a downstream side effect; this is the
// record of truth, so a rotated key or an upstream outage can't lose a lead.
const SUPABASE_URL = process.env.LEADS_SUPABASE_URL || 'https://nnxbgderdyjanzwgabxl.supabase.co';
const SUPABASE_ANON_KEY =
  process.env.LEADS_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ueGJnZGVyZHlqYW56d2dhYnhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxODA3MzgsImV4cCI6MjA4NDc1NjczOH0.jpjZ_gH1-2GZgyhXPRzPrZzWWnJtAVgU4yui4KM6wZ8';

async function storeLead(row: Record<string, unknown>): Promise<boolean> {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/form_leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    if (!r.ok) {
      console.error('curious-submit: lead store non-200', r.status, await r.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (err) {
    console.error('curious-submit: lead store failed', err);
    return false;
  }
}

function clean(value: unknown, max = 4000): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function isLikelyEmail(email: string): boolean {
  return email.length >= 5 && email.indexOf('@') > 0 && email.lastIndexOf('.') > email.indexOf('@');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Vercel parses JSON bodies automatically when Content-Type is application/json.
  const body = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot, bots fill this; humans never see the field. Silently succeed.
  if (clean(body.website_hp, 200)) {
    res.status(200).json({ status: 'ok' });
    return;
  }

  const firstName = clean(body.first_name, 80);
  const lastName = clean(body.last_name, 80);
  const email = clean(body.email, 160);
  const business = clean(body.business, 160);
  const notes = clean(body.notes, 2000);
  const source = clean(body.source, 80) || 'curious-page';

  if (!firstName) {
    res.status(400).json({ error: 'First name is required.' });
    return;
  }
  if (!email || !isLikelyEmail(email)) {
    res.status(400).json({ error: 'A valid email is required.' });
    return;
  }

  // Gumloop pipeline uses a Webhook Input node, which captures the entire
  // request body as one blob exposed as "Webhook Body". So we send the
  // fields as a flat JSON object, NOT wrapped in pipeline_inputs (that
  // wrapper is for pipelines with named Input nodes, not webhook inputs).
  const payload = {
    first_name: firstName,
    last_name: lastName,
    email,
    business,
    notes,
    source,
    submitted_at: new Date().toISOString(),
  };

  // Store and forward run concurrently: the visitor's success depends on the
  // lead being saved, never on Gumloop being reachable.
  async function forward(): Promise<string | null> {
    if (!GUMLOOP_API_KEY) {
      console.error('curious-submit: GUMLOOP_API_KEY is not configured; lead stored but not forwarded');
      return null;
    }
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
        console.error('curious-submit: Gumloop error', gumloopRes.status, await gumloopRes.text().catch(() => ''));
        return null;
      }
      const data = (await gumloopRes.json().catch(() => ({}))) as { run_id?: string };
      return data.run_id ?? null;
    } catch (err) {
      console.error('curious-submit: Gumloop request failed', err);
      return null;
    }
  }

  const [stored, runId] = await Promise.all([
    storeLead({
      form: 'curious',
      first_name: firstName,
      last_name: lastName || null,
      email,
      business: business || null,
      message: notes || null,
      source,
      payload,
    }),
    forward(),
  ]);

  // Only fail the visitor if the lead landed nowhere at all.
  if (!stored && runId === null) {
    res.status(502).json({ error: 'Upstream pipeline error.' });
    return;
  }

  res.status(200).json({ status: 'ok', run_id: runId });
}
