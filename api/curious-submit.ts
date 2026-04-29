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
// API key is now sent server-to-server via the Authorization header,
// per Gumloop's webhook docs. Browser never sees it.
const GUMLOOP_API_KEY = process.env.GUMLOOP_API_KEY || '14fc1dec6b58454e8c528db04f4e744d';

const GUMLOOP_URL = `https://api.gumloop.com/api/v1/start_pipeline?user_id=${GUMLOOP_USER_ID}&saved_item_id=${GUMLOOP_SAVED_ITEM_ID}`;

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
      console.error('Gumloop error', gumloopRes.status, text);
      res.status(502).json({ error: 'Upstream pipeline error.' });
      return;
    }

    const data = (await gumloopRes.json().catch(() => ({}))) as { run_id?: string };
    res.status(200).json({ status: 'ok', run_id: data.run_id ?? null });
  } catch (err) {
    console.error('Curious submit failed', err);
    res.status(500).json({ error: 'Network error reaching pipeline.' });
  }
}
