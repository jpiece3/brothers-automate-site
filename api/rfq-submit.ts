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

// Gumloop pipeline that receives the RFQ payload. Override with env vars
// if you swap pipelines later.
const RFQ_WEBHOOK_URL = process.env.RFQ_WEBHOOK_URL
  || 'https://api.gumloop.com/api/v1/start_pipeline?user_id=hECDCz0xLeYL0xTqi3S7bhbTPlM2&saved_item_id=gWAAn7tZrt5jjGjRWVLZu8';

// Secret lives in Vercel env only — never commit it (this repo is public).
const RFQ_WEBHOOK_AUTH = process.env.RFQ_WEBHOOK_AUTH
  || (process.env.GUMLOOP_API_KEY ? `Bearer ${process.env.GUMLOOP_API_KEY}` : '');

// Durable lead store. The webhook is a downstream side effect; this is the
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
      console.error('rfq-submit: lead store non-200', r.status, await r.text().catch(() => ''));
      return false;
    }
    return true;
  } catch (err) {
    console.error('rfq-submit: lead store failed', err);
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
  const monthlyRevenue = clean(body.monthly_revenue, 40);
  const topAutomationNeed = clean(body.top_automation_need, 2000);
  const source = clean(body.source, 120) || 'rfq:unknown';

  if (!firstName) {
    res.status(400).json({ error: 'First name is required.' });
    return;
  }
  if (!email || !isLikelyEmail(email)) {
    res.status(400).json({ error: 'A valid email is required.' });
    return;
  }
  if (!topAutomationNeed) {
    res.status(400).json({ error: 'Tell us what you want to automate.' });
    return;
  }

  const payload = {
    first_name: firstName,
    last_name: lastName,
    email,
    business,
    monthly_revenue: monthlyRevenue,
    top_automation_need: topAutomationNeed,
    source,
    submitted_at: new Date().toISOString(),
  };

  // Store and forward run concurrently: the visitor's success depends on the
  // lead being saved, never on the webhook being reachable.
  async function forward(): Promise<boolean> {
    if (!RFQ_WEBHOOK_URL) {
      console.warn('rfq-submit: RFQ_WEBHOOK_URL is not configured; lead stored but not forwarded');
      return false;
    }
    if (!RFQ_WEBHOOK_AUTH) {
      console.error('rfq-submit: no webhook auth configured; lead stored but not forwarded');
      return false;
    }
    try {
      const webhookRes = await fetch(RFQ_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: RFQ_WEBHOOK_AUTH },
        body: JSON.stringify(payload),
      });
      if (!webhookRes.ok) {
        console.error('rfq-submit: webhook error', webhookRes.status, await webhookRes.text().catch(() => ''));
        return false;
      }
      return true;
    } catch (err) {
      console.error('rfq-submit: webhook request failed', err);
      return false;
    }
  }

  const [stored, forwarded] = await Promise.all([
    storeLead({
      form: 'rfq',
      first_name: firstName,
      last_name: lastName || null,
      email,
      business: business || null,
      monthly_revenue: monthlyRevenue || null,
      message: topAutomationNeed,
      source,
      payload,
    }),
    forward(),
  ]);

  // Only fail the visitor if the lead landed nowhere at all.
  if (!stored && !forwarded) {
    res.status(502).json({ error: 'Upstream webhook error.' });
    return;
  }

  res.status(200).json({ status: 'ok' });
}
