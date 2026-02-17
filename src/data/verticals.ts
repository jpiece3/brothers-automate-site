// Industry-specific vertical landing page content
// Add a new vertical = add a new object to the `verticals` record below

export interface VerticalStat {
  number: string;
  label: string;
}

export interface PainStat {
  number: string;
  unit: string;
  text: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string; // SVG path data
}

export interface ProofStat {
  number: string;
  label: string;
  context: string;
}

export interface Phase {
  number: number;
  title: string;
  days: string;
  tasks: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SystemPreviewItem {
  slug: string;
  name: string;
  description: string;
}

export interface VerticalData {
  slug: string;
  label: string;       // Display name: "Coaches & Consultants"
  shortLabel: string;   // Short: "Coaches"
  icon: string;         // SVG path data for hub/homepage grid
  tagline: string;      // One-liner for hub page

  meta: {
    title: string;
    description: string;
  };

  hero: {
    badge: string;
    headline: string;
    headlineGradient: string;
    subheadline: string;
    stats: VerticalStat[];
    trustSignal: string;
  };

  painPoints: {
    headline: string;
    stats: PainStat[];
    bottomStat: string;
    conclusion: string;
  };

  solution: {
    headline: string;
    headlineHighlight: string;
    features: Feature[];
    conclusion: string;
    callout: string;
  };

  systemsPreview: {
    headline: string;
    subheadline: string;
    systems: SystemPreviewItem[];
  };

  socialProof: {
    headline: string;
    stats: ProofStat[];
  };

  process: {
    phases: Phase[];
  };

  faq: FAQ[];

  cta: {
    headline: string;
    headlineHighlight: string;
    subheadline: string;
  };

  relatedTags: string[];

  schema: {
    serviceType: string;
    targetAudience: string;
  };
}

export const verticals: Record<string, VerticalData> = {

  // ─────────────────────────────────────────────
  // 1. COACHES & CONSULTANTS
  // ─────────────────────────────────────────────
  coaches: {
    slug: 'coaches',
    label: 'Coaches & Consultants',
    shortLabel: 'Coaches',
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    tagline: 'Stop trading time for discovery calls that go nowhere',

    meta: {
      title: 'AI Automation for Coaches & Consultants | Brothers Automate',
      description: 'AI systems that qualify your leads, generate ad creative, and research your market. Built for coaching businesses doing $1-5M. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'AI Automation for Coaches',
      headline: 'Your Coaching Changes Lives.',
      headlineGradient: 'Your Marketing Should Too.',
      subheadline: 'We build the AI systems that handle lead qualification, ad creative, and audience research for you. Every discovery call becomes a conversation with someone ready to invest.',
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '30-Day', label: 'Money-Back Guarantee' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
      ],
      trustSignal: 'Built for coaching businesses. Not a template.',
    },

    painPoints: {
      headline: "The Real Problem With Your Coaching Leads",
      stats: [
        {
          number: '30',
          unit: '% of time',
          text: "You became a coach to help people, not to spend a third of your week on Instagram captions and email funnels. Yet here you are, marketing instead of coaching."
        },
        {
          number: '5',
          unit: 'no-shows',
          text: "Five discovery calls booked this week. Two showed up. One wasn't ready. Without qualification, your calendar fills with people who aren't a fit."
        },
        {
          number: '0',
          unit: 'follow-ups',
          text: "That lead who downloaded your PDF last month? They never heard from you again. No nurture sequence. No check-in. They bought from someone who followed up."
        },
      ],
      bottomStat: 'The average coach spends 15+ hours per week on marketing activities. That\'s 15 hours not spent coaching, creating programs, or actually helping people.',
      conclusion: "You're an incredible coach. But between client sessions and content creation, those leads from last week are going cold. And the ones from last month? Gone.",
    },

    solution: {
      headline: "Here's What Changes",
      headlineHighlight: 'When AI Handles Your Busywork',
      features: [
        {
          title: 'Qualify Before the Call',
          description: "An interactive quiz scores leads on readiness and budget before they hit your calendar. Hot leads book immediately. Warm leads get nurtured. You stop wasting afternoons.",
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        },
        {
          title: 'Fresh Ads Without a Designer',
          description: "Our ad engine generates on-brand creative daily across 15+ formats. No $5K/month agency. No stale images running for 6 months. Just fresh creative that keeps your cost per lead down.",
          icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        },
        {
          title: 'Know Your Market Cold',
          description: "AI-powered brand research gives you competitor analysis, audience profiling, and positioning strategy in 48 hours. Not 4 weeks. Not $10K. Real data you can act on.",
          icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        },
      ],
      conclusion: 'These systems work together or independently. Lead qualification feeds your calendar. Ad creative fills the top of funnel. Brand research tells you what to say and to whom.',
      callout: 'Your systems work 24/7. Leads get qualified, ads stay fresh, and you focus on coaching.',
    },

    systemsPreview: {
      headline: 'Systems We Build for Coaches',
      subheadline: "These are the specific AI systems we build for coaching businesses. Each one solves a different bottleneck.",
      systems: [
        { slug: 'quiz-funnels', name: 'Quiz Funnels', description: 'Qualify leads automatically with interactive quizzes that score readiness, then route hot leads to your calendar and nurture the rest.' },
        { slug: 'brand-research', name: 'Brand Research', description: 'AI-powered audience analysis, competitor intel, and positioning strategy delivered in 48 hours.' },
        { slug: 'daily-ads', name: 'Daily Ads', description: 'Fresh, on-brand ad creative generated daily across 15+ formats. No designer needed.' },
      ],
    },

    socialProof: {
      headline: 'Why AI Automation Works for Coaches',
      stats: [
        { number: '15+', label: 'Hours Saved Weekly', context: 'on lead follow-up and marketing tasks' },
        { number: '80%', label: 'Lower Ad Creative Cost', context: 'compared to hiring a designer or agency' },
        { number: '48hr', label: 'Brand Research Delivery', context: 'vs. 4-6 weeks from a traditional agency' },
      ],
    },

    process: {
      phases: [
        {
          number: 1,
          title: 'Discovery & Scoping',
          days: 'Days 1-3',
          tasks: [
            'Analyze your coaching methodology and ideal client profile',
            'Identify which systems will have the biggest impact on your business',
            'Map the client journey from first touch to booked call',
            'Extract your brand voice and communication style',
          ],
        },
        {
          number: 2,
          title: 'Strategy & Design',
          days: 'Days 4-7',
          tasks: [
            'Architect the system logic, scoring models, and automation flows',
            'Design the user experience and integration points',
            'Plan how each system connects to your existing tools',
          ],
        },
        {
          number: 3,
          title: 'Build & Test',
          days: 'Days 8-14',
          tasks: [
            'Build and configure each system on your accounts',
            'Write all copy, set up automations, and connect integrations',
            'Test everything end-to-end before going live',
          ],
        },
        {
          number: 4,
          title: 'Launch & Handoff',
          days: 'Days 15-21',
          tasks: [
            'Deploy the system on your domain',
            'Walk you through everything on a recorded call',
            'Deliver full documentation so your team can manage it',
          ],
        },
      ],
    },

    faq: [
      {
        question: 'Will this work for my type of coaching?',
        answer: "Life coaching, business coaching, health coaching, executive coaching. If you have a coaching offer and an audience, these systems work. We customize every element to your methodology and ideal client.",
      },
      {
        question: 'Which system should I start with?',
        answer: "It depends on your biggest bottleneck. If your calendar is full of unqualified calls, start with a quiz funnel. If your ads are stale and expensive, start with Daily Ads. If you're not sure how to position yourself, start with Brand Research. We'll figure it out on our call.",
      },
      {
        question: 'How long does it take?',
        answer: "A single system (like a quiz funnel or ad engine) takes 1-2 weeks. A multi-system build takes 2-4 weeks. We scope everything on our first call so there are no surprises.",
      },
      {
        question: "What's the investment?",
        answer: "Quick Fix projects start at $1,497 for a single automation. Custom Builds run $3,497-$4,997 for end-to-end systems. Full System builds start at $7,997+ for multi-stage pipelines. Every project is flat-fee, no monthly retainer.",
      },
      {
        question: 'Do I need to be technical?',
        answer: "No. We build everything, deploy it on your accounts, and hand you plain-English documentation. If something breaks, we fix it during your support window.",
      },
    ],

    cta: {
      headline: 'Stop Losing Clients to',
      headlineHighlight: 'Slow Follow-Up',
      subheadline: 'Book a call to see which AI systems will save you the most time and money.',
    },

    relatedTags: ['coaches', 'coaching', 'lead generation', 'AI automation'],

    schema: {
      serviceType: 'AI Automation for Coaching Businesses',
      targetAudience: 'Life coaches, business coaches, executive coaches, health coaches, career coaches',
    },
  },

  // ─────────────────────────────────────────────
  // 2. FINANCIAL ADVISORS
  // ─────────────────────────────────────────────
  'financial-advisors': {
    slug: 'financial-advisors',
    label: 'Financial Advisors',
    shortLabel: 'Financial Advisors',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    tagline: 'Compliance-friendly lead generation that scales beyond referrals',

    meta: {
      title: 'AI Automation for Financial Advisors | Brothers Automate',
      description: 'AI systems that generate qualified prospects, manage your online reputation, and research your competitive landscape. Built for advisory firms doing $1-5M. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'AI Automation for Financial Advisors',
      headline: 'Your Advice Changes Retirements.',
      headlineGradient: 'Your Pipeline Should Reflect That.',
      subheadline: "Referrals are great until they dry up. We build AI systems that attract qualified prospects, respond to every Google review, and give you real data on your competitive position.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '100%', label: 'Compliance-Friendly' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
      ],
      trustSignal: 'Built for advisory firms. Not a template.',
    },

    painPoints: {
      headline: "The Real Problem With Your Prospect Pipeline",
      stats: [
        {
          number: '$4K',
          unit: 'per client',
          text: "Seminar dinners, golf outings, community events. The average advisor spends $3,000-5,000 to acquire a single client. Most of those prospects never convert."
        },
        {
          number: '80',
          unit: '% referral',
          text: "Your book is built on referrals. That works until it doesn't. One slow quarter and your pipeline is empty with no system to fill it."
        },
        {
          number: '300K',
          unit: 'advisors',
          text: "There are 300,000+ financial advisors in the US. Your prospect can't tell the difference between you and the next one. Same pitch, same brochure, same result."
        },
      ],
      bottomStat: "70% of affluent investors change advisors at least once. The question isn't whether prospects are looking. It's whether they find you first.",
      conclusion: "You're a great advisor. But between client reviews, compliance updates, and market research, building a scalable prospecting system keeps falling to the bottom of the list.",
    },

    solution: {
      headline: "Here's What Changes",
      headlineHighlight: 'When AI Works Behind the Scenes',
      features: [
        {
          title: 'Attract Without Cold Calling',
          description: "A lead qualification quiz draws prospects in by offering value first. They engage because they want answers about their retirement readiness, not because you interrupted their dinner.",
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
        },
        {
          title: 'Respond to Every Review',
          description: "Our review response system monitors your Google profile and replies to every review within minutes. Personalized, on-brand, and compliance-appropriate. You never miss one.",
          icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
        },
        {
          title: 'Know Your Competitive Position',
          description: "AI-powered brand research gives you competitor analysis, prospect profiling, and positioning strategy in 48 hours. Know exactly where you stand and how to differentiate.",
          icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        },
      ],
      conclusion: "These systems fill different gaps. Lead qualification builds your pipeline. Review management protects your reputation. Brand research sharpens your messaging.",
      callout: 'Every lead scored. Every review answered. Every competitor analyzed. You focus on advising.',
    },

    systemsPreview: {
      headline: 'Systems We Build for Advisors',
      subheadline: "These are the specific AI systems we build for financial advisory firms. Each one solves a different bottleneck.",
      systems: [
        { slug: 'quiz-funnels', name: 'Quiz Funnels', description: 'Qualify prospects automatically with a financial readiness quiz that scores urgency and routes hot leads to your calendar.' },
        { slug: 'brand-research', name: 'Brand Research', description: 'AI-powered competitor analysis, prospect profiling, and positioning strategy for your advisory firm.' },
        { slug: 'google-review-response', name: 'Review Response', description: 'Automated, on-brand replies to every Google review within minutes. Compliance-friendly and personalized.' },
      ],
    },

    socialProof: {
      headline: 'Why AI Automation Works for Advisors',
      stats: [
        { number: '60%', label: 'Lower Cost Per Lead', context: 'compared to seminar marketing' },
        { number: '100%', label: 'Review Response Rate', context: 'every Google review answered automatically' },
        { number: '48hr', label: 'Competitive Research', context: 'vs. weeks from a traditional firm' },
      ],
    },

    process: {
      phases: [
        {
          number: 1,
          title: 'Discovery & Scoping',
          days: 'Days 1-3',
          tasks: [
            'Analyze your advisory firm, ideal client profile, and AUM targets',
            'Identify which systems will have the biggest impact',
            'Map the prospect journey from awareness to first meeting',
            'Extract your brand voice and unique planning approach',
          ],
        },
        {
          number: 2,
          title: 'Strategy & Design',
          days: 'Days 4-7',
          tasks: [
            'Architect system logic, scoring models, and automation flows',
            'Design compliance-appropriate messaging and review response templates',
            'Plan integration points with your existing CRM and tools',
          ],
        },
        {
          number: 3,
          title: 'Build & Test',
          days: 'Days 8-14',
          tasks: [
            'Build and configure each system on your accounts',
            'Write all copy with compliance-appropriate language',
            'Test everything end-to-end before going live',
          ],
        },
        {
          number: 4,
          title: 'Launch & Handoff',
          days: 'Days 15-21',
          tasks: [
            'Deploy systems on your domain and accounts',
            'Walk you through everything on a recorded call',
            'Deliver full documentation for your team and compliance review',
          ],
        },
      ],
    },

    faq: [
      {
        question: 'Is this compliant with financial regulations?',
        answer: "The systems we build don't provide financial advice. They assess readiness, manage reviews, and research your market. All copy is informational, not advisory. We recommend your compliance team review before launch, and we'll make any adjustments needed.",
      },
      {
        question: 'Will this work for my specific advisory niche?',
        answer: "Retirement planning, wealth management, tax planning, estate planning. If you have an advisory practice and prospects to attract, these systems work. We customize everything to your specific expertise and ideal client.",
      },
      {
        question: 'How long does it take?',
        answer: "A single system takes 1-2 weeks. A multi-system build takes 2-4 weeks. We scope everything on our first call so there are no surprises.",
      },
      {
        question: "What's the investment?",
        answer: "Quick Fix projects start at $1,497. Custom Builds run $3,497-$4,997. Full System builds start at $7,997+. Every project is flat-fee with no monthly retainer. That's roughly what you'd spend on one seminar dinner, except these systems work for you permanently.",
      },
    ],

    cta: {
      headline: 'Stop Relying on Referrals to',
      headlineHighlight: 'Fill Your Pipeline',
      subheadline: 'Book a call to see which AI systems will attract more qualified prospects to your advisory firm.',
    },

    relatedTags: ['financial advisors', 'lead generation', 'AI automation'],

    schema: {
      serviceType: 'AI Automation for Financial Advisory Firms',
      targetAudience: 'Financial advisors, wealth managers, financial planners, RIAs, insurance advisors',
    },
  },

  // ─────────────────────────────────────────────
  // 3. REAL ESTATE
  // ─────────────────────────────────────────────
  'real-estate': {
    slug: 'real-estate',
    label: 'Real Estate Agents & Teams',
    shortLabel: 'Real Estate',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    tagline: 'Turn expensive ad spend into qualified buyer and seller appointments',

    meta: {
      title: 'AI Automation for Real Estate Agents | Brothers Automate',
      description: 'AI systems that qualify buyer and seller leads, generate fresh ad creative daily, and respond to every Google review. Built for real estate teams doing $1-5M. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'AI Automation for Real Estate',
      headline: 'Every Lead Costs You Money.',
      headlineGradient: 'Make Sure They\'re Worth It.',
      subheadline: "Zillow leads cost $50-200 each and close at 1-2%. We build AI systems that qualify prospects before you spend time on them, keep your ads fresh, and respond to every review on your Google profile.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '30-Day', label: 'Money-Back Guarantee' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
      ],
      trustSignal: 'Built for real estate. Not a Zillow alternative.',
    },

    painPoints: {
      headline: "The Real Problem With Your Real Estate Leads",
      stats: [
        {
          number: '$200',
          unit: 'per lead',
          text: "You're paying $50-200 per Zillow lead. Most of them are tire-kickers who ghost after the first call. Your cost-per-closed-deal? Don't even do that math."
        },
        {
          number: '1.5',
          unit: '% close rate',
          text: "The industry average for online leads is 1-2%. That means for every 100 leads you buy, you might close 1 or 2. The other 98 wasted your time."
        },
        {
          number: '12',
          unit: 'weekends',
          text: "Open houses, showings, first-time consultations with people who aren't serious or aren't qualified. That's 12 weekends per quarter you could get back."
        },
      ],
      bottomStat: "87% of real estate agents fail within their first 5 years. The ones who survive aren't better agents. They have better lead qualification systems.",
      conclusion: "You're great at closing deals. The problem is getting in front of people who are actually ready to buy or sell.",
    },

    solution: {
      headline: "Here's What Changes",
      headlineHighlight: 'When AI Handles Your Pipeline',
      features: [
        {
          title: 'Qualify Buyers and Sellers',
          description: "A quiz asks about timeline, budget, and urgency before they ever contact you. Hot leads see your calendar. Warm leads get market updates. You stop wasting time on tire-kickers.",
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        },
        {
          title: 'Fresh Ads Every Day',
          description: "Our ad engine generates on-brand listing creative and market updates daily. No more running the same 3 images for 6 months. Your cost per lead drops because creative fatigue stops.",
          icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        },
        {
          title: 'Every Review Gets a Reply',
          description: "Our review response system monitors your Google profile and replies to every review within minutes. Personalized, professional, and on-brand. Google rewards businesses that actively respond.",
          icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
        },
      ],
      conclusion: "The best agents don't chase leads. They build systems that attract qualified prospects, keep their marketing fresh, and protect their online reputation automatically.",
      callout: 'Your systems work 24/7. Prospects qualify themselves, ads stay fresh, and every review gets answered while you close deals.',
    },

    systemsPreview: {
      headline: 'Systems We Build for Real Estate',
      subheadline: "These are the specific AI systems we build for real estate teams. Each one solves a different bottleneck.",
      systems: [
        { slug: 'quiz-funnels', name: 'Quiz Funnels', description: 'Qualify buyer and seller leads automatically with quizzes that reveal timeline, budget, and urgency before you spend a minute on them.' },
        { slug: 'daily-ads', name: 'Daily Ads', description: 'Fresh listing creative and market update ads generated daily across 15+ formats. No designer, no stale images.' },
        { slug: 'google-review-response', name: 'Review Response', description: 'Automated, on-brand replies to every Google review within minutes. Build trust and boost your local SEO.' },
      ],
    },

    socialProof: {
      headline: 'Why AI Automation Works for Real Estate',
      stats: [
        { number: '3-5x', label: 'Better Lead Quality', context: 'when prospects self-qualify before contact' },
        { number: '80%', label: 'Lower Creative Cost', context: 'vs. hiring a designer or agency' },
        { number: '100%', label: 'Review Response Rate', context: 'every Google review answered automatically' },
      ],
    },

    process: {
      phases: [
        {
          number: 1,
          title: 'Discovery & Scoping',
          days: 'Days 1-3',
          tasks: [
            'Analyze your market area, specializations, and ideal client types',
            'Identify which systems will have the biggest impact',
            'Map the buyer/seller journey from awareness to appointment',
            'Extract your brand voice and unique selling proposition',
          ],
        },
        {
          number: 2,
          title: 'Strategy & Design',
          days: 'Days 4-7',
          tasks: [
            'Architect system logic for lead scoring and ad generation',
            'Design review response templates matched to your voice',
            'Plan integration points with your CRM and existing tools',
          ],
        },
        {
          number: 3,
          title: 'Build & Test',
          days: 'Days 8-14',
          tasks: [
            'Build and configure each system on your accounts',
            'Write all copy and set up automations',
            'Test everything end-to-end before going live',
          ],
        },
        {
          number: 4,
          title: 'Launch & Handoff',
          days: 'Days 15-21',
          tasks: [
            'Deploy systems on your domain and accounts',
            'Walk you through everything on a recorded call',
            'Deliver full documentation for your team',
          ],
        },
      ],
    },

    faq: [
      {
        question: 'Will this work for both buyers and sellers?',
        answer: "Yes. We can build buyer-focused quizzes, seller-focused quizzes, or combined funnels that route based on whether someone is buying or selling. The ad engine and review system work regardless of your focus.",
      },
      {
        question: 'How is this different from Zillow leads?',
        answer: "Zillow sells the same lead to multiple agents. Your systems generate exclusive leads who chose to engage with you. They've answered questions about their needs, so you already know their situation before the first call.",
      },
      {
        question: 'How long does it take?',
        answer: "A single system takes 1-2 weeks. A multi-system build takes 2-4 weeks. We scope everything on our first call so you know exactly what to expect.",
      },
      {
        question: "What's the investment?",
        answer: "Quick Fix projects start at $1,497. Custom Builds run $3,497-$4,997. Full System builds start at $7,997+. Every project is flat-fee, no monthly retainer. That's less than you'd spend on 20 Zillow leads, and these systems generate qualified leads permanently.",
      },
    ],

    cta: {
      headline: 'Stop Paying for Leads That',
      headlineHighlight: 'Never Close',
      subheadline: 'Book a call to see which AI systems will fill your pipeline with qualified buyers and sellers.',
    },

    relatedTags: ['real estate', 'lead generation', 'AI automation'],

    schema: {
      serviceType: 'AI Automation for Real Estate Agents',
      targetAudience: 'Real estate agents, real estate teams, realtors, brokers',
    },
  },

  // ─────────────────────────────────────────────
  // 4. HOME SERVICES / CONTRACTORS
  // ─────────────────────────────────────────────
  'home-services': {
    slug: 'home-services',
    label: 'Home Services & Contractors',
    shortLabel: 'Home Services',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    tagline: 'Filter out price shoppers and fill your calendar with real projects',

    meta: {
      title: 'AI Automation for Contractors & Home Services | Brothers Automate',
      description: 'AI systems that qualify homeowner projects, optimize your daily routes, and respond to every Google review. Built for contractors doing $1-5M. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'AI Automation for Home Services',
      headline: 'Your Craftsmanship Speaks for Itself.',
      headlineGradient: 'Your Leads Should Be Just as Solid.',
      subheadline: "You're great at what you build. But half your estimates go to homeowners who just want a number to compare. We build AI systems that filter out price shoppers, optimize your routes, and protect your online reputation.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '30-Day', label: 'Money-Back Guarantee' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
      ],
      trustSignal: 'Built for contractors and home service pros. Not a template.',
    },

    painPoints: {
      headline: "The Real Problem With Your Project Pipeline",
      stats: [
        {
          number: '40',
          unit: '% waste',
          text: "Nearly half the estimates you write will never convert. The homeowner was price shopping, wasn't ready, or just wanted a ballpark. That's hours of your estimator's time gone."
        },
        {
          number: '3',
          unit: 'competitors',
          text: "Every homeowner gets 3 quotes. They can't tell the difference between you and the low-baller. Without pre-qualification, you're just another number on their spreadsheet."
        },
        {
          number: '2-3',
          unit: 'hrs driving',
          text: "You're losing 2-3 hours every day to inefficient routes. That's jobs you could be running, money you could be making. The windshield time adds up fast."
        },
      ],
      bottomStat: "The average contractor spends 15-20 hours per week on estimates, consultations, and follow-ups. More than half of that time is spent on leads that never convert.",
      conclusion: "You're a skilled tradesperson. But you shouldn't have to waste your best hours driving to estimates for homeowners who aren't serious about starting.",
    },

    solution: {
      headline: "Here's What Changes",
      headlineHighlight: 'When AI Handles the Busywork',
      features: [
        {
          title: 'Filter Before the Estimate',
          description: "A project qualification quiz reveals budget, timeline, and scope before you drive to their house. Serious homeowners see your calendar. Price shoppers get educational content about project costs.",
          icon: 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z',
        },
        {
          title: 'Optimize Your Routes',
          description: "Our routing system takes your daily jobs and plans the most efficient sequence. Less windshield time, more billable hours. Fit 2+ extra jobs per week just by driving smarter.",
          icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
        },
        {
          title: 'Every Review Gets a Reply',
          description: "Our review response system monitors your Google profile and replies to every review within minutes. Homeowners check reviews before calling. A 100% response rate builds the trust that wins you jobs.",
          icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
        },
      ],
      conclusion: "The best contractors don't compete on price. They build systems that attract homeowners who value quality, filter out price shoppers, and stay first-in-mind through great reviews.",
      callout: 'Your systems work 24/7. Homeowners qualify themselves, routes get optimized, and every review gets answered while you\'re on the job site.',
    },

    systemsPreview: {
      headline: 'Systems We Build for Contractors',
      subheadline: "These are the specific AI systems we build for home service businesses. Each one solves a different bottleneck.",
      systems: [
        { slug: 'quiz-funnels', name: 'Quiz Funnels', description: 'Qualify homeowner projects by budget, timeline, and scope before you ever write an estimate or drive to their house.' },
        { slug: 'route-simply', name: 'Route Simply', description: 'AI-optimized daily routing that cuts drive time by 30% and fits 2+ extra jobs per week into your schedule.' },
        { slug: 'google-review-response', name: 'Review Response', description: 'Automated, on-brand replies to every Google review within minutes. Build the reputation that wins you jobs.' },
      ],
    },

    socialProof: {
      headline: 'Why AI Automation Works for Contractors',
      stats: [
        { number: '40%', label: 'Fewer Wasted Estimates', context: 'when leads pre-qualify before consultation' },
        { number: '30%', label: 'Less Drive Time', context: 'with AI-optimized daily routing' },
        { number: '100%', label: 'Review Response Rate', context: 'every Google review answered automatically' },
      ],
    },

    process: {
      phases: [
        {
          number: 1,
          title: 'Discovery & Scoping',
          days: 'Days 1-3',
          tasks: [
            'Analyze your service area, specializations, and ideal project types',
            'Identify which systems will have the biggest impact',
            'Map the homeowner journey from research to project start',
            'Extract your brand voice and project portfolio highlights',
          ],
        },
        {
          number: 2,
          title: 'Strategy & Design',
          days: 'Days 4-7',
          tasks: [
            'Architect lead qualification logic and routing optimization',
            'Design review response templates matched to your voice',
            'Plan integration points with your existing scheduling tools',
          ],
        },
        {
          number: 3,
          title: 'Build & Test',
          days: 'Days 8-14',
          tasks: [
            'Build and configure each system on your accounts',
            'Write all copy and set up automations',
            'Test everything end-to-end before going live',
          ],
        },
        {
          number: 4,
          title: 'Launch & Handoff',
          days: 'Days 15-21',
          tasks: [
            'Deploy systems on your domain and accounts',
            'Walk you through everything on a recorded call',
            'Deliver full documentation for your team',
          ],
        },
      ],
    },

    faq: [
      {
        question: 'Will this work for my type of contracting?',
        answer: "Remodeling, roofing, HVAC, plumbing, electrical, landscaping, painting. If homeowners search for your services online, these systems work. We customize every element to your trade and service area.",
      },
      {
        question: 'How does this help with price shoppers?',
        answer: "The qualification quiz asks about budget range, timeline, and project scope before they contact you. Leads who select 'just getting a ballpark' get educational content. Leads with real budgets and timelines get your calendar. You stop wasting afternoons on unqualified estimates.",
      },
      {
        question: 'How long does it take?',
        answer: "A single system takes 1-2 weeks. A multi-system build takes 2-4 weeks. We scope everything on our first call so you know the exact timeline.",
      },
      {
        question: "What's the investment?",
        answer: "Quick Fix projects start at $1,497. Custom Builds run $3,497-$4,997. Full System builds start at $7,997+. Every project is flat-fee, no monthly retainer. That's less than the revenue from one mid-size project, and these systems generate qualified leads permanently.",
      },
    ],

    cta: {
      headline: 'Stop Writing Estimates for',
      headlineHighlight: 'Price Shoppers',
      subheadline: 'Book a call to see which AI systems will save you the most time and money.',
    },

    relatedTags: ['contractors', 'home services', 'lead generation', 'AI automation'],

    schema: {
      serviceType: 'AI Automation for Contractors and Home Service Businesses',
      targetAudience: 'General contractors, remodelers, roofers, HVAC companies, plumbers, electricians, landscapers',
    },
  },

  // ─────────────────────────────────────────────
  // 5. E-COMMERCE / DTC
  // ─────────────────────────────────────────────
  ecommerce: {
    slug: 'ecommerce',
    label: 'E-commerce & DTC Brands',
    shortLabel: 'E-commerce',
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    tagline: 'Turn browsers into buyers with personalized product recommendations',

    meta: {
      title: 'AI Automation for E-commerce & DTC Brands | Brothers Automate',
      description: 'AI systems that recommend products, generate fresh ad creative daily, and research your competitive landscape. Built for e-commerce brands doing $1-5M. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'AI Automation for E-commerce',
      headline: 'Your Products Are Great.',
      headlineGradient: 'Help People Find the Right One.',
      subheadline: "Most shoppers leave your site because they can't decide. We build AI systems that guide them to the right product, keep your ad creative fresh, and give you real data on your competitive position.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '20-30%', label: 'AOV Increase' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
      ],
      trustSignal: 'Built for product brands. Not a generic quiz tool.',
    },

    painPoints: {
      headline: "The Real Problem With Your Online Store",
      stats: [
        {
          number: '2.5',
          unit: '% convert',
          text: "The average e-commerce conversion rate is 2.5%. That means 97 out of 100 visitors leave without buying. Most of them liked your products. They just couldn't decide."
        },
        {
          number: '$50',
          unit: 'CAC rising',
          text: "Meta and Google ads keep getting more expensive. Your cost per acquisition creeps up every quarter. You need a way to convert more of the traffic you're already paying for."
        },
        {
          number: '70',
          unit: '% abandon',
          text: "70% of shopping carts get abandoned. Shoppers browse, add items, then leave. Without their email, you can't bring them back. That revenue just disappears."
        },
      ],
      bottomStat: "Personalized shopping experiences convert 3x higher than generic ones. But most stores treat every visitor the same way: same homepage, same collection page, same products.",
      conclusion: "Your products are excellent. But when a shopper lands on your site and sees 50 options, they freeze. A recommendation quiz cuts through the noise and guides them to the right product.",
    },

    solution: {
      headline: "Here's What Changes",
      headlineHighlight: 'When AI Powers Your Store',
      features: [
        {
          title: 'Recommend the Right Product',
          description: "A product quiz asks about preferences, needs, and budget, then recommends the exact products they'll love. No more browsing paralysis. Shoppers buy with confidence.",
          icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
        },
        {
          title: 'Fresh Ads Every Day',
          description: "Our ad engine generates on-brand product creative daily across 15+ formats. No $5K/month designer. No stale images running for months. Your cost per acquisition drops because creative fatigue stops.",
          icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        },
        {
          title: 'Know Your Competitive Position',
          description: "AI-powered brand research gives you competitor pricing analysis, audience profiling, and positioning strategy in 48 hours. Know exactly where you stand and how to differentiate.",
          icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        },
      ],
      conclusion: "Product quizzes capture emails and guide purchase decisions. Fresh ads keep your campaigns performing. Brand research tells you where to focus. Together, they turn more traffic into revenue.",
      callout: 'Your systems work like an always-on sales team. Recommending products, generating creative, and tracking competitors while you run the business.',
    },

    systemsPreview: {
      headline: 'Systems We Build for E-commerce',
      subheadline: "These are the specific AI systems we build for e-commerce brands. Each one solves a different bottleneck.",
      systems: [
        { slug: 'quiz-funnels', name: 'Quiz Funnels', description: 'Product recommendation quizzes that guide shoppers to the right product, capture emails, and increase AOV by 20-30%.' },
        { slug: 'daily-ads', name: 'Daily Ads', description: 'Fresh, on-brand product creative generated daily across 15+ formats. Stop paying designers $5K/month for ads that go stale.' },
        { slug: 'brand-research', name: 'Brand Research', description: 'AI-powered competitor analysis, audience profiling, and positioning strategy for your e-commerce brand.' },
      ],
    },

    socialProof: {
      headline: 'Why AI Automation Works for E-commerce',
      stats: [
        { number: '20-30%', label: 'AOV Increase', context: 'from personalized product recommendations' },
        { number: '80%', label: 'Lower Creative Cost', context: 'vs. hiring a designer or agency' },
        { number: '3x', label: 'Higher Conversion', context: 'guided shopping vs. browse and hope' },
      ],
    },

    process: {
      phases: [
        {
          number: 1,
          title: 'Discovery & Scoping',
          days: 'Days 1-3',
          tasks: [
            'Analyze your product catalog, best sellers, and customer segments',
            'Identify which systems will have the biggest impact on revenue',
            'Map the customer journey from browse to purchase to repeat buy',
            'Extract your brand voice and visual identity',
          ],
        },
        {
          number: 2,
          title: 'Strategy & Design',
          days: 'Days 4-7',
          tasks: [
            'Architect product recommendation logic and ad generation rules',
            'Design quiz flow that matches shoppers to the right products',
            'Plan integration points with your Shopify/WooCommerce store',
          ],
        },
        {
          number: 3,
          title: 'Build & Test',
          days: 'Days 8-14',
          tasks: [
            'Build and configure each system on your accounts',
            'Write all copy and set up product matching logic',
            'Test everything end-to-end before going live',
          ],
        },
        {
          number: 4,
          title: 'Launch & Handoff',
          days: 'Days 15-21',
          tasks: [
            'Deploy systems on your domain or Shopify store',
            'Walk you through everything on a recorded call',
            'Deliver full documentation for your team',
          ],
        },
      ],
    },

    faq: [
      {
        question: 'Will this work with my Shopify/WooCommerce store?',
        answer: "Yes. The quiz deploys as a standalone page that links directly to your product pages. It works with Shopify, WooCommerce, BigCommerce, and any e-commerce platform. Product links go straight to your checkout.",
      },
      {
        question: 'Will this really increase my AOV?',
        answer: "Data shows 20-30% AOV increases from personalized recommendations. When a quiz says 'Based on your answers, we recommend these three products,' shoppers trust it and buy the bundle instead of just one item.",
      },
      {
        question: 'How long does it take?',
        answer: "A single system takes 1-2 weeks. A multi-system build takes 2-4 weeks. We scope everything on our first call so you know the exact timeline and cost.",
      },
      {
        question: "What's the investment?",
        answer: "Quick Fix projects start at $1,497. Custom Builds run $3,497-$4,997. Full System builds start at $7,997+. Every project is flat-fee, no monthly retainer. If your store does $10K/month and the quiz increases conversion by even 10%, it pays for itself in the first month.",
      },
    ],

    cta: {
      headline: 'Stop Losing Shoppers to',
      headlineHighlight: 'Choice Paralysis',
      subheadline: 'Book a call to see which AI systems will boost your conversion rate and AOV.',
    },

    relatedTags: ['ecommerce', 'e-commerce', 'product quiz', 'AI automation'],

    schema: {
      serviceType: 'AI Automation for E-commerce Brands',
      targetAudience: 'E-commerce brands, DTC brands, Shopify stores, online retailers',
    },
  },
};

// Helper to get all verticals as an array
export function getAllVerticals(): VerticalData[] {
  return Object.values(verticals);
}

// Helper for getStaticPaths
export function getVerticalSlugs(): { params: { vertical: string } }[] {
  return Object.keys(verticals).map(slug => ({ params: { vertical: slug } }));
}
