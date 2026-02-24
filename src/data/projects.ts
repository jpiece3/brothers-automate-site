export interface ProjectStat {
  number: string;
  label: string;
  context?: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  icon: string; // SVG path data
  description: string; // Results-driven one-liner for grid card
  ctaLabel: string;
  ctaType: 'case-study' | 'book-call' | 'video' | 'product-link';

  meta: {
    title: string;
    description: string;
  };

  problem: {
    headline: string;
    description: string;
    painPoints: string[];
  };

  solution: {
    headline: string;
    description: string;
    features: ProjectFeature[];
  };

  results: {
    headline: string;
    stats: ProjectStat[];
    testimonial?: {
      quote: string;
      author: string;
      role: string;
    };
  };

  cta: {
    headline: string;
    description: string;
  };

  videoUrl?: string;
  productUrl?: string;
}

export const projects: Project[] = [
  {
    slug: 'quiz-funnels',
    name: 'Quiz Funnels',
    tagline: 'Automated lead qualification and follow-up',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
    description: 'Service business: 2-3x more qualified leads with automated scoring, follow-up, and nurture sequences. Running 24/7.',
    ctaLabel: 'See How It Works',
    ctaType: 'product-link',
    meta: {
      title: 'Quiz Funnels | Automated Lead Qualification | Brothers Automate',
      description: 'Stop chasing unqualified leads. Our AI quiz funnels score, segment, and follow up with prospects automatically, so you only talk to people ready to buy.'
    },
    problem: {
      headline: 'Your leads are slipping through the cracks',
      description: 'You\'re getting leads, but half of them aren\'t qualified and the other half never hear from you fast enough. Manual follow-up doesn\'t scale.',
      painPoints: [
        'Leads come in but nobody follows up within the first 2 minutes',
        'You can\'t tell who\'s ready to buy vs. who\'s just browsing',
        'Follow-up emails get written once and forgotten',
        'Your calendar fills up with tire-kickers and price shoppers'
      ]
    },
    solution: {
      headline: 'A quiz that qualifies leads while you serve clients',
      description: 'We build an interactive quiz that makes prospects self-identify their problem and readiness to buy. The system scores them, routes them to the right follow-up, and nurtures them automatically.',
      features: [
        { title: 'Smart Scoring', description: 'Hot, warm, and cold lead classification based on quiz responses' },
        { title: '26 Automated Emails', description: 'Five nurture sequences that follow up based on lead temperature' },
        { title: 'Analytics Dashboard', description: 'Real-time funnel metrics so you know what\'s working' },
        { title: 'Custom Deployment', description: 'Hosted on your domain, branded to your business' }
      ]
    },
    results: {
      headline: 'Results that speak for themselves',
      stats: [
        { number: '2-3x', label: 'More Qualified Leads', context: 'vs. PDF lead magnets' },
        { number: '26', label: 'Automated Emails', context: 'Across 5 sequences' },
        { number: '24/7', label: 'Always Running', context: 'No manual follow-up needed' }
      ]
    },
    cta: {
      headline: 'Stop losing leads to slow follow-up',
      description: 'Let\'s build a quiz funnel that qualifies and nurtures your leads automatically.'
    },
    videoUrl: 'https://www.youtube.com/embed/FRZjVr_BrrA',
    productUrl: 'https://quiz.brothersautomate.com'
  },
  {
    slug: 'equipment-identifier',
    name: 'Equipment Identifier',
    tagline: 'AI-powered equipment cataloging from photos',
    icon: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M15 13a3 3 0 11-6 0 3 3 0 016 0z',
    description: 'Auction company: AI identifies heavy equipment from photos in seconds. Lot titles that used to take minutes per item — done in a batch, instantly.',
    ctaLabel: 'Try It Live',
    ctaType: 'product-link',
    meta: {
      title: 'Equipment Identifier | AI Equipment Cataloging | Brothers Automate',
      description: 'Upload photos of heavy equipment, get back auction-ready lot titles in seconds. AI vision identifies manufacturer, model, year, and category from a single photo.'
    },
    problem: {
      headline: 'Your catalogers are typing lot titles by hand',
      description: 'Every piece of equipment that comes through the yard needs a lot title. Someone looks at the machine, squints at the nameplate, and types it into a spreadsheet. Multiply that by hundreds of lots per auction.',
      painPoints: [
        'Cataloging a single lot takes 2-5 minutes of manual data entry',
        'Misspelled manufacturers and wrong model numbers end up in listings',
        'New hires don\'t know a PC290LC from a PC360LC',
        'No one wants to walk the yard twice to double-check what they typed'
      ]
    },
    solution: {
      headline: 'Upload a photo. Get a lot title.',
      description: 'Drag and drop equipment photos. AI vision reads nameplates, decals, and serial prefixes to generate structured lot titles in the standard auction format. Review, correct, and export — all from one screen.',
      features: [
        { title: 'Batch Processing', description: 'Upload entire folders of photos. AI identifies them all in parallel.' },
        { title: '51 Equipment Categories', description: 'From hydraulic excavators to aerial lifts — every category an auction house needs.' },
        { title: 'Learns From Corrections', description: 'Thumbs down a result and correct it. The AI uses your corrections for the rest of the batch.' },
        { title: '4 Export Targets', description: 'CSV, Google Sheets with photo formulas, Notion, or Airtable. Ready for your auction software.' }
      ]
    },
    results: {
      headline: 'Built for an auction company. Runs on pennies.',
      stats: [
        { number: '~1sec', label: 'Per Photo', context: 'vs. 2-5 minutes manual' },
        { number: '51', label: 'Categories', context: 'Full equipment taxonomy' },
        { number: '95%', label: 'Accuracy', context: 'On nameplate-visible photos' }
      ]
    },
    cta: {
      headline: 'Stop typing lot titles by hand',
      description: 'Let\'s set up AI equipment identification so your catalogers can process a yard in minutes instead of days.'
    },
    productUrl: 'https://equipment-identifier.vercel.app'
  },
  {
    slug: 'brand-research',
    name: 'Brand Research',
    tagline: 'AI-powered audience and competitor intelligence',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    description: 'Agency: completed full brand research, competitor analysis, and positioning strategy in 10 minutes instead of 4 weeks.',
    ctaLabel: 'Try It Live',
    ctaType: 'product-link',
    meta: {
      title: 'Brand Research | AI-Powered Market Intelligence | Brothers Automate',
      description: 'Get deep audience insights, competitor analysis, and positioning strategy powered by AI. In minutes, not months.'
    },
    problem: {
      headline: 'You\'re guessing instead of knowing',
      description: 'Most service businesses make marketing decisions based on gut feel. Without real data on your audience and competitors, you\'re shooting in the dark.',
      painPoints: [
        'You don\'t really know who your best customers are or what makes them buy',
        'Competitor research means scrolling their website for 20 minutes',
        'Your messaging sounds like everyone else in your space',
        'Agencies charge $5K+ for a brand strategy deck you could have gotten faster'
      ]
    },
    solution: {
      headline: 'AI research that would take a team weeks',
      description: 'We deploy AI agents to analyze your market, competitors, and audience, then deliver a complete brand intelligence package with actionable positioning.',
      features: [
        { title: 'Audience Analysis', description: 'Deep profiling of your ideal customers, their pain points, and buying triggers' },
        { title: 'Competitor Intel', description: 'Detailed breakdown of competitor positioning, pricing, and messaging gaps' },
        { title: 'Positioning Strategy', description: 'Differentiated angles that set you apart from the pack' },
        { title: 'Content Direction', description: 'Keyword opportunities, content pillars, and messaging frameworks' }
      ]
    },
    results: {
      headline: 'Research in minutes, not months',
      stats: [
        { number: '10min', label: 'Turnaround', context: 'Full brand research delivered' },
        { number: '10+', label: 'Competitor Profiles', context: 'Analyzed per project' },
        { number: '90%', label: 'Time Saved', context: 'vs. traditional research' }
      ]
    },
    cta: {
      headline: 'Know your market before your competitors do',
      description: 'Let\'s build a research package that gives you an unfair advantage.'
    },
    productUrl: 'https://brandintel.up.railway.app/'
  },
  {
    slug: 'daily-ads',
    name: 'Daily Ads',
    tagline: 'AI-generated ad creative on autopilot',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    description: 'E-commerce: fresh ad creative every day across 15+ formats. No designer, no $5K/month agency retainer.',
    ctaLabel: 'See Examples',
    ctaType: 'video',
    meta: {
      title: 'Daily Ads | AI Ad Creative Generator | Brothers Automate',
      description: 'Get fresh, on-brand ad creative generated daily in 15+ formats. Stop paying designers $5K/month for static that goes stale in a week.'
    },
    problem: {
      headline: 'Your ad creative goes stale before it performs',
      description: 'Designers cost $5K/month. Stock photos look like stock photos. By the time you get new creative, your old ads have already fatigued.',
      painPoints: [
        'You\'re running the same 3 ad images for the past 6 months',
        'Hiring a designer costs $5K/month and turnaround is still slow',
        'Creative fatigue is killing your ad performance and driving up costs',
        'You need 15+ variations for proper testing but can only afford 3'
      ]
    },
    solution: {
      headline: 'Fresh ad creative generated daily by AI',
      description: 'Our system generates on-brand ad creative across 15+ formats every day: static images, video cuts, and copy variations, all tailored to your brand voice and target audience.',
      features: [
        { title: '15+ Static Formats', description: 'Testimonial cards, before/after, feature highlights, and more' },
        { title: '6 Video Formats', description: 'Animated reveals, text overlays, and product showcases' },
        { title: 'Brand-Matched', description: 'Every creative matches your colors, fonts, and voice' },
        { title: 'Performance Learning', description: 'The system learns what works and generates more of it' }
      ]
    },
    results: {
      headline: 'Creative that keeps up with your campaigns',
      stats: [
        { number: '21', label: 'Ad Formats', context: '15 static + 6 video' },
        { number: 'Daily', label: 'Fresh Creative', context: 'No designer needed' },
        { number: '80%', label: 'Cost Reduction', context: 'vs. agency creative' }
      ]
    },
    cta: {
      headline: 'Stop letting creative fatigue kill your ads',
      description: 'Let\'s set up a daily ad engine that keeps your campaigns fresh.'
    },
    productUrl: 'https://daily-ads-saas-production.up.railway.app/'
  },
  {
    slug: 'screenfast',
    name: 'ScreenFast',
    tagline: 'AI-powered resume screening and candidate ranking',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    description: 'YMCA: reduced resume screening time by 85% while improving candidate quality for seasonal hiring.',
    ctaLabel: 'Try It Live',
    ctaType: 'product-link',
    meta: {
      title: 'ScreenFast | AI Resume Screening | Brothers Automate',
      description: 'Stop spending hours reading resumes. ScreenFast uses AI to screen, score, and rank candidates so you interview the right people first.'
    },
    problem: {
      headline: 'You\'re drowning in resumes',
      description: 'Every open position brings hundreds of applications. Manually reading through them takes hours, and the best candidates get hired elsewhere while you\'re still sorting.',
      painPoints: [
        'Spending 3+ hours per position just reading resumes',
        'Great candidates slip through because you can\'t review fast enough',
        'Seasonal hiring means the same painful process every few months',
        'No consistent criteria. Screening quality depends on who\'s reading'
      ]
    },
    solution: {
      headline: 'AI that screens resumes in seconds, not hours',
      description: 'ScreenFast reads every resume against your specific criteria, scores candidates, and delivers a ranked shortlist so you skip straight to interviewing the best fits.',
      features: [
        { title: 'Custom Criteria', description: 'Define exactly what you\'re looking for: skills, experience, certifications' },
        { title: 'Instant Scoring', description: 'Every resume scored and ranked within seconds of submission' },
        { title: 'Ranked Shortlists', description: 'Top candidates surfaced first with reasoning for each score' },
        { title: 'Bias Reduction', description: 'Consistent, criteria-based evaluation for every applicant' }
      ]
    },
    results: {
      headline: 'Built for the YMCA. Proven at scale.',
      stats: [
        { number: '85%', label: 'Less Screening Time', context: 'Built for YMCA' },
        { number: 'Seconds', label: 'Per Resume', context: 'vs. 5-10 minutes manual' },
        { number: '100s', label: 'Resumes Processed', context: 'Per hiring cycle' }
      ]
    },
    cta: {
      headline: 'Stop spending hours reading resumes',
      description: 'Let\'s build a screening system that surfaces your best candidates automatically.'
    },
    productUrl: 'https://screenfast.replit.app/'
  },
  {
    slug: 'signal-engine',
    name: 'Signal Engine',
    tagline: 'AI-powered prospect scoring and outreach',
    icon: 'M13 10V3L4 14h7v7l9-11h-7z',
    description: 'B2B sales: upload your ideal customer profile and a company list. Get back ranked prospects with outreach angles — scored in minutes, not weeks.',
    ctaLabel: 'Try It Live',
    ctaType: 'product-link',
    meta: {
      title: 'Signal Engine | AI Prospect Scoring | Brothers Automate',
      description: 'Stop researching prospects manually. Signal Engine scans websites, news, and job postings to find your best-fit companies and generate personalized outreach angles.'
    },
    problem: {
      headline: 'You\'re guessing which prospects are worth your time',
      description: 'Your sales team spends hours Googling companies, reading LinkedIn, and trying to figure out who\'s actually a fit. Most of that research leads nowhere.',
      painPoints: [
        'Manually researching prospects eats hours every week',
        'You can\'t tell who\'s ready to buy vs. who\'s a dead end',
        'Your outreach sounds generic because you don\'t have time to personalize',
        'By the time you research a company, someone else has already reached out'
      ]
    },
    solution: {
      headline: 'AI that scores your prospects and writes the opener',
      description: 'Upload your ideal customer profile and a company list. Signal Engine scans their websites, news, job postings, and funding data through a 4-tier waterfall. You get back a ranked list with scores, evidence, and a personalized outreach angle for each company.',
      features: [
        { title: 'ICP-Based Scoring', description: 'Upload a PDF describing your ideal customer. AI generates 15-25 detection signals automatically.' },
        { title: '4-Tier Waterfall', description: 'Cheapest checks first — spreadsheet filters, website scans, web search, then deep enrichment.' },
        { title: 'Outreach Angles', description: 'Every qualified company gets a 2-3 sentence personalized opener connecting their situation to your offer.' },
        { title: 'Weekly Monitoring', description: 'Re-scan your list weekly to catch new signals, score changes, and newly qualified companies.' }
      ]
    },
    results: {
      headline: 'Prospect research that used to take weeks.',
      stats: [
        { number: '100s', label: 'Companies Scored', context: 'In a single scan' },
        { number: 'Minutes', label: 'Not Weeks', context: 'Full prospect research' },
        { number: '4-Tier', label: 'Waterfall', context: 'Cheap checks first' }
      ]
    },
    cta: {
      headline: 'Stop guessing which prospects are worth your time',
      description: 'Let Signal Engine score your list and tell you exactly who to call first.'
    },
    productUrl: 'https://signal-engine-production-6674.up.railway.app/'
  },
  {
    slug: 'onboarding-workflow',
    name: 'Onboarding Workflow',
    tagline: 'Automated client onboarding for service businesses',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    description: 'Paving company: automated the entire new-client onboarding flow — comms, scheduling, and docs — same steps every time, zero manual work.',
    ctaLabel: 'Watch the Demo',
    ctaType: 'video',
    meta: {
      title: 'Onboarding Workflow | Automated Client Onboarding | Brothers Automate',
      description: 'Stop doing the same onboarding steps manually for every new client. We automate the entire flow — emails, scheduling, documents — pulled from your database.'
    },
    problem: {
      headline: 'Every new client means the same manual work',
      description: 'New project comes in. You pull the client info, send the welcome email, schedule the walkthrough, prep the docs. Same steps every time — different client, different address, different details. All done by hand.',
      painPoints: [
        'Every new client triggers the same 10-step onboarding process',
        'Client details get copied and pasted between systems manually',
        'Steps get missed when things get busy and clients notice',
        'You know the process could run itself but nobody\'s built it yet'
      ]
    },
    solution: {
      headline: 'Your onboarding flow, fully automated',
      description: 'We build a system that pulls client info from your database and runs the entire onboarding sequence automatically. Emails go out, appointments get scheduled, documents get prepped — same flow every time, zero manual work.',
      features: [
        { title: 'Database-Driven', description: 'Pulls client name, address, project details, and preferences automatically' },
        { title: 'Automated Comms', description: 'Welcome emails, scheduling confirmations, and follow-ups sent on time, every time' },
        { title: 'Document Prep', description: 'Contracts, checklists, and project docs generated with the right details filled in' },
        { title: 'Custom to Your Flow', description: 'Built around the exact steps your business already follows' }
      ]
    },
    results: {
      headline: 'Built for a paving company. Works for any service business.',
      stats: [
        { number: '0', label: 'Manual Steps', context: 'Fully automated flow' },
        { number: '100%', label: 'Consistency', context: 'Same process, every client' },
        { number: 'Hours', label: 'Saved Per Client', context: 'No more copy-paste' }
      ]
    },
    cta: {
      headline: 'Stop doing the same onboarding steps by hand',
      description: 'Let\'s automate your client onboarding so every new project starts the same way — without you lifting a finger.'
    },
    videoUrl: 'https://www.youtube.com/embed/2rGAhxD5Hdk'
  },
  {
    slug: 'route-simply',
    name: 'Route Simply',
    tagline: 'AI-optimized routing and scheduling',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    description: 'Contractor: cut drive time by 30% and fit 2 more jobs per week with AI-optimized routing.',
    ctaLabel: 'Try It Live',
    ctaType: 'product-link',
    meta: {
      title: 'Route Simply | AI Route Optimization | Brothers Automate',
      description: 'Stop wasting time on inefficient routes. Route Simply uses AI to optimize your daily schedule. More jobs, less driving, less fuel.'
    },
    problem: {
      headline: 'You\'re losing money on the road',
      description: 'Every minute driving between jobs is money you\'re not earning. Without optimized routes, you\'re burning fuel, wasting time, and fitting fewer jobs into each day.',
      painPoints: [
        'Manually planning routes eats into your morning every single day',
        'Inefficient routes mean 2-3 extra hours of driving per week',
        'Last-minute schedule changes throw your whole day off',
        'You know you could fit more jobs in a day but the logistics are a headache'
      ]
    },
    solution: {
      headline: 'AI that plans your routes better than you can',
      description: 'Route Simply takes your daily jobs and optimizes the sequence, timing, and routing, accounting for traffic, job duration, and priority. More jobs, less windshield time.',
      features: [
        { title: 'Smart Sequencing', description: 'Jobs ordered for minimum drive time and maximum efficiency' },
        { title: 'Real-Time Updates', description: 'Routes adjust automatically when schedules change' },
        { title: 'Fuel Savings', description: 'Less miles driven means lower fuel costs and less wear' },
        { title: 'Capacity Planning', description: 'See how many more jobs you can fit into each day' }
      ]
    },
    results: {
      headline: 'More jobs. Less driving. More money.',
      stats: [
        { number: '30%', label: 'Less Drive Time', context: 'Average reduction' },
        { number: '+2', label: 'Extra Jobs/Week', context: 'More capacity' },
        { number: '$$', label: 'Fuel Saved', context: 'Monthly savings' }
      ]
    },
    cta: {
      headline: 'Stop wasting time on the road',
      description: 'Let\'s optimize your routes so you can fit more jobs into every day.'
    },
    productUrl: 'https://grizzdms.replit.app/admin'
  },
  {
    slug: 'automated-inventory',
    name: 'Automated Inventory',
    tagline: 'Daily inventory sync and reporting via Square',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    description: 'Pet store: daily automated inventory updates and reports pulled straight from Square. No logging in, no spreadsheets, no guessing what\'s in stock.',
    ctaLabel: 'Watch the Demo',
    ctaType: 'video',
    meta: {
      title: 'Automated Inventory | Square POS Sync & Reporting | Brothers Automate',
      description: 'Stop manually tracking inventory in Square. We automate daily inventory updates and send you a clean report every morning. Built for a pet store in Haddonfield, NJ.'
    },
    problem: {
      headline: 'Square is great for sales. Terrible for inventory.',
      description: 'You love Square for ringing up customers. But keeping inventory accurate? Pulling reports? That means logging in, exporting CSVs, and hoping the numbers are right. Nobody has time for that every day.',
      painPoints: [
        'Square inventory gets out of sync because nobody updates it daily',
        'Pulling inventory reports means logging in and exporting spreadsheets',
        'You don\'t know what\'s low until you physically check the shelf',
        'Tracking trends over time means building your own spreadsheets from scratch'
      ]
    },
    solution: {
      headline: 'A daily inventory system that runs itself',
      description: 'We built a system that calls the Square API at the end of every day. It pulls your latest sales data, updates inventory counts, and sends a clean daily report straight to the owner. No logging in. No spreadsheets. Just open your email.',
      features: [
        { title: 'Daily Square Sync', description: 'Automated API call at end of day pulls all sales and updates inventory counts' },
        { title: 'Owner Reports', description: 'Clean daily email with what sold, what\'s low, and what needs reordering' },
        { title: 'Trend Analysis', description: 'Historical data stored so you can spot patterns and plan ahead' },
        { title: 'Zero Manual Work', description: 'Runs every day automatically. You just read the report.' }
      ]
    },
    results: {
      headline: 'Built for a pet store. Works for any retail business.',
      stats: [
        { number: 'Daily', label: 'Auto Reports', context: 'Delivered to your inbox' },
        { number: '0', label: 'Manual Updates', context: 'System handles it' },
        { number: '100%', label: 'Inventory Accuracy', context: 'Synced every night' }
      ]
    },
    cta: {
      headline: 'Stop guessing what\'s on your shelves',
      description: 'Let\'s set up automated inventory tracking and daily reports so you always know exactly where things stand.'
    },
    videoUrl: 'https://www.youtube.com/embed/mV9VePjnCrA'
  }
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
