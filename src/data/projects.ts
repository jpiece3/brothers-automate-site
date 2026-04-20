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
    name: 'Lead Qualification Quiz',
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
    name: 'AI Equipment Cataloger',
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
    slug: 'after-hours-agent',
    name: 'After-Hours AI Receptionist',
    tagline: 'AI chat that captures leads while you sleep',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    description: 'Service business: AI chat widget qualifies leads, gives quotes, and books appointments 24/7. No missed inquiries, no after-hours gaps.',
    ctaLabel: 'Try It Live',
    ctaType: 'product-link',
    meta: {
      title: 'After Hours Agent | AI Lead Capture Chat | Brothers Automate',
      description: 'Stop losing after-hours leads. Our AI chat agent qualifies prospects, provides quotes, and books appointments while you sleep — embedded on your website in one line of code.'
    },
    problem: {
      headline: 'You\'re losing leads every night',
      description: 'A potential customer visits your site at 9pm. They have questions, they want a quote, they\'re ready to book. But nobody\'s there. By morning, they\'ve already called your competitor.',
      painPoints: [
        'After-hours inquiries go unanswered until the next business day',
        'Potential customers leave your site and call someone who responds faster',
        'You can\'t afford a 24/7 receptionist but you can\'t afford to miss leads either',
        'Contact forms collect info but don\'t qualify, quote, or book appointments'
      ]
    },
    solution: {
      headline: 'An AI agent that handles leads while you sleep',
      description: 'A chat widget that lives on your website and talks to visitors 24/7. It qualifies their needs, gives accurate quotes based on your pricing, checks your real calendar for availability, and books appointments — all while you\'re off the clock.',
      features: [
        { title: 'Lead Qualification', description: 'Asks the right questions to determine if a visitor is a real prospect before booking' },
        { title: 'Real-Time Quotes', description: 'Uses your actual service menu and pricing to give accurate estimates on the spot' },
        { title: 'Calendar Integration', description: 'Checks your Google Calendar for real availability and books without double-booking' },
        { title: 'Instant Notifications', description: 'Email and SMS alerts the moment a lead is qualified or an appointment is booked' }
      ]
    },
    results: {
      headline: 'Leads captured. Appointments booked. While you sleep.',
      stats: [
        { number: '<15s', label: 'Response Time', context: 'Average first reply' },
        { number: '24/7', label: 'Always On', context: 'No missed inquiries' },
        { number: '$297', label: 'Per Month', context: 'vs. $1,600+/month lost' }
      ]
    },
    cta: {
      headline: 'Stop losing leads after hours',
      description: 'Let\'s put an AI agent on your site that qualifies, quotes, and books — even when you\'re asleep.'
    }
  },
  {
    slug: 'brand-research',
    name: 'AI Brand Researcher',
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
    productUrl: 'https://brothers-brand-intel.up.railway.app/'
  },
  {
    slug: 'daily-ads',
    name: 'AI Ad Creator',
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
    name: 'AI Resume Screener',
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
    name: 'AI Prospect Scorer',
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
    productUrl: 'https://signal-engine.up.railway.app/'
  },
  {
    slug: 'onboarding-workflow',
    name: 'Client Onboarding Automation',
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
    name: 'AI Route Optimizer',
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
    name: 'AI Inventory Tracker',
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
  },
  {
    slug: 'app-validator',
    name: 'AI App Idea Validator',
    tagline: 'AI-powered app idea validation with live market data',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    description: 'Founders: validate any app idea with live keyword data, competitor analysis, and an AI-generated go/no-go verdict — in under 2 minutes.',
    ctaLabel: 'Try It Live',
    ctaType: 'product-link',
    meta: {
      title: 'App Validator | AI App Idea Validation | Brothers Automate',
      description: 'Stop guessing if your app idea will work. App Validator runs live keyword research, competitor analysis, and AI scoring to give you a data-backed GO or NO-GO verdict in under 2 minutes.'
    },
    problem: {
      headline: 'You\'re about to spend 6 months building something nobody wants',
      description: 'Most app ideas fail because founders skip validation. They build first, research later, and discover the market doesn\'t exist — after burning through time and money.',
      painPoints: [
        'You Google your app idea and find 3 competitors but have no idea how big the market actually is',
        'Keyword research tools cost $100+/month and take hours to learn',
        'You can\'t tell if your idea is different enough from what\'s already in the App Store',
        'By the time you finish manual research, you\'ve lost the motivation to build'
      ]
    },
    solution: {
      headline: 'A full market validation report in under 2 minutes',
      description: 'Describe your app idea in one sentence. Our pipeline hits live APIs — DataForSEO for keyword demand, Tavily for competitor intelligence, and Claude AI for synthesis — then delivers an investor-grade validation report with a clear verdict.',
      features: [
        { title: 'Demand Signals', description: 'Live keyword volumes, search trends, difficulty scores, and community signal mining from Reddit and forums' },
        { title: 'Competitive Landscape', description: 'App Store competitors identified, rated, and analyzed for pricing, funding, and market gaps' },
        { title: '5-Dimension Scoring', description: 'Demand, competition, differentiation, monetization, and timing — each scored 1-10 with data-backed rationale' },
        { title: 'Marketing Playbook', description: 'Positioning angles, ASO strategy, channel recommendations, monetization model, and a 30-day launch plan' }
      ]
    },
    results: {
      headline: 'Data-backed decisions, not gut feelings',
      stats: [
        { number: '<2min', label: 'Turnaround', context: 'Full validation report' },
        { number: '5', label: 'Scoring Dimensions', context: 'Data-backed, weighted' },
        { number: '$0.60', label: 'Per Report', context: 'vs. weeks of manual research' }
      ]
    },
    cta: {
      headline: 'Validate before you build',
      description: 'Submit your app idea and get a data-backed GO, CONDITIONAL GO, or NO-GO verdict — first one\'s free.'
    },
    productUrl: 'https://validate.brothersautomate.com/'
  },
  {
    slug: 'cpq-agent',
    name: 'AI Quote Generator',
    tagline: 'After-hours quote automation for B2B',
    icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
    description: 'B2B manufacturer: AI agent qualifies leads, looks up real ERP pricing, books sales calls, and pushes deals to HubSpot — 24/7, zero manual data entry.',
    ctaLabel: 'Read the Case Study',
    ctaType: 'case-study',
    meta: {
      title: 'CPQ Agent | After-Hours Quote Automation | Brothers Automate',
      description: 'An AI agent that qualifies leads, checks real ERP pricing, books sales calls, and pushes deals to HubSpot — 24/7 while your team sleeps.'
    },
    problem: {
      headline: '35-45% of B2B inquiries arrive outside business hours',
      description: 'Prospects hit a contact form and sit until morning. By then, they\'ve already talked to your competitor.',
      painPoints: [
        'After-hours inquiries sit in a contact form until the next business day',
        'Sales reps spend mornings doing data entry instead of selling',
        'No way to qualify or price a lead without a human in the loop',
        'Complex products mean pricing depends on specs, quantity, and configuration'
      ]
    },
    solution: {
      headline: 'An AI agent that handles leads while your team sleeps',
      description: 'A conversational AI agent that lives on your website 24/7, collects requirements, checks real ERP pricing, qualifies against your business rules, books calls, and pushes deals to HubSpot.',
      features: [
        { title: 'Natural Conversation', description: 'Collects product, quantity, specs, material, and timeline through dialogue' },
        { title: 'Real ERP Pricing', description: 'Connects to NetSuite, Sage, or QuickBooks for real pricing data' },
        { title: '37 Qualification Rules', description: 'Your business rules enforced consistently on every lead' },
        { title: 'Full HubSpot Integration', description: 'Creates contacts, deals, and notes with 13 custom properties' }
      ]
    },
    results: {
      headline: 'Reps wake up to pre-built deals',
      stats: [
        { number: '24/7', label: 'Lead Capture', context: 'No after-hours gaps' },
        { number: '<2min', label: 'Quote Delivery', context: 'Real pricing from ERP' },
        { number: '0', label: 'Manual CRM Entry', context: 'Deals auto-created' }
      ]
    },
    cta: {
      headline: 'Stop losing after-hours leads',
      description: 'Let\'s put an AI agent on your site that qualifies, quotes, books, and pushes deals to your CRM.'
    }
  },
  {
    slug: 'seo-blog-autopilot',
    name: 'Automated SEO Blog',
    tagline: 'SEO content that writes, publishes, and syndicates itself — 3x a week, on autopilot.',
    icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    description: 'Our blog has 35 posts, targets 42,990 monthly searches, and generates 13 backlinks — all written and published by Claude Code agents, 3x a week, with zero writers on staff.',
    ctaLabel: 'See It Working',
    ctaType: 'case-study',
    meta: {
      title: 'Automated SEO Blog | AI Content That Ranks | Brothers Automate',
      description: 'An AI pipeline that finds keyword gaps, writes SEO-optimized posts in your brand voice, publishes to your site, and syndicates for backlinks — 3x a week on autopilot.'
    },
    problem: {
      headline: 'You know you need blog content. You just can\'t keep up.',
      description: 'Every SEO guide says "publish consistently." But hiring a content team costs $3-5K/month, freelancers miss deadlines, and doing it yourself means it never gets done. So your blog sits empty while competitors rank above you.',
      painPoints: [
        'You haven\'t published a blog post in months because there\'s no time',
        'Freelance writers cost $200-500 per post and still need heavy editing',
        'You don\'t know which keywords to target or what your competitors are ranking for',
        'Every post you do publish takes 4-6 hours of research, writing, and formatting'
      ]
    },
    solution: {
      headline: 'An AI pipeline that runs your entire blog',
      description: 'We built a 5-stage autopilot powered by Claude Code agents that finds keyword gaps your competitors exploit, writes human-sounding posts in your brand voice, publishes directly to your site, and cross-posts for backlinks. It runs on a cron schedule — Mon/Wed/Fri — with zero manual work.',
      features: [
        { title: 'Competitor Gap Analysis', description: 'Finds keywords your competitors rank for that you don\'t, prioritized by volume and difficulty' },
        { title: 'Brand Voice Writing', description: 'Writes in your voice with real stats, internal links, and SEO structure — not generic AI slop' },
        { title: 'Auto-Publish', description: 'Commits to your repo, deploys via Vercel/Netlify — post goes live without you touching a thing' },
        { title: 'Backlink Syndication', description: 'Cross-posts to Dev.to with canonical URLs so you build domain authority automatically' }
      ]
    },
    results: {
      headline: 'Our blog is the proof. Every post was written by this system.',
      stats: [
        { number: '35', label: 'Posts Published', context: 'And growing 3x/week' },
        { number: '42,990', label: 'Monthly Searches', context: 'Total keyword volume targeted' },
        { number: '13', label: 'Backlinks Generated', context: 'Via Dev.to syndication' }
      ]
    },
    cta: {
      headline: 'Get an automated SEO blog running on your site',
      description: 'We\'ll set up the same autopilot that runs our blog — competitor analysis, AI writing, auto-publishing, and syndication — custom-built for your business.'
    }
  },
  {
    slug: 'client-scan',
    name: 'SEO Audit Engine',
    tagline: 'Automated SEO & digital presence auditing',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z M9 12h6 M12 9v6',
    description: 'Marketing agency: Automated SEO audits that pull rankings, competitor data, Google Maps visibility, and website health into client-ready reports — in 10 minutes, not 10 hours.',
    ctaLabel: 'See a Sample Report',
    ctaType: 'product-link',
    meta: {
      title: 'SEO Audit Engine | Automated Digital Presence Audits | Brothers Automate',
      description: 'Automated SEO audits in 10 minutes. Keyword rankings, competitor gaps, Google Maps visibility, Lighthouse scores, social presence, and company intel — delivered as shareable client-ready reports.'
    },
    problem: {
      headline: 'Your SEO audits take all week and still miss half the picture',
      description: 'Every new prospect means the same routine: open Semrush, check their keywords, manually look up their Google reviews, screenshot their Lighthouse scores, research their competitors, try to find their social profiles. Four to six hours of tab-switching per prospect — and you still walk into the meeting with a spreadsheet and guesswork.',
      painPoints: [
        'A single prospect audit takes 4-6 hours of manual research across a dozen different tools',
        'You\'re checking rankings in one tool, reviews in another, social in a third — nothing connects',
        'Competitor analysis means separately pulling data for each competitor and manually comparing',
        'The deliverable is a Loom and a Google Doc — not something that makes you look like a $10K/month agency',
        'By the time you\'ve audited one prospect, three more filled out your contact form',
        'Junior team members miss critical data points that change the entire pitch strategy'
      ]
    },
    solution: {
      headline: 'Enter a domain. Get back a complete SEO audit with reports you can share.',
      description: 'Four AI research agents run simultaneously — one pulls SEO rankings and keyword data, another gathers company intel and hiring signals, a third checks Google Maps and local visibility, and a fourth audits social media and review platforms. They pull from 20+ data sources including DataForSEO, Google Lighthouse, Google Business Profile, and Apify scrapers. Ten minutes later, you have a complete audit with five client-ready reports and an internal pitch strategy.',
      features: [
        { title: 'SEO & Technical Analysis', description: 'Domain rank, keyword positions, search volumes, keyword difficulty scores, competitor keyword gaps, Lighthouse performance and accessibility scores (desktop + mobile), full site crawl with 404s, missing meta descriptions, and tech stack detection.' },
        { title: 'Local & Maps Intelligence', description: 'Google Maps pack rankings for local search queries, Google Business Profile data (rating, review count, category), organic SERP positions vs. competitors, and Google Trends data for their service keywords in their market.' },
        { title: 'Social & Review Audit', description: 'Instagram followers and engagement rate, Facebook page metrics and ad activity, Yelp and BBB presence check, Google review analysis with competitor review benchmarking, and contact information scraping.' },
        { title: 'Company & Competitive Intel', description: 'Leadership profiles, estimated revenue and employee count, hiring signals from job boards, brand mention analysis with sentiment scoring, marketing capability assessment, and gap-to-service mapping based on your angle.' },
        { title: '5 Client-Facing Reports', description: 'Self-contained HTML files with no technical jargon — SEO analysis, website health audit, tiered action plan with ROI estimates, and research methodology overview. Branded, shareable, and designed to make your agency look like the obvious choice.' },
        { title: 'Live Dashboard + Ongoing Tracking', description: 'Every audit feeds into a centralized dashboard where you can track all clients, compare metrics over time, see keyword position trends, and refresh metrics with one click for $0.04. History tab shows how rankings change between scans.' }
      ]
    },
    results: {
      headline: 'What used to take your best analyst a full day now runs while you grab coffee.',
      stats: [
        { number: '10 min', label: 'Full Audit', context: 'vs. 4-6 hours of manual research across multiple tools' },
        { number: '50+', label: 'Data Points', context: 'SEO rankings, maps, social, reviews, company intel, tech stack' },
        { number: '20+', label: 'Data Sources', context: 'DataForSEO, Lighthouse, Google Maps, Apify scrapers' },
        { number: '$1.50', label: 'Per Audit', context: 'Total API cost — less than a cup of coffee' }
      ],
      testimonial: {
        quote: 'We used to spend a full day prepping for a single prospect meeting. Now we run the scan before the call, walk in with a 5-report package, and the prospect asks how we know so much about their business. It changed how we pitch entirely.',
        author: 'James Pinder',
        role: 'Co-Founder, Brothers Automate'
      }
    },
    cta: {
      headline: 'Stop spending all day on prospect research',
      description: 'We\'ll set up the same SEO audit engine we use internally — automated audits, client-ready reports, and a dashboard that tracks every prospect. Walk into every meeting with data, not guesses.'
    },
    productUrl: 'https://brothersautomate.com/clientintel/'
  },
  {
    slug: 'crisply',
    name: 'Crisply',
    tagline: 'AI-powered client portals for agencies and operators',
    icon: 'M9 17v-2a4 4 0 014-4h4M9 7h10M5 12h4m-4 5h4M5 7h4m10 10V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2z',
    description: 'Turn raw data into branded, interactive reports your clients can actually use. Hosted, shareable, chat-enabled portals — built so Claude-generated work ships like a finished product.',
    ctaLabel: 'See the Product',
    ctaType: 'product-link',
    meta: {
      title: 'Crisply | AI-Powered Client Portals for Agencies | Brothers Automate',
      description: 'Crisply turns raw data into branded, interactive client reports with chat, analytics, and portal access. Ship AI work as a deliverable clients love.'
    },
    problem: {
      headline: 'Your AI work doesn\'t ship like a product',
      description: 'You run Claude, ChatGPT, or an agent pipeline and end up with a markdown file or a messy PDF. Clients don\'t experience it as a deliverable — they skim it once, then forget it exists.',
      painPoints: [
        'Raw AI output looks like a chat transcript, not a report',
        'No place for the client to come back and re-read or ask follow-up questions',
        'Zero visibility into whether they actually opened the deliverable',
        'Every new client needs fresh branding, hosting, and sharing setup'
      ]
    },
    solution: {
      headline: 'A client portal that turns AI output into a finished product',
      description: 'Crisply wraps your AI-generated reports in a branded, interactive portal at a shareable URL. Clients get a polished report with built-in chat, analytics on engagement, and a portal where all their deliverables live.',
      features: [
        { title: 'Interactive AI Reports', description: 'Branded HTML reports generated from raw data — hosted at shareable links, no PDF attachments.' },
        { title: 'Conversational Chat', description: 'Clients ask questions about their report and get answers grounded in their own data.' },
        { title: 'Client Portals', description: 'Every client gets a single home base where all their reports and deliverables live.' },
        { title: 'Engagement Analytics', description: 'See exactly which reports clients opened, how long they spent, and what they asked.' },
        { title: 'API-Driven Generation', description: 'Plug Crisply into your existing Claude / automation workflows — reports generate on demand.' },
        { title: 'Branded Per Client', description: 'Colors, logo, and layout match each client\'s brand, so it feels like their product, not ours.' }
      ]
    },
    results: {
      headline: 'Ship AI work the way clients expect to receive it',
      stats: [
        { number: '0', label: 'PDFs', context: 'Everything lives at a shareable URL' },
        { number: '100%', label: 'Branded', context: 'Per-client colors, logo, and layout' },
        { number: 'API', label: 'First', context: 'Plugs into any AI or automation workflow' }
      ]
    },
    cta: {
      headline: 'Stop sending raw AI output to paying clients',
      description: 'Crisply turns every report, audit, and deliverable into a polished, trackable portal. Built for agencies and operators who ship AI work every week.'
    },
    productUrl: 'https://www.crisply.fyi/',
    videoUrl: 'https://www.youtube.com/embed/LyVEeBVOLI0'
  }
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
