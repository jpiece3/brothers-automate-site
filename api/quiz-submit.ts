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
const GUMLOOP_API_KEY = process.env.GUMLOOP_API_KEY || '14fc1dec6b58454e8c528db04f4e744d';

const GUMLOOP_URL = `https://api.gumloop.com/api/v1/start_pipeline?user_id=${GUMLOOP_USER_ID}&saved_item_id=${GUMLOOP_SAVED_ITEM_ID}`;

const VALID_RESULTS = new Set(['high', 'mid', 'low']);
const VALID_SEGMENTS = new Set(['partner-ready', 'partner-nurture']);

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

  const quizResult = VALID_RESULTS.has(quizResultRaw) ? quizResultRaw : 'low';
  const quizSegment = VALID_SEGMENTS.has(quizSegmentRaw) ? quizSegmentRaw : 'partner-nurture';

  // The Gumloop pipeline at saved_item_id 2xf7HgFbJf6dDWQDZUVDxZ has named
  // Input nodes (not a Webhook Input), so we keep the pipeline_inputs array
  // shape that the existing downstream segmentation logic depends on.
  const payload = {
    pipeline_inputs: [
      { input_name: 'name', value: name },
      { input_name: 'email', value: email },
      { input_name: 'quiz_score', value: quizScore },
      { input_name: 'quiz_result', value: quizResult },
      { input_name: 'quiz_segment', value: quizSegment },
      { input_name: 'recommended_automation', value: recommendedAutomation },
      { input_name: 'answers', value: answers },
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
      res.status(502).json({ error: 'Upstream pipeline error.' });
      return;
    }

    const data = (await gumloopRes.json().catch(() => ({}))) as { run_id?: string };
    res.status(200).json({ status: 'ok', run_id: data.run_id ?? null });
  } catch (err) {
    console.error('Quiz submit failed', err);
    res.status(500).json({ error: 'Network error reaching pipeline.' });
  }
}
