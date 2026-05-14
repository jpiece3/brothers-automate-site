/**
 * Skill Packs catalog data — 7 themes, 36 outcome-specific Packs.
 * Source of truth for /resources/skill-packs page.
 *
 * Each Pack is a chained sequence of skills built to deliver a business outcome.
 * Skills can repeat across Packs because horizontal utilities (brand-voice, humanizer,
 * dataforseo) appear in many chains.
 */

export interface SkillPack {
  slug: string;
  name: string;
  mission: string;
  chain: string[];
}

export interface PackTheme {
  number: string;
  name: string;
  blurb: string;
  packs: SkillPack[];
}

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
      },
      {
        slug: 'operator-newsletter',
        name: 'Operator Newsletter (JFlo)',
        mission: 'Run the Operator’s AI Playbook pipeline end-to-end — research, draft, publish, atomize, measure.',
        chain: ['operator-playbook-drafter', 'newsletter-autopilot', 'operator-social-atomizer'],
      },
      {
        slug: 'viral-sprint',
        name: 'Viral Sprint',
        mission: 'Plan a short-form video sprint engineered against 6 psychological viral principles, not vibes.',
        chain: ['viral-content-principles', 'short-form-video-scripts', 'humanizer', 'content-atomizer'],
      },
      {
        slug: 'linkedin-authority',
        name: 'LinkedIn Authority',
        mission: 'Build a LinkedIn presence that compounds — voice, posts, scroll-stopping graphics, atomized.',
        chain: ['brand-voice', 'linkedin-post-writer', 'scroll-stopping-infographic', 'feed-stop-score', 'humanizer', 'content-atomizer'],
      },
      {
        slug: 'seo-authority-build',
        name: 'SEO Authority Build',
        mission: 'Rank for defensible keywords in 2026 SERPs (post AI Overviews) — strategy + production + autopilot.',
        chain: ['keyword-research-deep', 'seo-blog-writer', 'seo-content', 'humanizer', 'content-atomizer', 'seo-blog-autopilot'],
      },
      {
        slug: 'youtube-channel',
        name: 'YouTube Channel',
        mission: 'Launch and package a YouTube channel optimized for CTR in Browse + Suggested.',
        chain: ['keyword-research', 'short-form-video-scripts', 'youtube-seo-packaging', 'ai-talking-head', 'remotion'],
      },
      {
        slug: 'pillar-repurpose',
        name: 'Pillar Repurpose',
        mission: 'Turn ONE long-form pillar into 10-15 platform-native posts using research-backed rewrite frameworks.',
        chain: ['content-repurposing-deep', 'content-atomizer', 'craft-tweet', 'linkedin-post-writer'],
      },
      {
        slug: 'tweet-engine',
        name: 'Tweet Engine',
        mission: 'Ship tweets at cadence without sounding like an AI wrote them.',
        chain: ['craft-tweet', 'humanizer'],
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
      },
      {
        slug: 'lead-magnet-welcome',
        name: 'Lead Magnet → Welcome',
        mission: 'Capture an email and warm the subscriber to a paid offer through a 5-7 email sequence.',
        chain: ['lead-magnet', 'direct-response-copy', 'email-sequences', 'humanizer'],
      },
      {
        slug: 'vision-board-lead',
        name: 'Vision Board Lead',
        mission: 'Lead magnet built on an interactive vision board — emotional, sticky, segments by aspiration.',
        chain: ['lead-magnet-vision-board', 'setup-visionboard-db'],
      },
      {
        slug: 'cold-outreach',
        name: 'Cold Outreach',
        mission: 'Build a prospect list and run a cold email sequence that doesn’t get flagged or read as AI.',
        chain: ['prospect-finder', 'apify-lead-generation', 'cold-email-sequence', 'humanizer'],
      },
      {
        slug: 'local-lead',
        name: 'Local Lead',
        mission: 'Rank in the Google local 3-pack AND turn that visibility into outbound campaigns.',
        chain: ['local-seo', 'prospect-finder', 'cold-email-sequence'],
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
      },
      {
        slug: 'paid-acquisition',
        name: 'Paid Acquisition',
        mission: 'Spin up Meta / Google / LinkedIn paid campaigns with creative concepts, copy, targeting, and a daily test cadence.',
        chain: ['meta-ads', 'social-ads', 'paid-ads', 'daily-ads', 'marketing-copy-writer', 'ai-creative-strategist'],
      },
      {
        slug: 'pitch-new-client',
        name: 'Pitch a New Client',
        mission: 'Walk into a sales meeting with audit-grade prep — competitive analysis, positioning angles, creative concepts ready to land.',
        chain: ['client-scan', 'competitor-intel', 'advisor-intel', 'positioning-angles', 'ai-creative-strategist'],
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
      },
      {
        slug: 'market-research',
        name: 'Market Research',
        mission: 'Map a market — trends, audience, demand, and pricing — before committing to a launch or expansion.',
        chain: ['apify-market-research', 'apify-trend-analysis', 'apify-audience-analysis'],
      },
      {
        slug: 'competitor-intelligence',
        name: 'Competitor Intelligence',
        mission: 'Decompose what a competitor is doing across SEO, paid, social, and content — find the gaps.',
        chain: ['competitor-intel', 'apify-competitor-intelligence', 'apify-content-analytics'],
      },
      {
        slug: 'brand-reputation',
        name: 'Brand Reputation',
        mission: 'Monitor reviews, mentions, and influencer chatter for a brand. Identify partnership opportunities while you’re at it.',
        chain: ['apify-brand-reputation-monitoring', 'apify-influencer-discovery', 'apify-audience-analysis'],
      },
      {
        slug: 'universal-scrape',
        name: 'Universal Scrape',
        mission: 'Pull data from any web source — social, e-commerce, search, maps — using Apify + Firecrawl.',
        chain: ['apify-ultimate-scraper', 'apify-ecommerce', 'firecrawl'],
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
      },
      {
        slug: 'product-video',
        name: 'Product Video',
        mission: 'Animated product reveals + e-commerce video at scale, without a production team.',
        chain: ['ai-product-video', 'remotion'],
      },
      {
        slug: 'social-graphics',
        name: 'Social Graphics',
        mission: 'Scroll-stopping LinkedIn / Twitter / IG graphics on demand — concepts scored, picked, generated.',
        chain: ['scroll-stopping-infographic', 'feed-stop-score', 'ai-social-graphics', 'ai-image-generation'],
      },
      {
        slug: 'presenter-ugc-video',
        name: 'Presenter / UGC Video',
        mission: 'UGC-style talking head video for ads or organic — without filming, without hiring a creator.',
        chain: ['ai-talking-head', 'short-form-video-scripts', 'remotion'],
      },
      {
        slug: 'web-design',
        name: 'Web Design',
        mission: 'Frontend-first design and scoping for a marketing site — clickable mockup before any backend wiring.',
        chain: ['mockup', 'web-designer', 'ui'],
      },
      {
        slug: 'diagrams',
        name: 'Diagrams',
        mission: 'Build technical / strategy / architecture diagrams fast — the hand-drawn whiteboard aesthetic.',
        chain: ['excalidraw'],
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
      },
      {
        slug: 'app-spec',
        name: 'App Spec',
        mission: 'Spec a new iOS app frontend-first — clickable mockup before any backend work.',
        chain: ['mockup', 'ios-app-spec'],
      },
      {
        slug: 'pre-push-hygiene',
        name: 'Pre-Push Hygiene',
        mission: 'Don’t push broken code. Run typecheck / build / lint, ship clean, never push secrets.',
        chain: ['precheck', 'ship', 'push-to-github', 'safedev', 'simplify'],
      },
      {
        slug: 'code-review',
        name: 'Code Review',
        mission: 'Review PRs and explain code with security in mind — without missing what a tired human would.',
        chain: ['review', 'security-review', 'diagnose', 'code-explainer'],
      },
      {
        slug: 'workflow-automation',
        name: 'Workflow Automation',
        mission: 'Map an existing Gumloop workflow OR design a new one from requirements.',
        chain: ['gumloop-workflow-designer'],
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
      },
      {
        slug: 'skill-building',
        name: 'Skill Building',
        mission: 'Productize a workflow into a research-backed Claude Code skill.',
        chain: ['skill-creator'],
      },
      {
        slug: 'voice-anti-slop',
        name: 'Voice & Anti-Slop',
        mission: 'Lock down a brand voice, kill AI tells, ship copy that reads like a human wrote it.',
        chain: ['brand-voice', 'humanizer', 'anti-slop', 'auto-improve'],
      },
      {
        slug: 'mac-workspace-hygiene',
        name: 'Mac/Workspace Hygiene',
        mission: 'Reclaim disk, clean projects, reset the workspace — without manually hunting through Finder.',
        chain: ['clean-mac', 'init'],
      },
    ],
  },
];

export const totalPacks = themes.reduce((sum, t) => sum + t.packs.length, 0);
export const totalSkills = 80; // approximate, from underlying skill library
