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

const RFQ_WEBHOOK_AUTH = process.env.RFQ_WEBHOOK_AUTH
  || 'Bearer 14fc1dec6b58454e8c528db04f4e744d';

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

  // If no webhook is configured yet, log to Vercel logs and 200 the user so
  // the form UX stays clean while you wire it up.
  if (!RFQ_WEBHOOK_URL) {
    console.warn('RFQ submit received but RFQ_WEBHOOK_URL is not configured', payload);
    res.status(200).json({ status: 'ok', warning: 'webhook_not_configured' });
    return;
  }

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (RFQ_WEBHOOK_AUTH) headers.Authorization = RFQ_WEBHOOK_AUTH;

  try {
    const webhookRes = await fetch(RFQ_WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!webhookRes.ok) {
      const text = await webhookRes.text().catch(() => '');
      console.error('RFQ webhook error', webhookRes.status, text);
      res.status(502).json({ error: 'Upstream webhook error.' });
      return;
    }

    res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('RFQ submit failed', err);
    res.status(500).json({ error: 'Network error reaching webhook.' });
  }
}
