/**
 * Skill Packs catalog data — 7 themes, 36 outcome-specific Packs.
 * Source of truth for /resources/skill-packs page.
 *
 * Each Pack is a chained sequence of skills built to deliver a business outcome.
 * Skills can repeat across Packs because horizontal utilities (brand-voice, humanizer,
 * dataforseo) appear in many chains.
 *
 * Icons are Heroicons v2 outline (24x24, stroke 1.5).
 */

export interface SkillPack {
  slug: string;
  name: string;
  mission: string;
  chain: string[];
  /** Heroicon outline path data (24x24 viewBox) */
  icon: string;
}

export interface PackTheme {
  number: string;
  name: string;
  blurb: string;
  packs: SkillPack[];
}

// ─── Heroicon paths (reused) ──────────────────────────────────────────────
const ICONS = {
  envelope:        'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75',
  newspaper:       'M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z',
  rocket:          'M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z',
  chatBubble:      'M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z',
  chartUp:         'M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941',
  videoCamera:     'm15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z',
  arrowPath:       'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99',
  hashtag:         'M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5',
  clipboardCheck:  'M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.063 2.522-.184 3.76-.16 1.628-1.555 2.84-3.184 2.84a4.51 4.51 0 0 0-3.76 1.838c-.474.682-1.249 1.062-2.067 1.062H10.94c-.818 0-1.593-.38-2.067-1.062A4.51 4.51 0 0 0 5.114 18.6c-1.629 0-3.024-1.213-3.184-2.841A24.05 24.05 0 0 1 1.748 12c0-1.268.063-2.522.184-3.76.16-1.628 1.555-2.84 3.184-2.84A4.51 4.51 0 0 0 8.875 3.562C9.348 2.88 10.123 2.5 10.94 2.5h2.118c.818 0 1.593.38 2.067 1.062A4.51 4.51 0 0 0 18.886 5.4c1.629 0 3.024 1.213 3.184 2.841.121 1.237.184 2.491.184 3.759Z',
  envelopeOpen:    'M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z',
  squares2x2:      'M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z',
  paperAirplane:   'M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5',
  mapPin:          'M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z',
  cursorRectangle: 'M15 15 9.75 7.5l9.75 1.5-3 9.75-2-3.75ZM3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5Z',
  currency:        'M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-2.121 0-3.879-1.343-3.879-3 0-1.657 1.758-3 3.879-3 .768 0 1.536.219 2.121.659l.879.659M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  briefcase:       'M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z',
  magnifier:       'm21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z',
  globe:           'M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418',
  eye:             'M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  star:            'M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z',
  cloudArrowDown:  'M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z',
  camera:          'M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z',
  film:            'M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z',
  photo:           'm2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z',
  userVideo:       'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z',
  device:          'M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25',
  share:           'M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z',
  cog:             'M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.28Z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  phone:           'M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  shieldCheck:     'M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z',
  codeBracket:     'M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z',
  arrowsLeftRight: 'M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5',
  compass:         'M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z',
  cube:            'm21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9',
  microphone:      'M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z',
  sparkles:        'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z',
  download:        'M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3',
};
// ──────────────────────────────────────────────────────────────────────────

export const themes: PackTheme[] = [
  {
    number: '01',
    name: 'Content Engine',
    blurb: 'Produce content that reads like a human wrote it. Distribute it across every platform that matters.',
    packs: [
      {
        slug: 'newsletter-launch',
        name: 'Newsletter Launch',
        mission: 'Ship a newsletter readers actually open — voice, format, first three editions in 1-2 weeks.',
        chain: ['brand-voice', 'positioning-angles', 'newsletter', 'email-newsletter-writer', 'humanizer', 'anti-slop', 'content-atomizer'],
        icon: ICONS.envelope,
      },
      {
        slug: 'operator-newsletter',
        name: 'Operator Newsletter',
        mission: 'Run the Operator’s AI Playbook pipeline end-to-end — research, draft, publish, atomize, measure.',
        chain: ['operator-playbook-drafter', 'newsletter-autopilot', 'operator-social-atomizer'],
        icon: ICONS.newspaper,
      },
      {
        slug: 'viral-sprint',
        name: 'Viral Sprint',
        mission: 'Plan a short-form video sprint engineered against 6 psychological viral principles, not vibes.',
        chain: ['viral-content-principles', 'short-form-video-scripts', 'humanizer', 'content-atomizer'],
        icon: ICONS.rocket,
      },
      {
        slug: 'linkedin-authority',
        name: 'LinkedIn Authority',
        mission: 'Build a LinkedIn presence that compounds — voice, posts, scroll-stopping graphics, atomized.',
        chain: ['brand-voice', 'linkedin-post-writer', 'scroll-stopping-infographic', 'feed-stop-score', 'humanizer', 'content-atomizer'],
        icon: ICONS.chatBubble,
      },
      {
        slug: 'seo-authority-build',
        name: 'SEO Authority Build',
        mission: 'Rank for defensible keywords in 2026 SERPs (post AI Overviews) — strategy + production + autopilot.',
        chain: ['keyword-research-deep', 'seo-blog-writer', 'seo-content', 'humanizer', 'content-atomizer', 'seo-blog-autopilot'],
        icon: ICONS.chartUp,
      },
      {
        slug: 'youtube-channel',
        name: 'YouTube Channel',
        mission: 'Launch and package a YouTube channel optimized for CTR in Browse + Suggested.',
        chain: ['keyword-research', 'short-form-video-scripts', 'youtube-seo-packaging', 'ai-talking-head', 'remotion'],
        icon: ICONS.videoCamera,
      },
      {
        slug: 'pillar-repurpose',
        name: 'Pillar Repurpose',
        mission: 'Turn ONE long-form pillar into 10-15 platform-native posts using research-backed rewrite frameworks.',
        chain: ['content-repurposing-deep', 'content-atomizer', 'craft-tweet', 'linkedin-post-writer'],
        icon: ICONS.arrowPath,
      },
      {
        slug: 'tweet-engine',
        name: 'Tweet Engine',
        mission: 'Ship tweets at cadence without sounding like an AI wrote them.',
        chain: ['craft-tweet', 'humanizer'],
        icon: ICONS.hashtag,
      },
    ],
  },
  {
    number: '02',
    name: 'Lead Engine',
    blurb: 'Capture emails. Warm subscribers. Run cold outreach without getting flagged.',
    packs: [
      {
        slug: 'quiz-funnel',
        name: 'Quiz Funnel',
        mission: 'Build a quiz-based lead generation system end-to-end — 14 implementation-ready files.',
        chain: ['lead-magnet-quiz', 'setup-quiz-db', 'funnel-optimizer'],
        icon: ICONS.clipboardCheck,
      },
      {
        slug: 'lead-magnet-welcome',
        name: 'Lead Magnet → Welcome',
        mission: 'Capture an email and warm the subscriber to a paid offer through a 5-7 email sequence.',
        chain: ['lead-magnet', 'direct-response-copy', 'email-sequences', 'humanizer'],
        icon: ICONS.envelopeOpen,
      },
      {
        slug: 'vision-board-lead',
        name: 'Vision Board Lead',
        mission: 'Lead magnet built on an interactive vision board — emotional, sticky, segments by aspiration.',
        chain: ['lead-magnet-vision-board', 'setup-visionboard-db'],
        icon: ICONS.squares2x2,
      },
      {
        slug: 'cold-outreach',
        name: 'Cold Outreach',
        mission: 'Build a prospect list and run a cold email sequence that doesn’t get flagged or read as AI.',
        chain: ['prospect-finder', 'apify-lead-generation', 'cold-email-sequence', 'humanizer'],
        icon: ICONS.paperAirplane,
      },
      {
        slug: 'local-lead',
        name: 'Local Lead',
        mission: 'Rank in the Google local 3-pack AND turn that visibility into outbound campaigns.',
        chain: ['local-seo', 'prospect-finder', 'cold-email-sequence'],
        icon: ICONS.mapPin,
      },
    ],
  },
  {
    number: '03',
    name: 'Sales / Conversion Engine',
    blurb: 'Pages that convert. Campaigns that scale. Pitches that win.',
    packs: [
      {
        slug: 'landing-page-conversion',
        name: 'Landing Page Conversion',
        mission: 'Ship a landing page that actually converts — angle locked, copy persuasive, design that doesn’t fight the copy.',
        chain: ['positioning-angles', 'direct-response-copy', 'web-designer', 'ui', 'humanizer'],
        icon: ICONS.cursorRectangle,
      },
      {
        slug: 'paid-acquisition',
        name: 'Paid Acquisition',
        mission: 'Spin up Meta / Google / LinkedIn paid campaigns with creative concepts, copy, targeting, and a daily test cadence.',
        chain: ['meta-ads', 'social-ads', 'paid-ads', 'daily-ads', 'marketing-copy-writer', 'ai-creative-strategist'],
        icon: ICONS.currency,
      },
      {
        slug: 'pitch-new-client',
        name: 'Pitch a New Client',
        mission: 'Walk into a sales meeting with audit-grade prep — competitive analysis, positioning angles, creative concepts ready to land.',
        chain: ['client-scan', 'competitor-intel', 'advisor-intel', 'positioning-angles', 'ai-creative-strategist'],
        icon: ICONS.briefcase,
      },
    ],
  },
  {
    number: '04',
    name: 'Research & Intel',
    blurb: 'Know the market, the competitor, and the prospect before you commit.',
    packs: [
      {
        slug: 'pre-pitch-recon',
        name: 'Pre-Pitch Recon',
        mission: 'Full reconnaissance before a sales call — SEO posture, comp landscape, ICP intel.',
        chain: ['client-scan', 'competitor-intel', 'dataforseo'],
        icon: ICONS.magnifier,
      },
      {
        slug: 'market-research',
        name: 'Market Research',
        mission: 'Map a market — trends, audience, demand, and pricing — before committing to a launch or expansion.',
        chain: ['apify-market-research', 'apify-trend-analysis', 'apify-audience-analysis'],
        icon: ICONS.globe,
      },
      {
        slug: 'competitor-intelligence',
        name: 'Competitor Intelligence',
        mission: 'Decompose what a competitor is doing across SEO, paid, social, and content — find the gaps.',
        chain: ['competitor-intel', 'apify-competitor-intelligence', 'apify-content-analytics'],
        icon: ICONS.eye,
      },
      {
        slug: 'brand-reputation',
        name: 'Brand Reputation',
        mission: 'Monitor reviews, mentions, and influencer chatter for a brand. Identify partnership opportunities while you’re at it.',
        chain: ['apify-brand-reputation-monitoring', 'apify-influencer-discovery', 'apify-audience-analysis'],
        icon: ICONS.star,
      },
      {
        slug: 'universal-scrape',
        name: 'Universal Scrape',
        mission: 'Pull data from any web source — social, e-commerce, search, maps — using Apify + Firecrawl.',
        chain: ['apify-ultimate-scraper', 'apify-ecommerce', 'firecrawl'],
        icon: ICONS.cloudArrowDown,
      },
    ],
  },
  {
    number: '05',
    name: 'Visual Production',
    blurb: 'Photography, video, graphics, web — production at scale without a creative team.',
    packs: [
      {
        slug: 'product-photography',
        name: 'Product Photography',
        mission: 'Generate hero / lifestyle / e-comm product shots without a studio, photographer, or shoot day.',
        chain: ['ai-product-photo', 'ai-image-generation'],
        icon: ICONS.camera,
      },
      {
        slug: 'product-video',
        name: 'Product Video',
        mission: 'Animated product reveals + e-commerce video at scale, without a production team.',
        chain: ['ai-product-video', 'remotion'],
        icon: ICONS.film,
      },
      {
        slug: 'social-graphics',
        name: 'Social Graphics',
        mission: 'Scroll-stopping LinkedIn / Twitter / IG graphics on demand — concepts scored, picked, generated.',
        chain: ['scroll-stopping-infographic', 'feed-stop-score', 'ai-social-graphics', 'ai-image-generation'],
        icon: ICONS.photo,
      },
      {
        slug: 'presenter-ugc-video',
        name: 'Presenter / UGC Video',
        mission: 'UGC-style talking head video for ads or organic — without filming, without hiring a creator.',
        chain: ['ai-talking-head', 'short-form-video-scripts', 'remotion'],
        icon: ICONS.userVideo,
      },
      {
        slug: 'web-design',
        name: 'Web Design',
        mission: 'Frontend-first design and scoping for a marketing site — clickable mockup before any backend wiring.',
        chain: ['mockup', 'web-designer', 'ui'],
        icon: ICONS.device,
      },
      {
        slug: 'diagrams',
        name: 'Diagrams',
        mission: 'Build technical / strategy / architecture diagrams fast — the hand-drawn whiteboard aesthetic.',
        chain: ['excalidraw'],
        icon: ICONS.share,
      },
    ],
  },
  {
    number: '06',
    name: 'Build & Ship',
    blurb: 'Engineering hygiene. Don’t push broken code. Don’t review PRs at half-attention.',
    packs: [
      {
        slug: 'apify-actor-build',
        name: 'Apify Actor Build',
        mission: 'Build, actorize, or productize an Apify Actor — from new code, an existing project, or a CLI tool.',
        chain: ['apify-actor-development', 'apify-actorization', 'apify-generate-output-schema'],
        icon: ICONS.cog,
      },
      {
        slug: 'app-spec',
        name: 'App Spec',
        mission: 'Spec a new iOS app frontend-first — clickable mockup before any backend work.',
        chain: ['mockup', 'ios-app-spec'],
        icon: ICONS.phone,
      },
      {
        slug: 'pre-push-hygiene',
        name: 'Pre-Push Hygiene',
        mission: 'Don’t push broken code. Run typecheck / build / lint, ship clean, never push secrets.',
        chain: ['precheck', 'ship', 'push-to-github', 'safedev', 'simplify'],
        icon: ICONS.shieldCheck,
      },
      {
        slug: 'code-review',
        name: 'Code Review',
        mission: 'Review PRs and explain code with security in mind — without missing what a tired human would.',
        chain: ['review', 'security-review', 'diagnose', 'code-explainer'],
        icon: ICONS.codeBracket,
      },
      {
        slug: 'workflow-automation',
        name: 'Workflow Automation',
        mission: 'Map an existing Gumloop workflow OR design a new one from requirements.',
        chain: ['gumloop-workflow-designer'],
        icon: ICONS.arrowsLeftRight,
      },
    ],
  },
  {
    number: '07',
    name: 'Operator Stack',
    blurb: 'The cross-cutting layer. Strategy. Voice. Skill creation. Workspace hygiene.',
    packs: [
      {
        slug: 'strategist',
        name: 'Strategist',
        mission: 'Get unstuck. Find the angle. Route to the right Pack. The fractional CMO layer.',
        chain: ['orchestrator', 'wed', 'ai-creative-strategist', 'positioning-angles', 'diagnose'],
        icon: ICONS.compass,
      },
      {
        slug: 'skill-building',
        name: 'Skill Building',
        mission: 'Productize a workflow into a research-backed Claude Code skill.',
        chain: ['skill-creator'],
        icon: ICONS.cube,
      },
      {
        slug: 'voice-anti-slop',
        name: 'Voice & Anti-Slop',
        mission: 'Lock down a brand voice, kill AI tells, ship copy that reads like a human wrote it.',
        chain: ['brand-voice', 'humanizer', 'anti-slop', 'auto-improve'],
        icon: ICONS.microphone,
      },
      {
        slug: 'mac-workspace-hygiene',
        name: 'Mac/Workspace Hygiene',
        mission: 'Reclaim disk, clean projects, reset the workspace — without manually hunting through Finder.',
        chain: ['clean-mac', 'init'],
        icon: ICONS.sparkles,
      },
    ],
  },
];

export const totalPacks = themes.reduce((sum, t) => sum + t.packs.length, 0);
export const totalSkills = 80; // approximate, from underlying skill library
export const downloadIcon = ICONS.download;
export const downloadHref = '/downloads/brothers-automate-skill-packs.zip';
export const downloadSizeKb = 67;
