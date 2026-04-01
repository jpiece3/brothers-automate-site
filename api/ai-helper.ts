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

const FIELD_PROMPTS: Record<string, string> = {
  currentWorkflow:
    'Help them describe their current workflow as a numbered list of clear steps. Be specific about what happens at each step, who does it, and what tools are involved.',
  painPoints:
    'Help them articulate specific pain points: what breaks, what gets forgotten, what costs money, what takes too long. Push for concrete examples.',
  desiredOutcome:
    'Help them describe the ideal automated outcome in specific terms: what happens, how fast, what the end result looks like.',
  humanCheckpoints:
    'Help them identify where a human still needs to be in the loop: approvals, quality checks, edge cases. Be practical about what should and shouldn\'t be automated.',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const internalKey = req.headers['x-internal-key'];
  if (internalKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { fieldName, fieldValue, formContext } = req.body;

  if (!fieldName) {
    return res.status(400).json({ error: 'fieldName is required' });
  }

  // Brain dump auto-fill mode
  if (fieldName === '_brainDump') {
    const triggerOptions = formContext?.triggerOptions || [];
    const toolNames = formContext?.toolNames || [];

    const systemPrompt = `You are an automation architect. Given a brain dump describing a business process, extract structured data to fill a process intake form. Return ONLY valid JSON with no markdown, no code fences, no explanation. The JSON must match this exact structure:

{
  "processName": "string",
  "goalPurpose": "string",
  "notesContext": "string",
  "inputs": [{"name":"string","source":"string","format":"string"}],
  "outputs": [{"name":"string","destination":"string","format":"string"}],
  "triggers": ["string"],
  "workflowSteps": [{"description":"string"}],
  "agents": [{"name":"string","purpose":"string","position":"trigger|middle|final"}],
  "dataSources": [{"name":"string","type":"string","accessMethod":"string"}],
  "tools": ["string"],
  "humanGates": [{"name":"string","criteria":"string","escalation":"string"}],
  "errorCases": [{"scenario":"string","handler":"string","escalate":true|false}]
}

For "triggers", use only from: ${JSON.stringify(triggerOptions)}
For "tools", use only from this list (match exact names): ${JSON.stringify(toolNames)}
Be thorough. Infer agents, error cases, and human gates even if not explicitly mentioned. Create at least 2-3 workflow steps, 1-2 agents, and 1-2 error cases.`;

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 4000,
          system: systemPrompt,
          messages: [{ role: 'user', content: `Brain dump:\n\n${fieldValue}` }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Anthropic API error:', errorText);
        return res.status(502).json({ error: 'AI service error' });
      }

      const data = await response.json();
      const suggestion = data.content?.[0]?.text || '';
      return res.status(200).json({ suggestion });
    } catch (err) {
      console.error('Brain dump error:', err);
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  // Regular field helper mode
  const fieldPrompt = FIELD_PROMPTS[fieldName] || 'Help them articulate this more clearly and specifically.';

  const contextParts: string[] = [];
  if (formContext?.businessName) contextParts.push(`Business: ${formContext.businessName}`);
  if (formContext?.industry) contextParts.push(`Industry: ${formContext.industry}`);
  if (formContext?.triggerEvent) contextParts.push(`Trigger: ${formContext.triggerEvent}`);
  if (formContext?.toolsUsed?.length) contextParts.push(`Tools: ${formContext.toolsUsed.join(', ')}`);

  const systemPrompt = `You are helping someone spec out an AI automation for a service business. You give brief, specific suggestions. No fluff, no preamble. Just the suggestion text they can use directly.`;

  const userPrompt = `Field: "${fieldName}"
Current value: "${fieldValue || '(empty)'}"
${contextParts.length > 0 ? 'Context: ' + contextParts.join(' | ') : ''}

${fieldPrompt}

Give a suggestion they can paste directly into this field. 2-4 sentences max. If the field is empty, provide a good starting point. If it has content, improve it.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', errorText);
      return res.status(502).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const suggestion = data.content?.[0]?.text || '';

    return res.status(200).json({ suggestion });
  } catch (err) {
    console.error('AI helper error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
