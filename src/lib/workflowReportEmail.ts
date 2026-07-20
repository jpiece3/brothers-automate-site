type DeliveryStatus = 'sent' | 'failed' | 'not_configured' | 'skipped';

interface EmailOpportunity {
  title: string;
  currentProcess: string;
  trigger: string;
  inputs: string;
  proposedWorkflow: string;
  humanReview: string;
  volume: string;
  timeSaving: string;
  assumptions: string[];
  risk: string;
  nextStep: string;
}

interface EmailReport {
  headline: string;
  summary: string;
  opportunities: EmailOpportunity[];
}

interface WorkflowEmailInput {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  answers: Record<string, string>;
  website: { url?: string; domain?: string; score?: number | null } | null;
  attribution: Record<string, string>;
  report: EmailReport;
  sendLeadCopy: boolean;
  submittedAt: string;
}

const RESEND_API_KEY = process.env.RESEND_API_KEY || '';
const EMAIL_FROM = process.env.AUDIT_FROM_EMAIL || 'Brothers Automate <audit@brothersautomate.com>';
const INTERNAL_EMAIL = process.env.AUDIT_NOTIFICATION_EMAIL || '';
const REPLY_TO = process.env.AUDIT_REPLY_TO_EMAIL || INTERNAL_EMAIL;

function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function emailHeader(value: unknown): string {
  return String(value ?? '').replace(/[\r\n]+/g, ' ').trim().slice(0, 180);
}

function labelForNextStep(step: string): string {
  const labels: Record<string, string> = {
    train: 'TRAIN THE TEAM',
    automate: 'AUTOMATE',
    clarify: 'CLARIFY FIRST',
    leave: 'LEAVE IT ALONE',
  };
  return labels[step] || 'CLARIFY FIRST';
}

function reportRows(opportunity: EmailOpportunity): string {
  const rows = [
    ['Current process', opportunity.currentProcess],
    ['Trigger', opportunity.trigger],
    ['Inputs', opportunity.inputs],
    ['Proposed AI-assisted workflow', opportunity.proposedWorkflow],
    ['Where a person stays in control', opportunity.humanReview],
    ['Volume', opportunity.volume],
    ['Estimated time saved', opportunity.timeSaving],
  ];

  return rows
    .filter(([, value]) => Boolean(value))
    .map(([label, value]) => `
      <tr>
        <td style="width:180px;padding:8px 12px 8px 0;border-top:1px solid #d8d2c8;color:#5c6470;font:700 11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;text-transform:uppercase;letter-spacing:.04em;vertical-align:top;">${escapeHtml(label)}</td>
        <td style="padding:8px 0;border-top:1px solid #d8d2c8;color:#172238;font:14px/1.55 Arial,sans-serif;vertical-align:top;">${escapeHtml(value)}</td>
      </tr>`)
    .join('');
}

function opportunityHtml(opportunity: EmailOpportunity, index: number): string {
  const assumptions = (opportunity.assumptions || []).length
    ? `<div style="margin-top:10px;padding-top:10px;border-top:1px solid #d8d2c8;">
        <div style="color:#5c6470;font:700 11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;text-transform:uppercase;letter-spacing:.04em;">Assumptions behind this</div>
        <ul style="margin:7px 0 0;padding-left:20px;color:#5c6470;font:13px/1.5 Arial,sans-serif;">
          ${opportunity.assumptions.map((assumption) => `<li style="margin-bottom:4px;">${escapeHtml(assumption)}</li>`).join('')}
        </ul>
      </div>`
    : '';

  return `
    <div style="margin:0 0 18px;padding:20px;background:#fffdf7;border:1px solid #c9c1b4;border-radius:8px;">
      <div style="margin-bottom:10px;color:#e55a1f;font:700 11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.06em;">
        ${String(index + 1).padStart(2, '0')} · ${escapeHtml(labelForNextStep(opportunity.nextStep))} · RISK ${escapeHtml((opportunity.risk || 'medium').toUpperCase())}
      </div>
      <h2 style="margin:0 0 12px;color:#111827;font:700 20px/1.2 Arial,sans-serif;">${escapeHtml(opportunity.title)}</h2>
      <table role="presentation" style="width:100%;border-collapse:collapse;">${reportRows(opportunity)}</table>
      ${assumptions}
    </div>`;
}

function emailShell(content: string, preheader: string): string {
  return `<!doctype html>
  <html lang="en">
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;background:#f3eee4;">
      <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
      <div style="max-width:720px;margin:0 auto;padding:28px 16px;">
        <div style="padding:16px 20px;background:#172238;color:#fffdf7;border-radius:8px 8px 0 0;font:700 12px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.08em;">BROTHERS AUTOMATE · AI WORKFLOW REPORT</div>
        <div style="padding:28px 24px;background:#fffaf0;border:1px solid #c9c1b4;border-top:0;border-radius:0 0 8px 8px;">${content}</div>
      </div>
    </body>
  </html>`;
}

function leadReportHtml(input: WorkflowEmailInput): string {
  const report = input.report;
  return emailShell(`
    <p style="margin:0 0 8px;color:#e55a1f;font:700 11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.06em;">YOUR COPY · READY TO FORWARD</p>
    <h1 style="margin:0 0 12px;color:#111827;font:700 30px/1.08 Arial,sans-serif;">${escapeHtml(report.headline)}</h1>
    <p style="margin:0 0 24px;color:#394455;font:15px/1.65 Arial,sans-serif;">${escapeHtml(report.summary)}</p>
    ${report.opportunities.map(opportunityHtml).join('')}
    <p style="margin:20px 0 0;padding:14px 16px;background:#f4eee2;border-left:4px solid #e55a1f;color:#394455;font:14px/1.55 Arial,sans-serif;">
      Estimates are ranges based only on what you submitted, with assumptions shown on each card. Brendan reviews every submission and follows up within one business day.
    </p>
    <p style="margin:20px 0 0;color:#5c6470;font:12px/1.5 Arial,sans-serif;">You requested this report at brothersautomate.com/free-ai-audit. Reply to this email if you want Brendan to review the priorities with you.</p>
  `, 'Your Brothers Automate AI Workflow Report is ready.');
}

function internalNotificationHtml(input: WorkflowEmailInput): string {
  const answerLabels: Record<string, string> = {
    team_size: 'Office/admin team',
    after_hours: 'After-hours work',
    repeat_tasks: 'Repeating tasks',
    inquiries: 'Inquiry handling',
    estimates: 'Estimates/proposals',
    tools: 'Tools',
    copying: 'Manual copying',
    delays: 'Delays / one-person dependencies',
    frequency: 'Frequency',
    time_each: 'Time per occurrence',
    example: 'Sanitized example',
  };
  const answerRows = Object.entries(input.answers)
    .filter(([key, value]) => key !== 'business_type' && Boolean(value))
    .map(([key, value]) => `<tr><td style="width:180px;padding:7px 12px 7px 0;border-top:1px solid #d8d2c8;color:#5c6470;font:700 11px/1.4 Arial,sans-serif;vertical-align:top;">${escapeHtml(answerLabels[key] || key)}</td><td style="padding:7px 0;border-top:1px solid #d8d2c8;color:#172238;font:13px/1.5 Arial,sans-serif;white-space:pre-wrap;">${escapeHtml(value)}</td></tr>`)
    .join('');

  return emailShell(`
    <p style="margin:0 0 8px;color:#e55a1f;font:700 11px/1.4 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.06em;">NEW WORKFLOW AUDIT · FOLLOW UP WITHIN 1 BUSINESS DAY</p>
    <h1 style="margin:0 0 18px;color:#111827;font:700 28px/1.1 Arial,sans-serif;">${escapeHtml(input.name)} · ${escapeHtml(input.businessType)}</h1>
    <p style="margin:0 0 18px;color:#394455;font:14px/1.6 Arial,sans-serif;"><strong>Email:</strong> ${escapeHtml(input.email)}${input.phone ? `<br><strong>Phone:</strong> ${escapeHtml(input.phone)}` : ''}${input.website?.domain ? `<br><strong>Website:</strong> ${escapeHtml(input.website.domain)}${input.website.score != null ? ` · directional score ${escapeHtml(input.website.score)}/100` : ''}` : ''}<br><strong>Submitted:</strong> ${escapeHtml(input.submittedAt)}</p>
    <h2 style="margin:22px 0 8px;color:#111827;font:700 18px/1.2 Arial,sans-serif;">Scorecard answers</h2>
    <table role="presentation" style="width:100%;border-collapse:collapse;">${answerRows}</table>
    <h2 style="margin:24px 0 12px;color:#111827;font:700 18px/1.2 Arial,sans-serif;">Generated report</h2>
    ${input.report.opportunities.map(opportunityHtml).join('')}
    <p style="margin:18px 0 0;color:#5c6470;font:12px/1.5 Arial,sans-serif;">Attribution: ${escapeHtml(JSON.stringify(input.attribution))}</p>
  `, `New workflow audit from ${input.name}.`);
}

async function sendEmail(to: string, subject: string, html: string, replyTo?: string): Promise<DeliveryStatus> {
  if (!RESEND_API_KEY || !to || !EMAIL_FROM) return 'not_configured';
  try {
    const payload: Record<string, unknown> = {
      from: EMAIL_FROM,
      to: [to],
      subject: emailHeader(subject),
      html,
    };
    if (replyTo) payload.reply_to = replyTo;
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      console.error('workflow-report-email: provider non-200', response.status, await response.text().catch(() => ''));
      return 'failed';
    }
    return 'sent';
  } catch (error) {
    console.error('workflow-report-email: provider request failed', error);
    return 'failed';
  }
}

export async function sendWorkflowReportEmails(input: WorkflowEmailInput): Promise<{
  lead: DeliveryStatus;
  internal: DeliveryStatus;
}> {
  const [lead, internal] = await Promise.all([
    input.sendLeadCopy
      ? sendEmail(input.email, 'Your AI Workflow Report · Brothers Automate', leadReportHtml(input), REPLY_TO)
      : Promise.resolve<DeliveryStatus>('skipped'),
    sendEmail(
      INTERNAL_EMAIL,
      `New workflow audit · ${input.name} · ${input.businessType}`,
      internalNotificationHtml(input),
      input.email,
    ),
  ]);
  return { lead, internal };
}
