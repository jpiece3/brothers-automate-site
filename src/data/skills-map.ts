// Skills & Agents Map — Data Layer
// All 53 skills, 40 agents, and their connections

export type SkillCategory =
  | 'strategy'
  | 'copy'
  | 'leadgen'
  | 'ads'
  | 'visual'
  | 'research'
  | 'apify'
  | 'specialized';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  brandMemory?: {
    writes?: string[];
    reads?: string[];
  };
  mcpTools?: string[];
  schemas?: string[];
  isOrchestrated?: boolean;
  agentCount?: number;
}

export interface Agent {
  id: string;
  name: string;
  parentSkill: string;
  stage: number;
  parallelWith?: string[];
  description: string;
}

export interface Connection {
  source: string;
  target: string;
  type: 'data-flow' | 'trigger' | 'shared-schema' | 'mcp-shared';
  label?: string;
}

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  strategy:    '#3182ce',
  copy:        '#ed8936',
  leadgen:     '#16a34a',
  ads:         '#dc2626',
  visual:      '#8b5cf6',
  research:    '#0891b2',
  apify:       '#6366f1',
  specialized: '#64748b',
};

export const CATEGORY_LABELS: Record<SkillCategory, string> = {
  strategy:    'Strategy & Planning',
  copy:        'Copy & Content',
  leadgen:     'Lead Generation',
  ads:         'Ads',
  visual:      'AI Visual Generation',
  research:    'Research & Intelligence',
  apify:       'Apify Data Collection',
  specialized: 'Specialized',
};

// ─── SKILLS ──────────────────────────────────────────────────────────────────

export const skills: Skill[] = [
  // Strategy & Planning (6)
  { id: 'orchestrator', name: 'Orchestrator', category: 'strategy', description: 'Routes to the right skill based on user goals. Maintains skill registry with dependencies and pre-built workflows.', mcpTools: [], schemas: [], brandMemory: { reads: ['manifest.json'] } },
  { id: 'positioning-angles', name: 'Positioning Angles', category: 'strategy', description: 'Find differentiated market angles using 8 frameworks (Contrarian, Unique Mechanism, Transformation, Enemy, Speed/Ease, Specificity, Social Proof, Risk Reversal).', brandMemory: { writes: ['positioning.json'], reads: ['voice', 'products', 'audience', 'learnings'] }, schemas: ['PositioningAngles.v1'] },
  { id: 'brand-voice', name: 'Brand Voice', category: 'strategy', description: 'Define or extract consistent brand voice. Two modes: Extract (analyze existing content) or Build (construct from scratch).', brandMemory: { writes: ['voice.json', 'audience.json'], reads: ['positioning', 'audience', 'learnings'] }, schemas: ['VoiceProfile.v1'] },
  { id: 'ai-creative-strategist', name: 'AI Creative Strategist', category: 'strategy', description: '7-step creative process: reframe, research, ideate, angles, visual direction, naming, output. Research-powered with visual previews.', mcpTools: ['Glif', 'Replicate', 'Playwright', 'Firecrawl', 'Perplexity'] },
  { id: 'app-validator', name: 'App Validator', category: 'strategy', description: 'Validate app ideas with live data. 3-agent workflow scoring Demand, Competition, Differentiation, Monetization, Timing.', isOrchestrated: true, agentCount: 3, mcpTools: ['DataForSEO', 'Firecrawl', 'Tavily'] },
  { id: 'wed', name: 'What Would Elon Do', category: 'strategy', description: 'Transform any idea into a ruthless execution plan with business strategy, MVP spec, go-to-market plan, and first-week action items.' },

  // Copy & Content (10)
  { id: 'direct-response-copy', name: 'Direct Response Copy', category: 'copy', description: 'Write conversion-focused copy for landing pages, emails, sales copy, headlines, CTAs, and social posts.', brandMemory: { reads: ['voice', 'positioning', 'products', 'audience', 'keywords', 'learnings'] } },
  { id: 'marketing-copy-writer', name: 'Marketing Copy Writer', category: 'copy', description: 'General marketing copy using AIDA framework for ads, emails, landing pages, and social media.', brandMemory: { reads: ['voice', 'positioning', 'products', 'audience', 'learnings'] } },
  { id: 'seo-content', name: 'SEO Content', category: 'copy', description: '7-phase workflow producing SEO-optimized articles. 4 content types: Pillar Guide, How-To, Comparison, Listicle.', brandMemory: { reads: ['voice', 'positioning', 'keywords', 'products', 'learnings'] }, schemas: ['ContentBrief.v1'] },
  { id: 'email-sequences', name: 'Email Sequences', category: 'copy', description: 'Build email sequences: welcome, nurture, conversion, launch, re-engagement, post-purchase. DELIVER-CONNECT-VALUE-BRIDGE framework.', brandMemory: { reads: ['voice', 'positioning', 'products', 'audience', 'learnings'] }, schemas: ['EmailSequenceSpec.v1'] },
  { id: 'cold-email-sequence', name: 'Cold Email Sequence', category: 'copy', description: '6-email outbound sequences: 1 opener + 5 value-adding follow-ups using proven cold email framework.', brandMemory: { reads: ['voice', 'positioning', 'products', 'audience', 'learnings'] } },
  { id: 'newsletter', name: 'Newsletter', category: 'copy', description: '6 format templates: Deep-Dive, News Briefing, Curated Links, Personal Essay, Builder Updates, Irreverent News.', brandMemory: { reads: ['voice', 'positioning', 'learnings'] } },
  { id: 'content-atomizer', name: 'Content Atomizer', category: 'copy', description: 'Transform 1 source into 13+ platform-optimized pieces across LinkedIn, Twitter/X, Instagram, TikTok, YouTube.', brandMemory: { reads: ['voice', 'learnings'] } },
  { id: 'humanizer', name: 'Humanizer', category: 'copy', description: 'Remove AI writing patterns: inflated symbolism, promotional language, em dash overuse, AI vocabulary. 24 detection patterns.', brandMemory: { reads: ['voice', 'learnings'] } },
  { id: 'seo-blog-autopilot', name: 'SEO Blog Autopilot', category: 'copy', description: '4-agent daily blog pipeline: competitor gap analysis, content strategy, SEO writing, direct publishing to brothersautomate.com.', isOrchestrated: true, agentCount: 4, mcpTools: ['DataForSEO', 'Tavily'], brandMemory: { reads: ['voice', 'positioning', 'products', 'learnings'] } },
  { id: 'newsletter-autopilot', name: 'Newsletter Autopilot', category: 'copy', description: '5-agent newsletter pipeline: research, draft, publish, atomize, analytics. Weekly for The Operator\'s AI Playbook.', isOrchestrated: true, agentCount: 5, mcpTools: ['Tavily', 'DataForSEO', 'Notion', 'Glif'] },

  // Lead Generation (6)
  { id: 'lead-magnet', name: 'Lead Magnet', category: 'leadgen', description: 'Generate 3-5 lead magnet concepts with hooks, formats, and bridges to paid offers. Specificity + Bridge + Quick Win principles.', brandMemory: { reads: ['voice', 'positioning', 'products', 'audience', 'learnings'] }, schemas: ['LeadMagnetConcept.v1'] },
  { id: 'lead-magnet-quiz', name: 'Lead Magnet Quiz', category: 'leadgen', description: '6-agent quiz funnel builder producing Vercel-deployable Astro app with 26 personalized emails, analytics dashboard, and social ad video.', isOrchestrated: true, agentCount: 6, mcpTools: ['Playwright', 'Notion', 'Glif'] },
  { id: 'lead-magnet-vision-board', name: 'Vision Board Builder', category: 'leadgen', description: '7-agent vision board builder with Glif AI graphics, tag-based profiles, download/share mechanics. For real estate, weddings, contractors.', isOrchestrated: true, agentCount: 7, mcpTools: ['Glif', 'Notion', 'Playwright'] },
  { id: 'setup-quiz-db', name: 'Setup Quiz DB', category: 'leadgen', description: 'Automate Supabase setup for quiz funnels: credential collection, .env creation, database setup, email template seeding.', mcpTools: ['Supabase'] },
  { id: 'setup-visionboard-db', name: 'Setup Vision Board DB', category: 'leadgen', description: 'Automate Supabase + Glif setup for vision boards. Creates tables, seeds content, configures graphic generation.', mcpTools: ['Supabase'] },
  { id: 'funnel-optimizer', name: 'Funnel Optimizer', category: 'leadgen', description: 'Generate monthly optimization reports for deployed quiz funnels. 8 SQL queries for metrics, Chart.js visualizations.', mcpTools: ['Supabase'] },

  // Ads (3)
  { id: 'daily-ads', name: 'Daily Ads', category: 'ads', description: '6-agent daily ad creative generator. 21 formats (15 static + 6 video), hybrid rendering engine, feedback learning system.', isOrchestrated: true, agentCount: 6, mcpTools: ['Playwright', 'Glif', 'DataForSEO', 'Tavily'], brandMemory: { reads: ['voice', 'positioning', 'products', 'audience', 'learnings'] } },
  { id: 'social-ads', name: 'Social Ads', category: 'ads', description: 'Facebook/Instagram ad campaigns with targeting strategy, creative direction, and testing plans.', brandMemory: { reads: ['voice', 'positioning', 'keywords', 'visual-identity', 'products', 'audience', 'learnings'] }, schemas: ['AdCampaignBrief.v1'] },
  { id: 'meta-ads', name: 'Meta Ads', category: 'ads', description: 'Generate 4 Meta ad variations with psychological angles: Personality, Pain/Money, Contrarian, Curiosity/Specificity.', brandMemory: { reads: ['voice', 'positioning', 'keywords', 'products', 'audience', 'learnings'] } },

  // AI Visual Generation (5)
  { id: 'ai-image-generation', name: 'AI Image Generation', category: 'visual', description: 'Execute image generation via Replicate API. Prompt formula: Subject + Setting + Style + Lighting + Quality Boosters.', mcpTools: ['Glif', 'Replicate'] },
  { id: 'ai-product-photo', name: 'AI Product Photo', category: 'visual', description: '5 style approaches: Clean E-commerce, Lifestyle, Dark Premium, Editorial, Warm Natural. Platform-specific optimization.', mcpTools: ['Glif', 'Replicate'] },
  { id: 'ai-product-video', name: 'AI Product Video', category: 'visual', description: 'Multi-model video: Sora 2, Veo 3.1, Kling v2.5. 5 motion styles: Slow Reveal, Orbit, Floating, Dynamic, Contextual.', mcpTools: ['Replicate'] },
  { id: 'ai-social-graphics', name: 'AI Social Graphics', category: 'visual', description: 'Platform-specific graphics: Instagram, YouTube, LinkedIn, Twitter, TikTok, Pinterest, Facebook. Optimized dimensions.', mcpTools: ['Glif', 'Replicate'] },
  { id: 'ai-talking-head', name: 'AI Talking Head', category: 'visual', description: '5 archetypes: Corporate Authority, Relatable UGC, Energetic Creator, Expert Educator, Lifestyle Aspirational. Kling Lip-Sync.', mcpTools: ['Replicate'] },

  // Research & Intelligence (4)
  { id: 'prospect-finder', name: 'Prospect Finder', category: 'research', description: 'Find businesses with contacts across 6 sources: Google Maps, B2B Database, Yelp, Yellow Pages, Clutch. Optional email enrichment.', mcpTools: ['Apify'] },
  { id: 'advisor-intel', name: 'Advisor Intel', category: 'research', description: '6-agent prospect intelligence + voice briefing platform for wholesalers. 4 parallel research agents + synthesis + audio script.', isOrchestrated: true, agentCount: 6, mcpTools: ['Tavily', 'DataForSEO', 'Lusha', 'Dropcontact', 'Notion'] },
  { id: 'competitor-intel', name: 'Competitor Intel', category: 'research', description: 'Data-driven competitive analysis. 3 tiers: Quick Scan ($500), Full Analysis ($1,500), Strategic Report ($3,000).', mcpTools: ['DataForSEO', 'Tavily'] },
  { id: 'keyword-research', name: 'Keyword Research', category: 'research', description: 'Data-driven keyword research with 6 Circles Method. Live search volume, difficulty scores, SERP analysis, trend data.', brandMemory: { writes: ['keywords.json'], reads: ['positioning', 'learnings'] }, mcpTools: ['DataForSEO'], schemas: ['KeywordPlan.v1'] },

  // Apify Data Collection (11)
  { id: 'apify-lead-generation', name: 'Apify Lead Gen', category: 'apify', description: 'Scrape B2B/B2C leads from Google Maps, Instagram, TikTok, Facebook, LinkedIn, YouTube, Google Search.', mcpTools: ['Apify'] },
  { id: 'apify-competitor-intelligence', name: 'Apify Competitor Intel', category: 'apify', description: 'Analyze competitor strategies, content, pricing, ads, and market positioning across major platforms.', mcpTools: ['Apify'] },
  { id: 'apify-market-research', name: 'Apify Market Research', category: 'apify', description: 'Market conditions, geographic opportunities, pricing, consumer behavior, and product validation.', mcpTools: ['Apify'] },
  { id: 'apify-trend-analysis', name: 'Apify Trend Analysis', category: 'apify', description: 'Discover and track emerging trends across Google Trends, Instagram, Facebook, YouTube, TikTok.', mcpTools: ['Apify'] },
  { id: 'apify-audience-analysis', name: 'Apify Audience Analysis', category: 'apify', description: 'Understand audience demographics, behavior patterns, and engagement quality across social platforms.', mcpTools: ['Apify'] },
  { id: 'apify-brand-reputation', name: 'Apify Brand Reputation', category: 'apify', description: 'Track reviews, ratings, sentiment, and brand mentions across review sites and social platforms.', mcpTools: ['Apify'] },
  { id: 'apify-influencer-discovery', name: 'Apify Influencer Discovery', category: 'apify', description: 'Find and evaluate influencers for brand partnerships across Instagram, Facebook, YouTube, TikTok.', mcpTools: ['Apify'] },
  { id: 'apify-content-analytics', name: 'Apify Content Analytics', category: 'apify', description: 'Track engagement metrics, campaign ROI, and content performance across social platforms.', mcpTools: ['Apify'] },
  { id: 'apify-ecommerce', name: 'Apify E-Commerce', category: 'apify', description: 'Scrape pricing, reviews, and seller data from Amazon, Walmart, eBay, and 50+ marketplaces.', mcpTools: ['Apify'] },
  { id: 'apify-ultimate-scraper', name: 'Apify Universal Scraper', category: 'apify', description: 'Universal AI-powered web scraper for any platform. 55+ Actors for Instagram, Facebook, TikTok, YouTube, Google Maps.', mcpTools: ['Apify'] },
  { id: 'apify-actor-development', name: 'Apify Actor Dev', category: 'apify', description: 'Develop, debug, and deploy Apify Actors — serverless cloud programs for web scraping and automation.', mcpTools: ['Apify'] },

  // Specialized (8)
  { id: 'gumloop-workflow-designer', name: 'Gumloop Workflows', category: 'specialized', description: 'Design or analyze Gumloop automations. Two modes: ANALYZE (reverse-engineer) and BUILD (design from scratch).' },
  { id: 'operator-playbook-drafter', name: 'Operator Playbook', category: 'specialized', description: 'Transform raw notes into formatted Operator\'s AI Playbook newsletter editions in JFlo\'s voice.' },
  { id: 'operator-social-atomizer', name: 'Operator Social Atomizer', category: 'specialized', description: 'Turn newsletter editions into Instagram carousels (8-10 slides), reel scripts, and story sequences.' },
  { id: 'ui', name: 'UI Designer', category: 'specialized', description: 'Generate production-ready UI designs in 4 styles: Soft, Sharp, Glass, Glossy. Dashboards, landing pages, marketing sites.' },
  { id: 'code-explainer', name: 'Code Explainer', category: 'specialized', description: 'Explains code in a clear, structured, and educational way for any function or codebase component.' },
  { id: 'excalidraw', name: 'Excalidraw', category: 'specialized', description: 'Create hand-drawn diagrams: architecture, flowcharts, funnels, mind maps, sequence diagrams via Excalidraw MCP.', mcpTools: ['Excalidraw'] },
  { id: 'push-to-github', name: 'Push to GitHub', category: 'specialized', description: 'Safely push projects to GitHub with pre-flight checks for credentials, wrong-repo, large files, force-push.' },
  { id: 'ios-app-spec', name: 'iOS App Spec', category: 'specialized', description: '6-agent mobile app specification builder producing React Native build prompt, architecture, and App Store copy.', isOrchestrated: true, agentCount: 6, mcpTools: ['DataForSEO', 'Firecrawl', 'Tavily'] },
];

// ─── AGENTS ──────────────────────────────────────────────────────────────────

export const agents: Agent[] = [
  // App Validator (3 agents)
  { id: 'av-demand', name: 'Demand Signals', parentSkill: 'app-validator', stage: 1, parallelWith: ['av-competitive'], description: 'Keyword pipeline, community signal mining, trend analysis via DataForSEO + Tavily' },
  { id: 'av-competitive', name: 'Competitive Landscape', parentSkill: 'app-validator', stage: 1, parallelWith: ['av-demand'], description: 'Competitor discovery, rating/pricing analysis, market gaps via Firecrawl' },
  { id: 'av-verdict', name: 'Verdict', parentSkill: 'app-validator', stage: 2, description: '5-dimension scoring (Demand 30%, Competition 20%, Differentiation 20%, Monetization 15%, Timing 15%)' },

  // Daily Ads (6 agents)
  { id: 'da-scraper', name: 'Brand Scraper', parentSkill: 'daily-ads', stage: 1, parallelWith: ['da-intel'], description: 'URL to brand-profile.json with 4-tier fallback: Playwright, BrowserBase, WebFetch, inferred' },
  { id: 'da-intel', name: 'Intel Agent', parentSkill: 'daily-ads', stage: 1, parallelWith: ['da-scraper'], description: 'DataForSEO competitor discovery + Tavily trend scanning for angles and gaps' },
  { id: 'da-format', name: 'Format Selector', parentSkill: 'daily-ads', stage: 2, description: 'Intelligent rotation with recency, feedback, and industry weighting across 21 formats' },
  { id: 'da-copy', name: 'Copy Agent', parentSkill: 'daily-ads', stage: 3, description: 'Format-specific copy generation using 8 psychological angles (one instance per ad, parallel)' },
  { id: 'da-creative', name: 'Creative Agent', parentSkill: 'daily-ads', stage: 3, parallelWith: ['da-copy'], description: 'Hybrid rendering: Playwright HTML + Glif AI images + Remotion video' },
  { id: 'da-review', name: 'Review & Delivery', parentSkill: 'daily-ads', stage: 4, description: 'Gallery HTML with video autoplay + Resend email delivery + feedback collection' },

  // SEO Blog Autopilot (4 agents)
  { id: 'sba-gap', name: 'Competitor Gap', parentSkill: 'seo-blog-autopilot', stage: 1, description: 'DataForSEO competitor discovery + content gap analysis for brothersautomate.com' },
  { id: 'sba-strategist', name: 'Content Strategist', parentSkill: 'seo-blog-autopilot', stage: 2, description: 'Topic selection, SERP analysis, content brief + internal linking plan' },
  { id: 'sba-writer', name: 'SEO Writer', parentSkill: 'seo-blog-autopilot', stage: 3, description: 'Draft + humanize + format in Brothers Automate brand voice with 25-word AI kill list' },
  { id: 'sba-publisher', name: 'Publisher', parentSkill: 'seo-blog-autopilot', stage: 4, description: 'Validate + git commit + push to main (Vercel auto-deploys)' },

  // Newsletter Autopilot (5 agents)
  { id: 'na-research', name: 'Research Agent', parentSkill: 'newsletter-autopilot', stage: 1, description: 'Tavily search + DataForSEO trends + competitor newsletter scan into Notion Idea Bank' },
  { id: 'na-drafter', name: 'Drafter Agent', parentSkill: 'newsletter-autopilot', stage: 2, description: '6-section Newsletter Operator template in James\'s voice, 500-800 words' },
  { id: 'na-publisher', name: 'Publisher Agent', parentSkill: 'newsletter-autopilot', stage: 3, description: 'Markdown to Beehiiv-compatible HTML, clipboard-ready' },
  { id: 'na-atomizer', name: 'Atomizer Agent', parentSkill: 'newsletter-autopilot', stage: 4, description: '6-platform social content: Instagram carousel/reel/stories, LinkedIn, Twitter/X, YouTube Short' },
  { id: 'na-analytics', name: 'Analytics Agent', parentSkill: 'newsletter-autopilot', stage: 5, description: 'Weekly performance tracking: 40%+ open, 5%+ click, <0.5% unsub benchmarks' },

  // Advisor Intel (6 agents)
  { id: 'ai-person', name: 'Person Intel', parentSkill: 'advisor-intel', stage: 1, parallelWith: ['ai-business', 'ai-network', 'ai-market'], description: 'Bio, career history, speaking engagements, publications, communication style' },
  { id: 'ai-business', name: 'Business & Wealth', parentSkill: 'advisor-intel', stage: 1, parallelWith: ['ai-person', 'ai-network', 'ai-market'], description: 'Company scraping, revenue signals, wealth tier assessment' },
  { id: 'ai-network', name: 'Network & Social', parentSkill: 'advisor-intel', stage: 1, parallelWith: ['ai-person', 'ai-business', 'ai-market'], description: 'Boards, charities, hobbies, family (public only), conversation fuel' },
  { id: 'ai-market', name: 'Market Context', parentSkill: 'advisor-intel', stage: 1, parallelWith: ['ai-person', 'ai-business', 'ai-network'], description: 'Industry outlook, M&A, regulatory, tax, financial planning angles' },
  { id: 'ai-briefing', name: 'Briefing Generator', parentSkill: 'advisor-intel', stage: 2, description: 'Synthesizes 4 research agents into HTML briefing, card, talking points, CRM entry' },
  { id: 'ai-audio', name: 'Audio Script Writer', parentSkill: 'advisor-intel', stage: 3, description: '90-second TTS-optimized script: greeting, headline stat, 3 things to know, 2 to avoid, product positioning' },

  // Lead Magnet Quiz (6 agents)
  { id: 'lmq-research', name: 'Research Agent', parentSkill: 'lead-magnet-quiz', stage: 1, parallelWith: ['lmq-scraper'], description: 'Market research, audience analysis, competitor landing pages via Tavily + DataForSEO' },
  { id: 'lmq-scraper', name: 'Product Scraper', parentSkill: 'lead-magnet-quiz', stage: 1, parallelWith: ['lmq-research'], description: 'Extract products, pricing, testimonials, brand assets from client website' },
  { id: 'lmq-architecture', name: 'Architecture Agent', parentSkill: 'lead-magnet-quiz', stage: 2, parallelWith: ['lmq-design'], description: 'Quiz structure, question types, scoring logic, profile definitions, email personalization' },
  { id: 'lmq-design', name: 'Design Strategy', parentSkill: 'lead-magnet-quiz', stage: 2, parallelWith: ['lmq-architecture'], description: 'Visual mode (Soft/Sharp/Glass/Glossy/Minimal), color extraction, motion patterns, decorative elements' },
  { id: 'lmq-copy', name: 'Copy Agent', parentSkill: 'lead-magnet-quiz', stage: 3, description: 'Landing page, quiz questions, results, 26 emails, content blocks, strategy pack (ads, social, scripts)' },
  { id: 'lmq-build', name: 'Build Agent', parentSkill: 'lead-magnet-quiz', stage: 4, description: 'Vercel-ready Astro project: quiz UI, serverless APIs, analytics dashboard, social ad video' },

  // Lead Magnet Vision Board (7 agents — 4 forked + 3 reused)
  { id: 'vb-research', name: 'Research Agent', parentSkill: 'lead-magnet-vision-board', stage: 1, parallelWith: ['vb-scraper'], description: 'Market research (reused from quiz workflow)' },
  { id: 'vb-scraper', name: 'Service Scraper', parentSkill: 'lead-magnet-vision-board', stage: 1, parallelWith: ['vb-research'], description: 'Service/portfolio extraction (forked from product scraper)' },
  { id: 'vb-architecture', name: 'VB Architecture', parentSkill: 'lead-magnet-vision-board', stage: 2, parallelWith: ['vb-design'], description: 'Preference dimensions, selection flow, tag-based profile matching' },
  { id: 'vb-design', name: 'Design Strategy', parentSkill: 'lead-magnet-vision-board', stage: 2, parallelWith: ['vb-architecture'], description: 'Visual design (reused from quiz workflow)' },
  { id: 'vb-copy', name: 'VB Copy Agent', parentSkill: 'lead-magnet-vision-board', stage: 3, description: 'Builder copy, reveal page, 10 emails across 4 sequences, strategy pack' },
  { id: 'vb-build', name: 'VB Build Agent', parentSkill: 'lead-magnet-vision-board', stage: 4, description: 'Astro project, builder UI, Glif graphic integration, reveal page with share' },
  { id: 'vb-publish', name: 'Publish Agent', parentSkill: 'lead-magnet-vision-board', stage: 5, description: 'GitHub + GitHub Pages + Notion (reused from quiz workflow)' },

  // iOS App Spec (6 agents)
  { id: 'ios-market', name: 'Market Research', parentSkill: 'ios-app-spec', stage: 1, parallelWith: ['ios-competitor'], description: 'Personas, pain points, Jobs-to-Be-Done, keyword research' },
  { id: 'ios-competitor', name: 'Competitor Analysis', parentSkill: 'ios-app-spec', stage: 1, parallelWith: ['ios-market'], description: 'App Store competitor extraction, feature comparison, gap analysis' },
  { id: 'ios-positioning', name: 'Positioning & Marketing', parentSkill: 'ios-app-spec', stage: 2, parallelWith: ['ios-architecture'], description: 'Market positioning, ASO strategy, launch plan' },
  { id: 'ios-architecture', name: 'App Architecture', parentSkill: 'ios-app-spec', stage: 2, parallelWith: ['ios-positioning'], description: 'Technical architecture, React Native patterns, data model' },
  { id: 'ios-onboarding', name: 'Onboarding Agent', parentSkill: 'ios-app-spec', stage: 3, description: 'User onboarding flow, activation moments, retention hooks' },
  { id: 'ios-build', name: 'Build Prompt', parentSkill: 'ios-app-spec', stage: 4, description: 'Compiles everything into AI-ready React Native development prompt' },
];

// ─── CONNECTIONS ─────────────────────────────────────────────────────────────

export const connections: Connection[] = [
  // Brand Memory: brand-voice WRITES voice.json -> readers
  { source: 'brand-voice', target: 'direct-response-copy', type: 'data-flow', label: 'voice.json' },
  { source: 'brand-voice', target: 'marketing-copy-writer', type: 'data-flow', label: 'voice.json' },
  { source: 'brand-voice', target: 'seo-content', type: 'data-flow', label: 'voice.json' },
  { source: 'brand-voice', target: 'email-sequences', type: 'data-flow', label: 'voice.json' },
  { source: 'brand-voice', target: 'cold-email-sequence', type: 'data-flow', label: 'voice.json' },
  { source: 'brand-voice', target: 'newsletter', type: 'data-flow', label: 'voice.json' },
  { source: 'brand-voice', target: 'content-atomizer', type: 'data-flow', label: 'voice.json' },
  { source: 'brand-voice', target: 'humanizer', type: 'data-flow', label: 'voice.json' },
  { source: 'brand-voice', target: 'seo-blog-autopilot', type: 'data-flow', label: 'voice.json' },
  { source: 'brand-voice', target: 'daily-ads', type: 'data-flow', label: 'voice.json' },
  { source: 'brand-voice', target: 'social-ads', type: 'data-flow', label: 'voice.json' },
  { source: 'brand-voice', target: 'meta-ads', type: 'data-flow', label: 'voice.json' },
  { source: 'brand-voice', target: 'lead-magnet', type: 'data-flow', label: 'voice.json' },

  // Brand Memory: positioning-angles WRITES positioning.json -> readers
  { source: 'positioning-angles', target: 'direct-response-copy', type: 'data-flow', label: 'positioning.json' },
  { source: 'positioning-angles', target: 'marketing-copy-writer', type: 'data-flow', label: 'positioning.json' },
  { source: 'positioning-angles', target: 'seo-content', type: 'data-flow', label: 'positioning.json' },
  { source: 'positioning-angles', target: 'email-sequences', type: 'data-flow', label: 'positioning.json' },
  { source: 'positioning-angles', target: 'cold-email-sequence', type: 'data-flow', label: 'positioning.json' },
  { source: 'positioning-angles', target: 'newsletter', type: 'data-flow', label: 'positioning.json' },
  { source: 'positioning-angles', target: 'seo-blog-autopilot', type: 'data-flow', label: 'positioning.json' },
  { source: 'positioning-angles', target: 'daily-ads', type: 'data-flow', label: 'positioning.json' },
  { source: 'positioning-angles', target: 'social-ads', type: 'data-flow', label: 'positioning.json' },
  { source: 'positioning-angles', target: 'meta-ads', type: 'data-flow', label: 'positioning.json' },
  { source: 'positioning-angles', target: 'lead-magnet', type: 'data-flow', label: 'positioning.json' },

  // Brand Memory: keyword-research WRITES keywords.json -> readers
  { source: 'keyword-research', target: 'direct-response-copy', type: 'data-flow', label: 'keywords.json' },
  { source: 'keyword-research', target: 'seo-content', type: 'data-flow', label: 'keywords.json' },
  { source: 'keyword-research', target: 'social-ads', type: 'data-flow', label: 'keywords.json' },
  { source: 'keyword-research', target: 'meta-ads', type: 'data-flow', label: 'keywords.json' },
  { source: 'keyword-research', target: 'seo-blog-autopilot', type: 'data-flow', label: 'keywords.json' },

  // Orchestrator trigger connections (routes to all skills)
  { source: 'orchestrator', target: 'brand-voice', type: 'trigger', label: 'routes' },
  { source: 'orchestrator', target: 'positioning-angles', type: 'trigger', label: 'routes' },
  { source: 'orchestrator', target: 'keyword-research', type: 'trigger', label: 'routes' },
  { source: 'orchestrator', target: 'lead-magnet', type: 'trigger', label: 'routes' },
  { source: 'orchestrator', target: 'lead-magnet-quiz', type: 'trigger', label: 'routes' },
  { source: 'orchestrator', target: 'email-sequences', type: 'trigger', label: 'routes' },
  { source: 'orchestrator', target: 'direct-response-copy', type: 'trigger', label: 'routes' },
  { source: 'orchestrator', target: 'seo-content', type: 'trigger', label: 'routes' },
  { source: 'orchestrator', target: 'newsletter-autopilot', type: 'trigger', label: 'routes' },
  { source: 'orchestrator', target: 'daily-ads', type: 'trigger', label: 'routes' },

  // Workflow chaining: lead-magnet-quiz -> setup-quiz-db -> funnel-optimizer
  { source: 'lead-magnet-quiz', target: 'setup-quiz-db', type: 'trigger', label: 'post-workflow' },
  { source: 'setup-quiz-db', target: 'funnel-optimizer', type: 'trigger', label: '30 days later' },

  // Workflow chaining: lead-magnet-vision-board -> setup-visionboard-db
  { source: 'lead-magnet-vision-board', target: 'setup-visionboard-db', type: 'trigger', label: 'post-workflow' },

  // Shared schema connections
  { source: 'brand-voice', target: 'positioning-angles', type: 'shared-schema', label: 'VoiceProfile.v1' },
  { source: 'keyword-research', target: 'seo-content', type: 'shared-schema', label: 'KeywordPlan.v1' },
  { source: 'keyword-research', target: 'seo-blog-autopilot', type: 'shared-schema', label: 'KeywordPlan.v1' },
  { source: 'lead-magnet', target: 'lead-magnet-quiz', type: 'shared-schema', label: 'LeadMagnetConcept.v1' },
  { source: 'seo-content', target: 'seo-blog-autopilot', type: 'shared-schema', label: 'ContentBrief.v1' },
  { source: 'email-sequences', target: 'lead-magnet-quiz', type: 'shared-schema', label: 'EmailSequenceSpec.v1' },
  { source: 'social-ads', target: 'daily-ads', type: 'shared-schema', label: 'AdCampaignBrief.v1' },

  // Content flow: newsletter -> atomizer
  { source: 'operator-playbook-drafter', target: 'operator-social-atomizer', type: 'trigger', label: 'newsletter edition' },
  { source: 'newsletter', target: 'content-atomizer', type: 'trigger', label: 'content source' },

  // Humanizer used by SEO writer
  { source: 'humanizer', target: 'seo-blog-autopilot', type: 'data-flow', label: 'humanization patterns' },
  { source: 'humanizer', target: 'seo-content', type: 'data-flow', label: 'humanization patterns' },
];

// ─── ORCHESTRATED WORKFLOWS (for workflow view) ──────────────────────────────

export const orchestratedWorkflows = skills
  .filter(s => s.isOrchestrated)
  .map(s => ({
    skillId: s.id,
    name: s.name,
    agents: agents.filter(a => a.parentSkill === s.id),
  }));
