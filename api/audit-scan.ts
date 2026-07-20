import type { IncomingMessage, ServerResponse } from 'http';
import dns from 'node:dns/promises';
import net from 'node:net';

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
// Free, abuse-resistant website audit. Fetches the page HTML, derives SEO /
// trust / mobile heuristics, and (best-effort) pulls a real Lighthouse score
// from Google PageSpeed Insights. No paid APIs. The operational workflow
// report is generated separately by /api/workflow-submit after the scorecard.
// ---------------------------------------------------------------------------

const PSI_ENDPOINT = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
const PSI_API_KEY = process.env.PAGESPEED_API_KEY || '';

// Best-effort in-memory rate limit. Serverless instances are ephemeral, so
// this only throttles bursts hitting a warm instance, but that is enough to
// blunt casual abuse of the open (no-email) endpoint.
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 8;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_MAX;
}

function clientIp(req: VercelRequest): string {
  const fwd = req.headers['x-forwarded-for'];
  if (typeof fwd === 'string') return fwd.split(',')[0].trim();
  if (Array.isArray(fwd) && fwd.length) return fwd[0];
  return req.socket?.remoteAddress || 'unknown';
}

function normalizeUrl(raw: string): URL | null {
  let candidate = (raw || '').trim();
  if (!candidate) return null;
  if (!/^https?:\/\//i.test(candidate)) candidate = `https://${candidate}`;
  try {
    const u = new URL(candidate);
    if (u.protocol !== 'http:' && u.protocol !== 'https:') return null;
    return u;
  } catch {
    return null;
  }
}

// Block SSRF to internal/cloud-metadata targets. Reject loopback, link-local,
// private, and unique-local ranges for every resolved address.
function isPrivateAddress(addr: string): boolean {
  if (net.isIPv4(addr)) {
    const p = addr.split('.').map(Number);
    if (p[0] === 10) return true;
    if (p[0] === 127) return true;
    if (p[0] === 0) return true;
    if (p[0] === 169 && p[1] === 254) return true; // link-local / metadata
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true;
    if (p[0] === 192 && p[1] === 168) return true;
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true; // CGNAT
    return false;
  }
  if (net.isIPv6(addr)) {
    const a = addr.toLowerCase();
    if (a === '::1' || a === '::') return true;
    if (a.startsWith('fe80') || a.startsWith('fc') || a.startsWith('fd')) return true;
    if (a.startsWith('::ffff:')) return isPrivateAddress(a.replace('::ffff:', ''));
    return false;
  }
  return false;
}

async function hostnameIsSafe(hostname: string): Promise<boolean> {
  const lower = hostname.toLowerCase();
  if (lower === 'localhost' || lower.endsWith('.local') || lower.endsWith('.internal')) return false;
  if (net.isIP(lower) && isPrivateAddress(lower)) return false;
  try {
    const records = await dns.lookup(hostname, { all: true });
    if (!records.length) return false;
    return records.every((r) => !isPrivateAddress(r.address));
  } catch {
    return false;
  }
}

async function fetchWithTimeout(url: string, ms: number, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

interface Signals {
  finalUrl: string;
  statusCode: number;
  hasSSL: boolean;
  loadMs: number;
  title: string;
  titleLength: number;
  hasMetaDescription: boolean;
  metaDescriptionLength: number;
  h1Count: number;
  wordCount: number;
  hasViewport: boolean;
  hasContactForm: boolean;
  hasPhone: boolean;
  hasSchema: boolean;
  hasOpenGraph: boolean;
  hasFavicon: boolean;
  socialLinks: string[];
  hasChatWidget: boolean;
  hasBookingTool: boolean;
  lighthouseAvailable: boolean;
  mobileUsabilityScore: number | null;
  performanceScore: number | null;
  seoScore: number | null;
  accessibilityScore: number | null;
  bestPracticesScore: number | null;
}

const SOCIAL_HOSTS = ['facebook.com', 'instagram.com', 'linkedin.com', 'twitter.com', 'x.com', 'youtube.com', 'tiktok.com'];
const CHAT_HINTS = ['intercom', 'drift', 'tawk.to', 'crisp.chat', 'hubspot', 'livechat', 'tidio', 'zendesk'];
const BOOKING_HINTS = ['calendly', 'cal.com', 'acuityscheduling', 'youcanbook', 'squareup.com/appointments'];

function extract(re: RegExp, html: string): string {
  const m = html.match(re);
  return m ? (m[1] || '').trim() : '';
}

function analyzeHtml(html: string, url: URL, statusCode: number, loadMs: number): Signals {
  const lower = html.toLowerCase();
  const title = extract(/<title[^>]*>([\s\S]*?)<\/title>/i, html).replace(/\s+/g, ' ').trim();
  const metaDesc =
    extract(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']*)["']/i, html) ||
    extract(/<meta[^>]+content=["']([^"']*)["'][^>]*name=["']description["']/i, html);
  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  const textOnly = html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const wordCount = textOnly ? textOnly.split(' ').length : 0;

  const socialLinks = Array.from(
    new Set(
      (html.match(/https?:\/\/[^"'\s<>]+/gi) || [])
        .map((h) => h.toLowerCase())
        .filter((h) => SOCIAL_HOSTS.some((s) => h.includes(s)))
        .map((h) => SOCIAL_HOSTS.find((s) => h.includes(s)) as string)
    )
  );

  const hasForm = /<form[\s>]/i.test(html);
  const hasEmailOrTelInput = /type=["'](email|tel)["']/i.test(html);

  return {
    finalUrl: url.toString(),
    statusCode,
    hasSSL: url.protocol === 'https:',
    loadMs,
    title,
    titleLength: title.length,
    hasMetaDescription: metaDesc.length > 0,
    metaDescriptionLength: metaDesc.length,
    h1Count,
    wordCount,
    hasViewport: /name=["']viewport["']/i.test(html),
    hasContactForm: hasForm || hasEmailOrTelInput,
    hasPhone: /href=["']tel:/i.test(html),
    hasSchema: /application\/ld\+json/i.test(html) || /itemscope/i.test(html),
    hasOpenGraph: /property=["']og:/i.test(html),
    hasFavicon: /rel=["'][^"']*icon[^"']*["']/i.test(html),
    socialLinks,
    hasChatWidget: CHAT_HINTS.some((h) => lower.includes(h)),
    hasBookingTool: BOOKING_HINTS.some((h) => lower.includes(h)),
    lighthouseAvailable: false,
    mobileUsabilityScore: null,
    performanceScore: null,
    seoScore: null,
    accessibilityScore: null,
    bestPracticesScore: null,
  };
}

async function runPageSpeed(url: string): Promise<Partial<Signals>> {
  try {
    const params = new URLSearchParams({ url, strategy: 'mobile' });
    ['performance', 'seo', 'best-practices', 'accessibility'].forEach((c) => params.append('category', c));
    if (PSI_API_KEY) params.append('key', PSI_API_KEY);
    const res = await fetchWithTimeout(`${PSI_ENDPOINT}?${params.toString()}`, 12_000);
    if (!res.ok) return {};
    const data: any = await res.json();
    const cats = data?.lighthouseResult?.categories || {};
    const audits = data?.lighthouseResult?.audits || {};
    const pct = (v: any) => (typeof v?.score === 'number' ? Math.round(v.score * 100) : null);
    const mobileChecks = ['viewport', 'font-size', 'tap-targets', 'content-width']
      .map((key) => pct(audits[key]))
      .filter((score): score is number => score != null);
    return {
      lighthouseAvailable: Boolean(data?.lighthouseResult),
      // A viewport tag by itself is only responsive setup, not proof that the
      // page is usable on a phone. Require at least two mobile checks before
      // presenting a measured usability score.
      mobileUsabilityScore: mobileChecks.length >= 2
        ? Math.round(mobileChecks.reduce((sum, score) => sum + score, 0) / mobileChecks.length)
        : null,
      performanceScore: pct(cats.performance),
      seoScore: pct(cats.seo),
      accessibilityScore: pct(cats.accessibility),
      bestPracticesScore: pct(cats['best-practices']),
    };
  } catch {
    return {};
  }
}

interface Category {
  key: string;
  label: string;
  score: number;
  status: 'pass' | 'warn' | 'fail';
  detail: string;
}

function band(score: number): 'pass' | 'warn' | 'fail' {
  if (score >= 75) return 'pass';
  if (score >= 45) return 'warn';
  return 'fail';
}

export function scoreCategories(s: Signals): Category[] {
  // Performance: prefer real Lighthouse. If it is unavailable, score only the
  // initial server response and label it honestly; that is not a full-page
  // performance measurement.
  let perf = s.performanceScore;
  if (perf == null) {
    if (s.loadMs <= 800) perf = 90;
    else if (s.loadMs <= 1500) perf = 78;
    else if (s.loadMs <= 2800) perf = 60;
    else if (s.loadMs <= 4500) perf = 40;
    else perf = 25;
  }

  // SEO foundations
  let seo = s.seoScore;
  if (seo == null) {
    let v = 0;
    if (s.title && s.titleLength >= 15 && s.titleLength <= 65) v += 25;
    else if (s.title) v += 12;
    if (s.hasMetaDescription && s.metaDescriptionLength >= 70) v += 25;
    else if (s.hasMetaDescription) v += 12;
    if (s.h1Count === 1) v += 20;
    else if (s.h1Count > 1) v += 8;
    if (s.wordCount >= 500) v += 15;
    else if (s.wordCount >= 250) v += 8;
    if (s.hasSchema) v += 15;
    seo = Math.min(100, v);
  }

  // Trust & conversion readiness (heuristic). A phone number or form is a
  // legitimate primary contact path; booking and chat are useful additions,
  // not requirements for a credible local-service website.
  let trust = 0;
  if (s.hasSSL) trust += 20;
  if (s.hasContactForm) trust += 24;
  if (s.hasPhone) trust += 20;
  if (s.hasBookingTool) trust += 8;
  if (s.hasChatWidget) trust += 6;
  if (s.socialLinks.length >= 2) trust += 10;
  else if (s.socialLinks.length === 1) trust += 5;
  if (s.hasOpenGraph) trust += 6;
  if (s.hasFavicon) trust += 6;
  trust = Math.min(100, trust);

  // Lead capture / automation readiness, the BA-specific lens. A form plus a
  // click-to-call path is already strong for many home-service businesses.
  let capture = 0;
  if (s.hasContactForm) capture += 45;
  if (s.hasPhone) capture += 35;
  if (s.hasBookingTool) capture += 20;
  if (s.hasChatWidget) capture += 15;
  if (s.socialLinks.length >= 1) capture += 5;
  capture = Math.min(100, capture);

  const mobileMeasured = s.lighthouseAvailable && s.mobileUsabilityScore != null;
  const mobile = mobileMeasured ? s.mobileUsabilityScore! : (s.hasViewport ? 75 : 30);

  return [
    {
      key: 'performance',
      label: s.performanceScore != null ? 'Speed & Performance' : 'Initial Server Response',
      score: perf,
      status: band(perf),
      detail: s.performanceScore != null
        ? 'Measured by Google Lighthouse (mobile).'
        : `${(s.loadMs / 1000).toFixed(1)}s initial server response. Lighthouse was unavailable, so full-page speed was not measured.`,
    },
    { key: 'seo', label: 'SEO Foundations', score: seo, status: band(seo), detail: s.seoScore != null ? 'Measured by Google Lighthouse.' : 'Title, meta description, headings, content depth, and schema.' },
    {
      key: 'mobile',
      label: mobileMeasured ? 'Mobile Usability' : 'Responsive Setup',
      score: mobile,
      status: band(mobile),
      detail: mobileMeasured
        ? 'Measured from the mobile usability checks returned by Google Lighthouse.'
        : s.hasViewport
          ? 'Responsive setup detected (viewport tag). Phone usability was not measured because Lighthouse was unavailable.'
          : 'No responsive viewport setup detected. Phone usability was not measured because Lighthouse was unavailable.',
    },
    { key: 'trust', label: 'Trust & Credibility', score: trust, status: band(trust), detail: 'SSL, contact paths, booking, social proof, and link previews.' },
    { key: 'capture', label: 'Lead Capture & Follow-Up', score: capture, status: band(capture), detail: 'Forms, phone, booking, chat, and other visible ways a prospect can take the next step.' },
  ];
}

export function buildTeaser(categories: Category[], s: Signals): { label: string; severity: string; message: string }[] {
  const findings: { label: string; severity: string; message: string }[] = [];
  const weakest = [...categories].sort((a, b) => a.score - b.score);
  const hasPrimaryContactPath = s.hasContactForm || s.hasPhone || s.hasBookingTool || s.hasChatWidget;

  if (!hasPrimaryContactPath) {
    findings.push({
      label: 'Lead Capture',
      severity: 'high',
      message: 'Add a clear form, click-to-call phone number, booking path, or chat. No visible place for an interested visitor to take the next step was detected.',
    });
  } else if (!s.hasContactForm) {
    findings.push({
      label: 'Lead Capture',
      severity: 'medium',
      message: 'Your existing phone, booking, or chat path gives visitors a way to respond. A short quote/contact form could also capture people who cannot act immediately.',
    });
  }
  if (!s.hasMetaDescription) findings.push({ label: 'Search Preview', severity: 'medium', message: 'Add a specific meta description so searchers see a clearer reason to click.' });
  if (s.h1Count !== 1) findings.push({ label: 'Page Clarity', severity: 'medium', message: `Use one clear primary page headline. This scan detected ${s.h1Count}.` });
  if (!s.hasSSL) findings.push({ label: 'Trust', severity: 'high', message: 'No HTTPS/SSL, browsers flag the site as "Not Secure".' });

  for (const c of weakest) {
    if (findings.length >= 3) break;
    if (c.score >= 75) continue;
    if (c.key === 'performance') {
      findings.push({ label: c.label, severity: c.score < 45 ? 'high' : 'medium', message: c.detail });
    } else if (c.key === 'mobile' && !s.hasViewport) {
      findings.push({ label: 'Responsive Setup', severity: 'high', message: 'Add a responsive viewport and verify the main call-to-action on a real phone.' });
    } else if (c.key === 'capture' && hasPrimaryContactPath) {
      findings.push({ label: 'Lead Follow-Up', severity: 'medium', message: 'A valid contact path exists. The next opportunity is confirming how quickly each inquiry gets acknowledged, assigned, and followed up.' });
    }
  }

  // Booking/chat can improve after-hours response, but their absence should
  // never outrank a working form or phone path as a critical defect.
  if (findings.length < 3 && hasPrimaryContactPath && !s.hasBookingTool && !s.hasChatWidget) {
    findings.push({
      label: 'Optional After-Hours Path',
      severity: 'low',
      message: 'Consider booking or chat only if it fits how customers buy. A working phone or quote form is already a valid lead path.',
    });
  }
  const severityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 };
  return findings
    .sort((a, b) => (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3))
    .slice(0, 3);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    res.status(429).json({ error: 'Too many scans from this connection. Give it a minute and try again.' });
    return;
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const rawUrl = typeof body.url === 'string' ? body.url : '';
  const url = normalizeUrl(rawUrl);
  if (!url) {
    res.status(400).json({ error: 'Enter a valid website address, e.g. yourcompany.com' });
    return;
  }

  if (!(await hostnameIsSafe(url.hostname))) {
    res.status(400).json({ error: "We can't reach that address. Double-check the domain and try again." });
    return;
  }

  let html = '';
  let statusCode = 0;
  let loadMs = 0;
  let finalUrl = url;
  try {
    const start = Date.now();
    const resp = await fetchWithTimeout(url.toString(), 10_000, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; BrothersAutomate-Audit/1.0; +https://brothersautomate.com)' },
      redirect: 'follow',
    });
    loadMs = Date.now() - start;
    statusCode = resp.status;
    try {
      finalUrl = new URL(resp.url);
      if (!(await hostnameIsSafe(finalUrl.hostname))) throw new Error('redirect-blocked');
    } catch {
      finalUrl = url;
    }
    const buf = await resp.arrayBuffer();
    // Cap parsing at ~1.5MB of markup.
    html = Buffer.from(buf.slice(0, 1_500_000)).toString('utf8');
  } catch (err) {
    res.status(502).json({ error: "We couldn't load that site. It may be down, blocking bots, or the address is off." });
    return;
  }

  const signals = analyzeHtml(html, finalUrl, statusCode, loadMs);
  Object.assign(signals, await runPageSpeed(finalUrl.toString()));

  const categories = scoreCategories(signals);
  const overall = Math.round(categories.reduce((sum, c) => sum + c.score, 0) / categories.length);
  const grade = overall >= 90 ? 'A' : overall >= 80 ? 'B' : overall >= 70 ? 'C' : overall >= 55 ? 'D' : 'F';
  const teaser = buildTeaser(categories, signals);

  res.status(200).json({
    status: 'ok',
    url: finalUrl.toString(),
    domain: finalUrl.hostname.replace(/^www\./, ''),
    scannedAt: new Date().toISOString(),
    score: overall,
    grade,
    categories,
    teaser,
    signals,
  });
}
