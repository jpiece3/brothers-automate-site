// Service/use-case landing page content
// Add a new service = add a new object to the `services` record below

export interface ServiceStat {
  number: string;
  label: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  icon: string; // SVG path data
}

export interface ServiceProofStat {
  number: string;
  label: string;
  context: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface RelatedProject {
  slug: string;
  name: string;
  description: string;
}

export interface RelatedIndustry {
  slug: string;
  name: string;
  blurb: string; // e.g. "Coaches lose 30% of leads to slow follow-up"
}

export interface ServiceData {
  slug: string;
  name: string;          // Full: "Lead Follow-Up Automation"
  shortName: string;     // Footer: "Lead Follow-Up"
  icon: string;          // SVG path data
  tagline: string;       // One-liner for hub page card

  meta: {
    title: string;       // "Lead Follow-Up Automation for Service Businesses | Brothers Automate"
    description: string; // 150-160 char SEO description
  };

  hero: {
    badge: string;
    headline: string;
    headlineGradient: string;
    subheadline: string;
    stats: ServiceStat[];
    trustSignal: string;
  };

  problem: {
    headline: string;
    painPoints: string[]; // 4 bullet points
    costOfInaction: string; // "Every hour without follow-up costs you $X"
  };

  solution: {
    headline: string;
    headlineHighlight: string;
    description: string;
    features: ServiceFeature[];
    conclusion: string;
    callout: string;
  };

  relatedProjects: RelatedProject[];
  relatedIndustries: RelatedIndustry[];

  socialProof: {
    headline: string;
    stats: ServiceProofStat[];
  };

  faq: ServiceFAQ[];

  cta: {
    headline: string;
    headlineHighlight: string;
    subheadline: string;
  };

  schema: {
    serviceType: string;
    description: string;
  };
}

export const services: Record<string, ServiceData> = {

  // ─────────────────────────────────────────────
  // 1. LEAD FOLLOW-UP AUTOMATION
  // ─────────────────────────────────────────────
  'lead-follow-up': {
    slug: 'lead-follow-up',
    name: 'Lead Follow-Up Automation',
    shortName: 'Lead Follow-Up',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    tagline: 'Respond to every lead in under 5 minutes — even at 2am',

    meta: {
      title: 'Lead Follow-Up Automation for Service Businesses | Brothers Automate',
      description: 'Stop losing deals to slow follow-up. We build AI systems that respond to leads in under 5 minutes, nurture them automatically, and book calls while you sleep.',
    },

    hero: {
      badge: 'Lead Follow-Up Automation',
      headline: 'Speed Wins Deals.',
      headlineGradient: 'Silence Kills Them.',
      subheadline: 'The average service business takes 47 hours to respond to a new lead. By then, your competitor already had the conversation. We build systems that respond in under 5 minutes, follow up automatically, and book calls on your calendar while you sleep.',
      stats: [
        { number: '< 5min', label: 'Response Time' },
        { number: '3x', label: 'More Conversions' },
        { number: '24/7', label: 'Always Following Up' },
        { number: '0', label: 'Leads Forgotten' },
      ],
      trustSignal: 'Built for service businesses. Not a chatbot template.',
    },

    problem: {
      headline: 'Your Best Leads Are Going to Your Competitors',
      painPoints: [
        'A lead fills out your form at 9pm. You see it at 8am. They already booked with someone else.',
        'Your follow-up depends on whoever remembers to check the inbox — and some days, nobody does.',
        'You have no idea which leads are hot and which are just browsing, so everyone gets the same treatment.',
        'Competitors with automated systems respond in minutes. You respond in hours. The math is obvious.',
      ],
      costOfInaction: 'Every hour without follow-up drops your close rate by 10%. A lead contacted within 5 minutes is 21x more likely to convert than one contacted after 30 minutes.',
    },

    solution: {
      headline: 'What Happens When',
      headlineHighlight: 'Every Lead Gets a Response in Minutes',
      description: 'We wire up a follow-up system that watches your lead sources — forms, ads, referrals — and responds instantly with a personalized message. Then it keeps following up on a smart schedule until they book or say no.',
      features: [
        {
          title: 'Instant First Response',
          description: 'New lead comes in, the system sends a personalized reply within minutes. Text, email, or both. They feel like you were sitting there waiting for them.',
          icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        },
        {
          title: 'Smart Follow-Up Sequences',
          description: 'Not just one email. A multi-touch sequence that adjusts based on how the lead responds. Opens but does not reply? Different message. Clicks but does not book? Different angle. The system adapts.',
          icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
        },
        {
          title: 'CRM and Calendar Sync',
          description: 'Every interaction gets logged in your CRM. Hot leads see your booking link automatically. No double-entry, no forgotten follow-ups, no leads sitting in a spreadsheet nobody checks.',
          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        },
        {
          title: 'Lead Scoring and Routing',
          description: 'The system scores leads based on their behavior — form answers, email engagement, page visits — and routes the hottest ones to you first. Cold leads get nurtured. Tire-kickers get filtered out.',
          icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
        },
      ],
      conclusion: 'The result: every lead hears from you fast, gets the right number of touches, and either books a call or gets nurtured until they are ready. Nothing slips through.',
      callout: 'The system handles follow-up while you sleep. You wake up to booked calls, not a list of leads you forgot to email.',
    },

    relatedProjects: [
      { slug: 'quiz-funnels', name: 'Quiz Funnels', description: 'Qualify leads with interactive quizzes that score readiness and route hot prospects to your calendar automatically.' },
      { slug: 'signal-engine', name: 'Signal Engine', description: 'Score and prioritize your prospect list so follow-up starts with the leads most likely to close.' },
    ],

    relatedIndustries: [
      { slug: 'coaches', name: 'Coaches & Consultants', blurb: 'Coaches lose 30% of leads to slow follow-up on discovery calls' },
      { slug: 'real-estate', name: 'Real Estate', blurb: 'Buyer leads go cold within hours — speed to response wins listings' },
      { slug: 'home-services', name: 'Home Services', blurb: 'Homeowners call 3 contractors and hire the first one who responds' },
      { slug: 'dental', name: 'Dental Practices', blurb: 'New patient inquiries drop off 40% when response takes over an hour' },
      { slug: 'hvac', name: 'HVAC Companies', blurb: 'Emergency calls go to whoever picks up first — not whoever is best' },
    ],

    socialProof: {
      headline: 'Why Automated Follow-Up Wins',
      stats: [
        { number: '21x', label: 'More Likely to Convert', context: 'when contacted within 5 minutes vs. 30 minutes' },
        { number: '80%', label: 'of Deals Need 5+ Touches', context: 'but most businesses stop after one' },
        { number: '0', label: 'Leads Forgotten', context: 'every inquiry gets a response, every time' },
      ],
    },

    faq: [
      {
        question: 'Does this replace my CRM?',
        answer: "No. It plugs into whatever you already use — HubSpot, GoHighLevel, Salesforce, even a Google Sheet. The system sends follow-ups and logs everything back to your CRM so your team sees the full picture.",
      },
      {
        question: 'Will leads know it is automated?',
        answer: "Not unless you want them to. We write the messages in your voice, personalized with their name and details. It reads like you typed it yourself. Because the responses are fast and relevant, people actually reply more often than they do to manual follow-up.",
      },
      {
        question: 'What if a lead replies with a question the system cannot handle?',
        answer: "The system flags it and routes it to you. You get a notification with the full conversation thread so you can jump in seamlessly. The lead never knows the handoff happened.",
      },
      {
        question: 'How long does setup take?',
        answer: "Most lead follow-up systems are live within 1-2 weeks. We map your lead sources, write the sequences, connect your CRM, and test everything end-to-end before flipping the switch.",
      },
      {
        question: "What's the investment?",
        answer: "Follow-up automations start at $1,497 for a single-channel system. Multi-channel builds with scoring and routing run $3,497-$4,997. Flat fee, no monthly retainer. That is less than the revenue from one deal you would have lost to slow follow-up.",
      },
    ],

    cta: {
      headline: 'Stop Losing Deals to',
      headlineHighlight: 'Slow Follow-Up',
      subheadline: 'Book a call and we will show you exactly where leads are falling through the cracks — and how to fix it in under two weeks.',
    },

    schema: {
      serviceType: 'Lead Follow-Up Automation',
      description: 'AI-driven lead follow-up systems that respond to inquiries within minutes, nurture prospects with smart sequences, and book calls automatically for service businesses.',
    },
  },

  // ─────────────────────────────────────────────
  // 2. CLIENT ONBOARDING AUTOMATION
  // ─────────────────────────────────────────────
  'client-onboarding': {
    slug: 'client-onboarding',
    name: 'Client Onboarding Automation',
    shortName: 'Client Onboarding',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
    tagline: 'Same perfect onboarding for every client — zero manual steps',

    meta: {
      title: 'Client Onboarding Automation for Service Businesses | Brothers Automate',
      description: 'Automate your entire client onboarding flow — welcome emails, document collection, scheduling, and data sync. Every client gets the same great experience.',
    },

    hero: {
      badge: 'Client Onboarding Automation',
      headline: 'You Won the Client.',
      headlineGradient: 'Now Don\'t Lose Them to a Sloppy Start.',
      subheadline: 'The first week with a new client sets the tone for the entire relationship. But when onboarding is manual, things get missed. Documents get lost. Emails go unsent. We build systems that handle the entire onboarding flow so every client gets the same smooth experience.',
      stats: [
        { number: '0', label: 'Manual Steps' },
        { number: '100%', label: 'Consistency' },
        { number: 'Hours', label: 'Saved Per Client' },
        { number: '24/7', label: 'Runs Itself' },
      ],
      trustSignal: 'Built for a paving company. Works for any service business.',
    },

    problem: {
      headline: 'Manual Onboarding Is Costing You More Than You Think',
      painPoints: [
        'New client signs up and the welcome email goes out... two days later. Or never. Depends on who was supposed to send it.',
        'You ask for the same documents every time, but the process for collecting them changes depending on who is handling it.',
        'Client details get typed into three different systems by hand. Something always gets wrong — a misspelled name, a wrong address, a missed detail.',
        'When things get busy, onboarding steps get skipped entirely. The client notices. They just don\'t always tell you.',
      ],
      costOfInaction: 'A botched onboarding costs you 3-5x more in client churn than the automation costs to build. First impressions are the hardest to undo.',
    },

    solution: {
      headline: 'What Happens When',
      headlineHighlight: 'Onboarding Runs Itself',
      description: 'We build a system that triggers the moment a client says yes. Welcome emails go out, documents get requested, scheduling links get sent, and all client data flows into your systems automatically. Same steps. Same order. Every single time.',
      features: [
        {
          title: 'Automated Welcome Sequence',
          description: 'The second a client is marked as "won" in your CRM, the system sends a personalized welcome email, introduces next steps, and sets expectations. No one has to remember to hit send.',
          icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        },
        {
          title: 'Document Collection on Autopilot',
          description: 'Contracts, W-9s, insurance certs, project briefs — whatever you need. The system sends requests, tracks what is missing, and follows up until everything is in. No chasing.',
          icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        },
        {
          title: 'Scheduling Without the Back-and-Forth',
          description: 'Kickoff calls, walkthroughs, check-ins — the system sends scheduling links at the right time. No 6-email thread trying to find a time that works. The client picks a slot and it is done.',
          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        },
        {
          title: 'Data Synced Everywhere',
          description: 'Client name, project details, contact info — entered once, synced to every tool you use. CRM, project management, accounting. No copy-paste. No mismatches. No forgotten updates.',
          icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
        },
      ],
      conclusion: 'The client feels taken care of from day one. Your team does not have to think about it. Every onboarding runs the same proven playbook without anyone managing it manually.',
      callout: 'New client signs up. The system handles it. Welcome email, documents, scheduling, data sync — all done before you finish your coffee.',
    },

    relatedProjects: [
      { slug: 'onboarding-workflow', name: 'Onboarding Workflow', description: 'See how we automated the entire new-client flow for a paving company — comms, scheduling, and docs with zero manual work.' },
    ],

    relatedIndustries: [
      { slug: 'coaches', name: 'Coaches & Consultants', blurb: 'Coaches onboard 5-10 clients per month and forget steps when things get busy' },
      { slug: 'financial-advisors', name: 'Financial Advisors', blurb: 'Advisors need consistent document collection for compliance and account setup' },
      { slug: 'legal', name: 'Law Firms', blurb: 'Legal intake requires precise document handling that cannot afford mistakes' },
      { slug: 'accounting', name: 'Accounting Firms', blurb: 'New client onboarding in accounting means gathering 10+ documents every time' },
    ],

    socialProof: {
      headline: 'Why Automated Onboarding Pays for Itself',
      stats: [
        { number: '0', label: 'Missed Steps', context: 'the same process runs perfectly every time' },
        { number: '3-5hrs', label: 'Saved Per Client', context: 'no manual emails, scheduling, or data entry' },
        { number: '2x', label: 'Faster to First Value', context: 'clients start getting results sooner' },
      ],
    },

    faq: [
      {
        question: 'Will this work with my existing tools?',
        answer: "Yes. We build around whatever you already use — HubSpot, Monday, Notion, Google Workspace, QuickBooks, you name it. The system connects your tools so data flows between them without anyone touching a spreadsheet.",
      },
      {
        question: 'What if my onboarding process is different for different services?',
        answer: "That is actually the norm. We build branching logic so the system runs a different flow depending on the service, package, or client type. Same automation, different paths. Every client gets exactly what they need.",
      },
      {
        question: 'How long does this take to set up?',
        answer: "Most onboarding automations are live in 1-2 weeks. We map your current process, identify every step and handoff, build the automation, test it end-to-end, and deploy it on your accounts.",
      },
      {
        question: "What's the investment?",
        answer: "Onboarding automations start at $1,497 for a straightforward flow. Multi-branch builds with document collection and CRM sync run $3,497-$4,997. Flat fee, no monthly retainer. If onboarding takes your team 3 hours per client and you onboard 10 clients per month, the math is pretty clear.",
      },
      {
        question: 'Can I change the process later?',
        answer: "Absolutely. We hand you full documentation and access. When your process evolves — new steps, new tools, new service lines — you can adjust the flow yourself or bring us back to update it.",
      },
    ],

    cta: {
      headline: 'Stop Onboarding Clients',
      headlineHighlight: 'By Memory',
      subheadline: 'Book a call and we will map your current onboarding process, find where things break, and show you how to automate it in under two weeks.',
    },

    schema: {
      serviceType: 'Client Onboarding Automation',
      description: 'Automated client onboarding systems that handle welcome sequences, document collection, scheduling, and data synchronization for service businesses.',
    },
  },

  // ─────────────────────────────────────────────
  // 3. AI AD CREATIVE
  // ─────────────────────────────────────────────
  'ad-creative': {
    slug: 'ad-creative',
    name: 'AI Ad Creative',
    shortName: 'Ad Creative',
    icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
    tagline: 'Fresh, on-brand ad creative every day — no designer, no agency',

    meta: {
      title: 'AI Ad Creative for Service Businesses | Brothers Automate',
      description: 'Get fresh, on-brand ad creative generated daily across 21 formats. Stop paying designers $5K/month for ads that go stale in a week. Custom-built in 1-2 weeks.',
    },

    hero: {
      badge: 'AI Ad Creative',
      headline: 'Your Ads Go Stale.',
      headlineGradient: 'Your Budget Pays the Price.',
      subheadline: 'Creative fatigue is the silent killer of ad performance. Same images running for months, costs creeping up, CTR dropping. We build an AI ad engine trained on your brand that generates fresh creative daily across 21 formats. No designer. No agency retainer.',
      stats: [
        { number: '21', label: 'Ad Formats' },
        { number: 'Daily', label: 'Fresh Creative' },
        { number: '80%', label: 'Cost Reduction' },
        { number: '0', label: 'Designer Needed' },
      ],
      trustSignal: 'Trained on your brand. Not generic stock templates.',
    },

    problem: {
      headline: 'Creative Fatigue Is Bleeding Your Ad Budget',
      painPoints: [
        'You are running the same 3-5 ad images you made 6 months ago. Your audience has seen them so many times they scroll right past.',
        'Your designer costs $3K-5K per month and still takes a week to turn around new variations. By the time new creative is ready, you needed it yesterday.',
        'You know you should be testing more variants — different hooks, different visuals, different formats — but producing that volume is impossible at your budget.',
        'Your cost per lead keeps climbing and you cannot figure out why. The answer is almost always stale creative.',
      ],
      costOfInaction: 'Ad fatigue increases your cost per acquisition by 20-50% over time. Every week you run the same creative, you are paying more for worse results.',
    },

    solution: {
      headline: 'What Happens When',
      headlineHighlight: 'Fresh Ads Show Up Every Morning',
      description: 'We train an AI engine on your brand — colors, fonts, voice, imagery style — and it generates new ad creative every single day. Static images, video cuts, copy variations. You pick the winners and deploy them.',
      features: [
        {
          title: 'Brand-Trained Generation',
          description: 'The AI learns your brand identity — visual style, color palette, messaging tone, product photography. Every piece of creative looks and sounds like it came from your team, because it was trained on your team\'s work.',
          icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
        },
        {
          title: '15+ Static Formats',
          description: 'Testimonial cards, before-and-after comparisons, feature callouts, social proof layouts, problem-solution frames, and more. Each format is designed to test a different angle with your audience.',
          icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
        },
        {
          title: '6 Video Ad Formats',
          description: 'Animated text reveals, product showcases, testimonial highlight reels, and scroll-stopping hooks. Short-form video that works on Meta, TikTok, and YouTube Shorts without a videographer.',
          icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z',
        },
        {
          title: 'Performance Learning',
          description: 'Feed your performance data back in and the system learns which creative styles, hooks, and formats drive the best results. Next batch gets smarter. Your ads get cheaper over time, not more expensive.',
          icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        },
      ],
      conclusion: 'You get a never-ending supply of on-brand creative without the never-ending invoices. Test more, learn faster, and keep your cost per lead heading down instead of up.',
      callout: 'Fresh creative shows up every morning. You pick the winners, deploy them, and never worry about ad fatigue again.',
    },

    relatedProjects: [
      { slug: 'daily-ads', name: 'Daily Ads', description: 'See the AI ad engine in action — fresh creative generated daily across 15+ static and 6 video formats.' },
    ],

    relatedIndustries: [
      { slug: 'ecommerce', name: 'E-commerce', blurb: 'E-commerce brands burn through creative faster than any other category' },
      { slug: 'coaches', name: 'Coaches & Consultants', blurb: 'Coaches running Meta ads need fresh angles to avoid audience fatigue' },
      { slug: 'medical-spa', name: 'Medical Spas', blurb: 'Med spas need compliant creative that still stops the scroll' },
    ],

    socialProof: {
      headline: 'Why AI Ad Creative Outperforms Agencies',
      stats: [
        { number: '80%', label: 'Lower Cost', context: 'compared to a $5K/month agency or designer' },
        { number: '21', label: 'Formats Per Day', context: '15 static + 6 video variations' },
        { number: '50%', label: 'Lower CPA Over Time', context: 'when creative stays fresh and tests run continuously' },
      ],
    },

    faq: [
      {
        question: 'Will the creative actually look like my brand?',
        answer: "Yes. We spend the first few days training the system on your brand identity — logo usage, color palette, font hierarchy, photography style, messaging tone. The output looks like it came from your in-house team, because the AI learned from your in-house team's work.",
      },
      {
        question: 'What platforms does this work for?',
        answer: "Meta (Facebook + Instagram), Google Display, TikTok, YouTube Shorts, LinkedIn. We generate creative in the right dimensions and formats for each platform. You get platform-ready files, not generic images you have to resize.",
      },
      {
        question: 'Do I still need to manage my ad campaigns?',
        answer: "Yes — this generates the creative, not the campaigns. You (or your media buyer) still handle targeting, budgets, and optimization. We give you a steady stream of fresh creative to test. If you do not have a media buyer, we can recommend one.",
      },
      {
        question: 'How long does setup take?',
        answer: "Brand training and first batch of creative takes about 1 week. The ongoing daily generation starts immediately after. Within 2 weeks you have a fully operational ad creative engine.",
      },
      {
        question: "What's the investment?",
        answer: "The ad engine build starts at $2,497. That includes brand training, format configuration, and the first month of daily generation. Ongoing generation after that is a flat monthly fee — still a fraction of what a designer or agency would charge.",
      },
    ],

    cta: {
      headline: 'Stop Paying Agency Prices for',
      headlineHighlight: 'Stale Ads',
      subheadline: 'Book a call to see what daily AI ad creative looks like for your brand.',
    },

    schema: {
      serviceType: 'AI Ad Creative Generation',
      description: 'AI-driven ad creative systems that generate fresh, brand-matched static and video ads daily across 21 formats for service businesses and e-commerce brands.',
    },
  },

  // ─────────────────────────────────────────────
  // 4. AI RESUME SCREENING
  // ─────────────────────────────────────────────
  'resume-screening': {
    slug: 'resume-screening',
    name: 'AI Resume Screening',
    shortName: 'Resume Screening',
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
    tagline: 'Screen hundreds of resumes in seconds — hire the right people faster',

    meta: {
      title: 'AI Resume Screening for Service Businesses | Brothers Automate',
      description: 'Stop spending hours reading resumes. Our AI screening system scores, ranks, and shortlists candidates in seconds. Built for YMCA. Custom-built in 1-2 weeks.',
    },

    hero: {
      badge: 'AI Resume Screening',
      headline: 'You Need Good People.',
      headlineGradient: 'Not More Hours Reading Resumes.',
      subheadline: 'Every open position brings a flood of applications. Most are not a fit. But finding the ones who are means reading every single resume — or it used to. We build screening systems that score and rank candidates against your specific criteria in seconds.',
      stats: [
        { number: '85%', label: 'Less Screening Time' },
        { number: 'Seconds', label: 'Per Resume' },
        { number: '100s', label: 'Processed Per Cycle' },
        { number: '100%', label: 'Consistent Criteria' },
      ],
      trustSignal: 'Built for the YMCA. Proven at scale.',
    },

    problem: {
      headline: 'Hiring Is Eating Your Productivity',
      painPoints: [
        'A single job posting generates 50-200 applications. Reading through them takes 3+ hours per position, and that is time you could spend running the business.',
        'Your best candidates are getting hired by faster companies while your resumes sit in an inbox waiting for someone to review them.',
        'Screening quality depends entirely on who is doing the reading. Monday morning energy is different from Friday afternoon energy. The criteria shifts.',
        'Seasonal hiring means this painful cycle repeats every few months — same bottleneck, same time drain, same inconsistency.',
      ],
      costOfInaction: 'A bad hire costs 30% of their first-year salary. A good hire you missed because you were too slow to screen? That cost is invisible but just as real.',
    },

    solution: {
      headline: 'What Happens When',
      headlineHighlight: 'AI Reads Every Resume for You',
      description: 'We build a screening system trained on your specific hiring criteria. It reads every resume, scores candidates on the factors that actually matter to your business, and delivers a ranked shortlist so you skip straight to interviewing the best fits.',
      features: [
        {
          title: 'Custom Criteria Matching',
          description: 'You tell us what matters — certifications, years of experience, specific skills, availability, location. The system evaluates every resume against your exact requirements, not a generic template.',
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        },
        {
          title: 'Instant Scoring',
          description: 'Every resume gets scored within seconds of submission. The system reads the full document — not just keywords — and evaluates fit based on context, not checkbox matching.',
          icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        },
        {
          title: 'Ranked Shortlists',
          description: 'Top candidates surface to the top with a clear explanation of why they scored well. You see the reasoning, not just a number. Your hiring manager starts interviews with the best candidates first.',
          icon: 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12',
        },
        {
          title: 'Bias Reduction',
          description: 'Every applicant gets evaluated against the same criteria with the same rigor. No name bias, no resume-format bias, no Friday-afternoon fatigue. Just consistent evaluation based on the factors you defined.',
          icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
        },
      ],
      conclusion: 'You get a shortlist of the best candidates with clear reasoning for each score. Your team spends time interviewing, not reading. And the criteria never drift.',
      callout: 'Resumes come in. The system scores them. You interview the top candidates. The whole process takes seconds instead of hours.',
    },

    relatedProjects: [
      { slug: 'screenfast', name: 'ScreenFast', description: 'See how we built an AI resume screening system for the YMCA that reduced screening time by 85%.' },
    ],

    relatedIndustries: [
      { slug: 'cleaning', name: 'Cleaning Companies', blurb: 'Cleaning companies hire constantly and cannot spend all day reading applications' },
      { slug: 'landscaping', name: 'Landscaping', blurb: 'Seasonal landscaping crews mean screening surges every spring and fall' },
      { slug: 'hvac', name: 'HVAC Companies', blurb: 'HVAC techs are hard to find — you need to move fast on qualified applicants' },
    ],

    socialProof: {
      headline: 'Why AI Screening Outperforms Manual Review',
      stats: [
        { number: '85%', label: 'Less Screening Time', context: 'proven results from YMCA deployment' },
        { number: '100%', label: 'Consistent Evaluation', context: 'same criteria applied to every single applicant' },
        { number: '10x', label: 'Faster Time-to-Shortlist', context: 'interview your best candidates while competitors are still reading' },
      ],
    },

    faq: [
      {
        question: 'Will this work for non-technical roles?',
        answer: "Absolutely. We have built this for seasonal camp counselors, maintenance staff, front desk roles, and field technicians. The system evaluates whatever criteria you define — availability, certifications, soft skills, experience level. It is not limited to tech hiring.",
      },
      {
        question: 'How does it handle resumes in different formats?',
        answer: "PDFs, Word docs, plain text — the system reads them all. It extracts the relevant information regardless of formatting. A beautifully designed resume and a plain text email both get evaluated on the same criteria.",
      },
      {
        question: 'Can it integrate with our job posting platform?',
        answer: "Yes. We can connect to Indeed, LinkedIn, your ATS, or even a simple email inbox where applications land. Resumes get pulled in automatically and scored without anyone downloading or forwarding files.",
      },
      {
        question: 'How long does setup take?',
        answer: "Most screening systems are live in 1-2 weeks. We define your criteria, train the scoring model, connect your application sources, and test with real resumes before going live.",
      },
      {
        question: "What's the investment?",
        answer: "Resume screening systems start at $2,497 for a single-role setup. Multi-role systems with ATS integration run $4,997+. Flat fee, no monthly retainer. If you are spending 3 hours per position on screening and you hire for 5 positions per quarter, the time savings alone make this a no-brainer.",
      },
    ],

    cta: {
      headline: 'Stop Spending Hours',
      headlineHighlight: 'Reading Resumes',
      subheadline: 'Book a call and we will show you how AI screening can cut your hiring time in half.',
    },

    schema: {
      serviceType: 'AI Resume Screening',
      description: 'AI-driven resume screening systems that score, rank, and shortlist job candidates against custom criteria for service businesses with high-volume or seasonal hiring needs.',
    },
  },

  // ─────────────────────────────────────────────
  // 5. REVIEW RESPONSE AUTOMATION
  // ─────────────────────────────────────────────
  'review-management': {
    slug: 'review-management',
    name: 'Review Response Automation',
    shortName: 'Review Management',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    tagline: 'Every Google review answered — fast, personal, on-brand',

    meta: {
      title: 'Review Response Automation for Service Businesses | Brothers Automate',
      description: 'Never miss a Google review again. Our AI responds to every review within an hour — personalized, on-brand, and tone-matched. Built for service businesses.',
    },

    hero: {
      badge: 'Review Response Automation',
      headline: 'Your Reputation Is Your Pipeline.',
      headlineGradient: 'Protect It Automatically.',
      subheadline: '90% of customers read reviews before choosing a service business. But most businesses let reviews pile up unanswered — especially the negative ones. We build systems that respond to every review within an hour, in your voice, with the right tone for the situation.',
      stats: [
        { number: '< 1hr', label: 'Response Time' },
        { number: '5-Star', label: 'Reputation' },
        { number: '100%', label: 'Response Rate' },
        { number: '0', label: 'Reviews Ignored' },
      ],
      trustSignal: 'Built for service businesses that live and die by Google reviews.',
    },

    problem: {
      headline: 'Unanswered Reviews Are Costing You Customers',
      painPoints: [
        'You have 47 Google reviews and only responded to 12 of them. Every unanswered review tells the next customer you do not care about feedback.',
        'A 1-star review went up last Tuesday. You meant to respond but got busy. Now it is been a week and the damage is done — future customers see silence where they expected accountability.',
        'Writing a thoughtful review response takes 10-15 minutes. Multiply that by 5-10 reviews per month and it is another task that never makes it to the top of the list.',
        'Google rewards businesses that respond to reviews with better local search rankings. Every unanswered review is a missed SEO opportunity.',
      ],
      costOfInaction: 'A single unanswered negative review can deter 22% of potential customers. Businesses that respond to reviews earn 35% more revenue than those that do not.',
    },

    solution: {
      headline: 'What Happens When',
      headlineHighlight: 'Every Review Gets a Reply',
      description: 'We build a monitoring system that watches your Google Business Profile around the clock. When a new review comes in — positive or negative — the system crafts a personalized, tone-appropriate response and posts it within the hour.',
      features: [
        {
          title: 'Instant Review Monitoring',
          description: 'The system watches your Google Business Profile continuously. New review? You get notified and a response is already being drafted. No more discovering reviews a week late.',
          icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
        },
        {
          title: 'Tone-Matched Responses',
          description: 'Positive review? Warm, grateful, specific. Negative review? Empathetic, accountable, professional. The system matches the tone to the situation. A 5-star review does not get the same response template as a 2-star complaint.',
          icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
        },
        {
          title: 'Sentiment Analysis',
          description: 'The system reads the review deeply — not just the star rating. A 3-star review that mentions great work but slow communication gets a different response than a 3-star review about pricing. Context matters.',
          icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        },
        {
          title: 'Review Generation Prompts',
          description: 'Happy clients often forget to leave reviews. The system sends a gentle follow-up after project completion with a direct link to your Google profile. More reviews means more social proof and better local rankings.',
          icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
        },
      ],
      conclusion: 'Every review gets a thoughtful, personalized reply. Positive ones build loyalty. Negative ones show accountability. And Google notices the consistency, which helps your local ranking.',
      callout: 'New review comes in. The system responds. Your reputation grows while you focus on delivering great work.',
    },

    relatedProjects: [
      { slug: 'google-review-response', name: 'Google Review Response', description: 'AI-powered review monitoring and response that keeps your Google reputation strong around the clock.' },
    ],

    relatedIndustries: [
      { slug: 'dental', name: 'Dental Practices', blurb: 'Dental practices live on Google reviews — one bad review can cancel out ten good ones' },
      { slug: 'home-services', name: 'Home Services', blurb: 'Homeowners check reviews before calling any contractor — response rate matters' },
      { slug: 'hvac', name: 'HVAC Companies', blurb: 'HVAC is an emergency purchase — reviews are the first thing people check' },
      { slug: 'cleaning', name: 'Cleaning Companies', blurb: 'Trust is everything in cleaning — reviews prove you are reliable' },
    ],

    socialProof: {
      headline: 'Why Review Response Matters This Much',
      stats: [
        { number: '35%', label: 'More Revenue', context: 'for businesses that respond to reviews vs. those that do not' },
        { number: '100%', label: 'Response Rate', context: 'every single review gets a personalized reply' },
        { number: '< 1hr', label: 'Average Response Time', context: 'reviews get answered before the customer moves on' },
      ],
    },

    faq: [
      {
        question: 'Will people know the responses are automated?',
        answer: "No. Every response is written in your voice, personalized to the specific review. We reference details from the review itself — the service they received, the team member they mentioned, the specific outcome. It reads like the owner typed it, because the AI was trained on how the owner talks.",
      },
      {
        question: 'What about negative reviews? Can AI handle those?',
        answer: "Yes, and carefully. Negative reviews get a response that acknowledges the concern, takes responsibility where appropriate, and offers to make it right — all in a professional, measured tone. You can also set it up so negative reviews get flagged for your personal approval before the response goes live.",
      },
      {
        question: 'Does this help with getting more reviews too?',
        answer: "Yes. The system includes a review generation component that sends follow-up messages to happy clients after project completion with a direct link to leave a review. More reviews, better ratings, stronger local SEO.",
      },
      {
        question: 'How long does setup take?',
        answer: "Most review response systems are live within 1 week. We connect to your Google Business Profile, train the response model on your voice, configure tone rules for different star ratings, and test with real reviews before going live.",
      },
      {
        question: "What's the investment?",
        answer: "Review response automation starts at $1,497 for monitoring and response. Adding review generation prompts runs $2,497. Flat fee for setup, no monthly retainer. If one prevented negative review saves you even a single customer, it has already paid for itself.",
      },
    ],

    cta: {
      headline: 'Stop Letting Reviews',
      headlineHighlight: 'Go Unanswered',
      subheadline: 'Book a call and we will audit your current Google review presence and show you what automated responses look like in your voice.',
    },

    schema: {
      serviceType: 'Review Response Automation',
      description: 'Automated Google review monitoring and response systems that reply to every review with personalized, tone-matched messages for service businesses.',
    },
  },

  // ─────────────────────────────────────────────
  // 6. AI PROSPECT RESEARCH
  // ─────────────────────────────────────────────
  'prospect-research': {
    slug: 'prospect-research',
    name: 'AI Prospect Research',
    shortName: 'Prospect Research',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7',
    tagline: 'Know everything about a prospect before you ever reach out',

    meta: {
      title: 'AI Prospect Research for Service Businesses | Brothers Automate',
      description: 'Stop Googling prospects for 30 minutes each. Our AI researches companies, maps decision-makers, and writes personalized outreach briefs. Done in minutes.',
    },

    hero: {
      badge: 'AI Prospect Research',
      headline: 'Generic Outreach Gets Ignored.',
      headlineGradient: 'Informed Outreach Gets Replies.',
      subheadline: 'Your sales team spends hours Googling companies, scrolling LinkedIn, and piecing together intel before a single email goes out. We build research systems that do all of that in minutes — and hand you a brief with the data points and outreach angle that actually gets a reply.',
      stats: [
        { number: '10min', label: 'Research Per Prospect' },
        { number: '90%', label: 'Time Saved' },
        { number: '10+', label: 'Data Points Per Company' },
        { number: '0', label: 'Manual Research' },
      ],
      trustSignal: 'Built for B2B service businesses. Not a data scraper.',
    },

    problem: {
      headline: 'Manual Research Is Your Most Expensive Bottleneck',
      painPoints: [
        'Your sales rep spends 20-30 minutes researching each company before sending an email. At 10 prospects per day, that is 3-5 hours just on research — not selling.',
        'Despite all that research, the outreach still sounds generic. "I noticed you are growing fast" is not personalization. It is a template pretending to be personal.',
        'You have no system for tracking trigger events — funding rounds, leadership changes, job postings, expansion signals — that indicate a prospect is ready to buy right now.',
        'By the time you finish researching a company, your competitor who has automated this process already sent a relevant, timely email three days ago.',
      ],
      costOfInaction: 'Every hour your sales team spends on manual research is an hour they are not spending on calls, demos, and closing. At $50/hour fully loaded, that is $250/day in research costs for a single rep.',
    },

    solution: {
      headline: 'What Happens When',
      headlineHighlight: 'AI Does the Research for You',
      description: 'We build a research system that takes your prospect list and runs a multi-source analysis on each company. Websites, news, job postings, social profiles, funding data — all synthesized into a brief your team can act on immediately.',
      features: [
        {
          title: 'Automated Company Research',
          description: 'The system scans websites, press releases, social profiles, and public filings to build a complete picture of each company. Industry, size, tech stack, recent news, competitive positioning — all pulled together in one brief.',
          icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
        },
        {
          title: 'Decision-Maker Mapping',
          description: 'Who owns the budget? Who influences the decision? The system identifies key contacts at each company — titles, roles, LinkedIn profiles — so your outreach lands on the right desk, not a gatekeeper\'s inbox.',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
        },
        {
          title: 'Trigger Event Detection',
          description: 'New funding round? Key hire? Office expansion? Job posting for a role you solve? The system flags these signals so your team reaches out at exactly the right moment — when the prospect has a need, not just a budget.',
          icon: 'M13 10V3L4 14h7v7l9-11h-7z',
        },
        {
          title: 'Personalized Outreach Briefs',
          description: 'Each company gets a 2-3 sentence outreach angle that connects their specific situation to your offer. Not "I see you are in the XYZ industry." Instead: "You just posted for a marketing manager, which usually means your current process is maxed out. Here is how we helped a similar company."',
          icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        },
      ],
      conclusion: 'Your team gets a stack of research briefs with outreach angles ready to go. They spend their time sending smart messages and having conversations, not Googling company backgrounds.',
      callout: 'Upload your list. Get back research briefs with data points, trigger events, and personalized outreach angles. Your team sends better emails in a fraction of the time.',
    },

    relatedProjects: [
      { slug: 'signal-engine', name: 'Signal Engine', description: 'See how Signal Engine scores and ranks prospect lists using a 4-tier waterfall that checks websites, news, job postings, and funding data.' },
      { slug: 'brand-research', name: 'Brand Research', description: 'AI-powered competitor analysis and market intelligence delivered in minutes instead of weeks.' },
    ],

    relatedIndustries: [
      { slug: 'financial-advisors', name: 'Financial Advisors', blurb: 'Advisors need deep prospect intel before reaching out to high-net-worth individuals' },
      { slug: 'legal', name: 'Law Firms', blurb: 'Business development in law requires knowing the prospect\'s situation before the first call' },
      { slug: 'real-estate', name: 'Real Estate', blurb: 'Commercial agents need company research to identify tenants and buyers' },
    ],

    socialProof: {
      headline: 'Why AI Research Beats Manual Prospecting',
      stats: [
        { number: '90%', label: 'Less Research Time', context: 'what took 30 minutes per company now takes 3' },
        { number: '10+', label: 'Data Points Per Company', context: 'industry, size, tech stack, news, trigger events, contacts' },
        { number: '3x', label: 'More Outreach Volume', context: 'same team, better messages, more conversations started' },
      ],
    },

    faq: [
      {
        question: 'Where does the data come from?',
        answer: "Public sources — company websites, press releases, job postings, LinkedIn profiles, funding databases, news articles, and SEC filings when applicable. We do not scrape anything behind a login or violate terms of service. The system aggregates what is already public and organizes it so your team does not have to.",
      },
      {
        question: 'How accurate is the research?',
        answer: "It is as accurate as the public data available. Company websites, recent news, and job postings are highly reliable. The system flags confidence levels so your team knows which data points are rock-solid and which are inferred. You always review the brief before reaching out.",
      },
      {
        question: 'Can it monitor for trigger events over time?',
        answer: "Yes. We can set up weekly re-scans of your prospect list to catch new signals — funding rounds, leadership changes, job postings, expansion announcements. When a trigger fires, your team gets alerted with an updated brief and a fresh outreach angle.",
      },
      {
        question: 'How long does setup take?',
        answer: "Most prospect research systems are live in 1-2 weeks. We define your ideal customer profile, configure the data sources and scoring criteria, and run a pilot batch on your real prospect list before going live.",
      },
      {
        question: "What's the investment?",
        answer: "Prospect research systems start at $3,497 for a batch processing setup. Ongoing monitoring with trigger alerts runs $4,997+. Flat fee, no monthly retainer. If your sales team spends 20 hours per week on research, even a 50% time reduction pays for itself in the first month.",
      },
    ],

    cta: {
      headline: 'Stop Googling Prospects',
      headlineHighlight: 'One by One',
      subheadline: 'Book a call and we will run a pilot research batch on your real prospect list so you can see what AI research looks like for your business.',
    },

    schema: {
      serviceType: 'AI Prospect Research',
      description: 'AI-driven prospect research systems that analyze companies, map decision-makers, detect trigger events, and generate personalized outreach briefs for B2B service businesses.',
    },
  },

  // ─────────────────────────────────────────────
  // 7. ROUTE OPTIMIZATION
  // ─────────────────────────────────────────────
  'route-optimization': {
    slug: 'route-optimization',
    name: 'Route Optimization',
    shortName: 'Route Optimization',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    tagline: 'Less driving, more jobs, lower fuel bills — every single day',

    meta: {
      title: 'Route Optimization for Service Businesses | Brothers Automate',
      description: 'Cut drive time by 30% and fit 2+ extra jobs per week with AI-optimized daily routing. Built for contractors, HVAC, landscaping, and cleaning companies.',
    },

    hero: {
      badge: 'Route Optimization',
      headline: 'Every Mile You Drive Costs Money.',
      headlineGradient: 'Most of Those Miles Are Wasted.',
      subheadline: 'Your crews zigzag across town because nobody has time to plan efficient routes. You are burning fuel, wasting hours, and leaving 2-3 jobs per week on the table. We build routing systems that sequence your daily jobs for minimum drive time and maximum capacity.',
      stats: [
        { number: '30%', label: 'Less Drive Time' },
        { number: '+2', label: 'Extra Jobs/Week' },
        { number: '$$', label: 'Fuel Saved Monthly' },
        { number: '0', label: 'Route Planning Time' },
      ],
      trustSignal: 'Built for field service businesses. Not a consumer GPS app.',
    },

    problem: {
      headline: 'Windshield Time Is Your Invisible Expense',
      painPoints: [
        'Your dispatcher or crew lead spends 20-30 minutes every morning figuring out the order of jobs. That is planning time, not billable time.',
        'Crews drive past jobs they will visit later in the day to get to one that was scheduled first. Nobody optimized the sequence — they just go in the order the jobs were booked.',
        'A last-minute cancellation or add-on throws the whole day off. Re-routing manually means stopping, calling, and figuring it out on the fly.',
        'You know you could fit more jobs per day if the driving was tighter, but nobody has time to sit down with a map and figure out the math.',
      ],
      costOfInaction: 'The average field service business wastes 20-30% of drive time on inefficient routing. For a 3-truck operation, that is $15K-25K per year in fuel, labor, and lost capacity.',
    },

    solution: {
      headline: 'What Happens When',
      headlineHighlight: 'AI Plans Your Routes',
      description: 'We build a routing system that takes your daily job list and outputs the optimal sequence — factoring in location, time windows, job duration, traffic patterns, and crew assignments. Your team gets a route each morning that minimizes driving and maximizes the number of jobs they can complete.',
      features: [
        {
          title: 'Daily Route Sequencing',
          description: 'Feed in your jobs for the day and the system outputs the optimal order. Not just shortest distance — it accounts for time windows, job duration, and traffic patterns. Your crews spend less time on the road and more time on the job.',
          icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
        },
        {
          title: 'Real-Time Traffic Awareness',
          description: 'Morning construction on Route 30? School zone slowdown at 3pm? The system knows. Routes account for real traffic conditions, not just map distance. The route that looks longer on paper is sometimes faster in practice.',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        },
        {
          title: 'Fuel and Mileage Tracking',
          description: 'See exactly how many miles each crew drives per day and how that compares to the previous week. Track fuel costs against job revenue. The data tells you whether your routing is getting better or worse.',
          icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        },
        {
          title: 'Capacity Optimization',
          description: 'The system shows you where you have gaps in the schedule and which zones have open time. Got a same-day request? The system tells you which crew can take it with the least additional drive time.',
          icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm12 0a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
        },
      ],
      conclusion: 'Your morning starts with an optimized route instead of a guessing game. Crews drive less, complete more jobs, and you see the impact in fuel savings and weekly revenue.',
      callout: 'Jobs go in. Optimized routes come out. Your crews hit the road with a plan that saves time, fuel, and money every single day.',
    },

    relatedProjects: [
      { slug: 'route-simply', name: 'Route Simply', description: 'See Route Simply in action — AI-optimized daily routing that cut drive time by 30% for a contractor operation.' },
    ],

    relatedIndustries: [
      { slug: 'home-services', name: 'Home Services', blurb: 'Contractors drive to 5-8 job sites per day — route order matters enormously' },
      { slug: 'hvac', name: 'HVAC Companies', blurb: 'HVAC techs cover wide service areas where inefficient routing wastes hours' },
      { slug: 'landscaping', name: 'Landscaping', blurb: 'Landscaping crews visit 8-15 properties per day — route sequence drives profitability' },
      { slug: 'cleaning', name: 'Cleaning Companies', blurb: 'Cleaning teams hit 4-8 locations daily — tight routes mean fitting more clients' },
    ],

    socialProof: {
      headline: 'Why Optimized Routing Pays for Itself Fast',
      stats: [
        { number: '30%', label: 'Less Drive Time', context: 'average reduction with AI-optimized daily routing' },
        { number: '+2', label: 'Extra Jobs Per Week', context: 'from time saved on driving alone' },
        { number: '$15K+', label: 'Annual Savings', context: 'for a 3-truck operation in fuel and labor costs' },
      ],
    },

    faq: [
      {
        question: 'How does this work with last-minute schedule changes?',
        answer: "It handles them. When a job gets cancelled or a same-day request comes in, the system re-optimizes the route in real time. Your dispatcher sees the updated route instantly and can push it to the crew. No more phone calls to figure out the new plan.",
      },
      {
        question: 'Does this work for multi-crew operations?',
        answer: "Yes. The system optimizes routes across multiple crews simultaneously. It assigns jobs to the crew that can reach them most efficiently, balances workloads, and minimizes total fleet drive time — not just individual routes.",
      },
      {
        question: 'What if we already use a scheduling tool?',
        answer: "We integrate with whatever you use — ServiceTitan, Jobber, Housecall Pro, even Google Sheets. The routing system reads your job list from your existing tool and outputs optimized routes. You do not need to switch platforms.",
      },
      {
        question: 'How long does setup take?',
        answer: "Most routing systems are live in 1-2 weeks. We connect to your scheduling tool, configure your service area parameters, train the system on your job types and durations, and run test routes before going live.",
      },
      {
        question: "What's the investment?",
        answer: "Route optimization starts at $2,497 for a single-crew setup. Multi-crew systems with real-time re-routing run $4,997+. Flat fee, no monthly retainer. If you save even 30 minutes per crew per day, the fuel and labor savings pay for it within the first month.",
      },
    ],

    cta: {
      headline: 'Stop Burning Fuel on',
      headlineHighlight: 'Inefficient Routes',
      subheadline: 'Book a call and we will analyze your current routing to show you exactly how much time and money you are leaving on the table.',
    },

    schema: {
      serviceType: 'Route Optimization',
      description: 'AI-driven route optimization systems that minimize drive time, maximize job capacity, and reduce fuel costs for field service businesses.',
    },
  },

  // ─────────────────────────────────────────────
  // 8. INVENTORY AUTOMATION
  // ─────────────────────────────────────────────
  'inventory-automation': {
    slug: 'inventory-automation',
    name: 'Inventory Automation',
    shortName: 'Inventory',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    tagline: 'Daily inventory reports in your inbox — no logging in, no spreadsheets',

    meta: {
      title: 'Inventory Automation for Service Businesses | Brothers Automate',
      description: 'Automated daily inventory reports synced from your POS. Know what sold, what is low, and what needs reordering. Built for a pet store. Custom-built in 1-2 weeks.',
    },

    hero: {
      badge: 'Inventory Automation',
      headline: 'Your POS Tracks Sales.',
      headlineGradient: 'But Nobody Is Tracking Inventory.',
      subheadline: 'You know what sold yesterday because the register tells you. But what is running low? What needs reordering? What has been sitting on the shelf for 90 days? That information lives in a spreadsheet nobody updates or a POS report nobody pulls. We build systems that do it automatically.',
      stats: [
        { number: 'Daily', label: 'Auto Reports' },
        { number: '0', label: 'Manual Updates' },
        { number: '100%', label: 'Accuracy' },
        { number: 'AM', label: 'In Your Inbox' },
      ],
      trustSignal: 'Built for a pet store on Square. Works with any POS.',
    },

    problem: {
      headline: 'You Are Running Your Inventory on Guesswork',
      painPoints: [
        'You find out something is out of stock when a customer asks for it and you walk to the back to check. That is not inventory management — that is a guessing game.',
        'Pulling inventory data from your POS means logging in, navigating to reports, exporting a CSV, and trying to make sense of a spreadsheet. Nobody does that daily.',
        'Reorder decisions are based on gut feel, not data. You over-order some items and run out of others because there is no system tracking trends over time.',
        'Seasonal shifts catch you off guard. You did not notice that item was trending up until you were already out of stock for two weeks.',
      ],
      costOfInaction: 'A single stockout costs you the sale plus the customer trust. Overstock ties up cash in products sitting on shelves. Without daily visibility, both happen more often than you think.',
    },

    solution: {
      headline: 'What Happens When',
      headlineHighlight: 'Inventory Reports Show Up Every Morning',
      description: 'We build a system that connects to your POS (Square, Shopify, Clover, whatever you use), pulls sales and inventory data every night, and sends you a clean daily report by email. What sold, what is low, what needs reordering, and what trends are forming.',
      features: [
        {
          title: 'POS Data Sync',
          description: 'The system calls your POS API at the end of every day. It pulls all sales transactions, updates inventory counts, and calculates current stock levels. No manual counting. No CSV exports. The data is always current.',
          icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
        },
        {
          title: 'Daily Email Reports',
          description: 'Every morning you open your inbox and find a clear, organized report. Top sellers yesterday. Items below reorder threshold. Items with zero sales in 30+ days. No logging into dashboards. Just open your email.',
          icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
        },
        {
          title: 'Trend Analysis',
          description: 'The system stores historical data and spots patterns. "This item sold 40% more this week than last" or "This category always spikes in March." You see trends forming before they become problems or missed opportunities.',
          icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
        },
        {
          title: 'Low-Stock Alerts',
          description: 'Set reorder thresholds for any item or category. When stock drops below the line, you get an alert immediately — not at the end of the week when it is already out. You reorder before customers ever notice.',
          icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
        },
      ],
      conclusion: 'You start every day knowing exactly where your inventory stands. No logging in. No spreadsheets. No surprises. Just a clean report that tells you what to do.',
      callout: 'POS data syncs overnight. Report lands in your inbox by morning. You know what sold, what is low, and what to reorder before you unlock the door.',
    },

    relatedProjects: [
      { slug: 'automated-inventory', name: 'Automated Inventory', description: 'See how we built automated daily inventory reports for a pet store using Square POS — synced every night, delivered every morning.' },
    ],

    relatedIndustries: [
      { slug: 'ecommerce', name: 'E-commerce', blurb: 'Online stores need real-time stock visibility to avoid overselling and stockouts' },
    ],

    socialProof: {
      headline: 'Why Automated Inventory Tracking Matters',
      stats: [
        { number: 'Daily', label: 'Visibility', context: 'know your inventory position every single morning' },
        { number: '0', label: 'Manual Data Entry', context: 'the system handles every update automatically' },
        { number: '100%', label: 'Accuracy', context: 'synced directly from your POS — no human errors' },
      ],
    },

    faq: [
      {
        question: 'What POS systems do you support?',
        answer: "Square, Shopify, Clover, Lightspeed, Toast — if it has an API, we can connect to it. We built the first version for a Square-based pet store, but the system architecture works with any modern POS. If you use something else, just ask and we will let you know.",
      },
      {
        question: 'Can I customize what shows up in the daily report?',
        answer: "Absolutely. You tell us what matters — top sellers, low stock items, dead stock, category breakdowns, revenue by product line — and we configure the report to show exactly that. Some owners want a one-page summary. Others want the full breakdown. We build what works for you.",
      },
      {
        question: 'What if I have multiple locations?',
        answer: "The system handles it. Each location syncs independently, and you can get a combined report or per-location reports — or both. Multi-location businesses actually get the most value because tracking inventory across stores manually is nearly impossible.",
      },
      {
        question: 'How long does setup take?',
        answer: "Most inventory systems are live in 1-2 weeks. We connect to your POS API, configure the sync schedule, set up your report format and alert thresholds, and run a few days of test syncs before going live.",
      },
      {
        question: "What's the investment?",
        answer: "Inventory automation starts at $1,497 for a single-location setup with daily reports. Multi-location systems with trend analysis and custom alerts run $2,497-$3,497. Flat fee, no monthly retainer. If preventing one stockout per month saves you even $200 in lost sales, it pays for itself quickly.",
      },
    ],

    cta: {
      headline: 'Stop Guessing What Is',
      headlineHighlight: 'On Your Shelves',
      subheadline: 'Book a call and we will show you what automated daily inventory reports look like for your business.',
    },

    schema: {
      serviceType: 'Inventory Automation',
      description: 'Automated inventory tracking and reporting systems that sync with POS platforms and deliver daily reports, trend analysis, and low-stock alerts for retail and service businesses.',
    },
  },
};

// ─────────────────────────────────────────────
// Helper functions
// ─────────────────────────────────────────────

export function getAllServices(): ServiceData[] {
  return Object.values(services);
}

export function getServiceSlugs() {
  return Object.keys(services).map(key => ({
    params: { service: key },
  }));
}

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return services[slug];
}
