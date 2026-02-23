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

  // ─────────────────────────────────────────────
  // 6. DENTAL PRACTICES
  // ─────────────────────────────────────────────
  dental: {
    slug: 'dental',
    label: 'Dental Practices',
    shortLabel: 'Dental',
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    tagline: 'Fill your schedule with qualified new patients while you sleep',

    meta: {
      title: 'AI Automation for Dental Practices | Brothers Automate',
      description: 'AI systems that capture new patient inquiries 24/7, automate recall campaigns, and manage your online reviews. Built for dental practices doing $1-5M. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'AI Automation for Dental Practices',
      headline: 'Your Chair Time Is Valuable.',
      headlineGradient: "Stop Losing Patients to Missed Calls.",
      subheadline: "The average dental practice misses 30% of incoming calls. That's new patients choosing the office down the street. We build AI systems that capture every inquiry, automate your recall list, and keep your reviews pristine — so your front desk can focus on the patients in the chair.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '30%', label: 'Fewer Missed Calls' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Patient Capture' },
      ],
      trustSignal: 'Built for dental practices. Not a generic chatbot.',
    },

    painPoints: {
      headline: "Why Your Schedule Has Gaps",
      stats: [
        {
          number: '30',
          unit: '% calls missed',
          text: "Your front desk is busy with check-ins, insurance verification, and patient questions. When the phone rings and nobody picks up, that new patient calls the next practice on Google. You never even knew they called."
        },
        {
          number: '40',
          unit: '% skip recall',
          text: "Nearly half your patients don't come back for their 6-month cleaning without a reminder. Manual recall calls take hours. Most practices give up after one attempt and lose thousands in recurring revenue."
        },
        {
          number: '72',
          unit: '% check reviews',
          text: "72% of patients read online reviews before choosing a dentist. One unanswered negative review costs you an average of 30 potential patients. But responding to every review takes time your team doesn't have."
        },
      ],
      bottomStat: "A single missed new patient is worth $1,200+ in year-one revenue. Multiply that by 20-30 missed calls per month and you're leaving $25,000-$35,000 on the table every month.",
      conclusion: "Your clinical skills aren't the problem. The busywork around patient acquisition and retention is what's costing you.",
    },

    solution: {
      headline: "Here's What Changes",
      headlineHighlight: 'When AI Runs Your Front Office',
      features: [
        {
          title: 'Capture Every Patient Inquiry',
          description: "An AI system responds to new patient inquiries within 60 seconds — by text, web form, or after-hours call. It qualifies insurance, collects basic info, and books directly into your schedule. No more missed calls turning into missed patients.",
          icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
        },
        {
          title: 'Automated Recall Campaigns',
          description: "The system tracks every patient's last visit and sends personalized recall sequences — text, email, even voicemail drops. Patients who haven't been in 6 months get a gentle nudge. Those at 12 months get a stronger one. Your hygiene schedule stays full without your team lifting a finger.",
          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        },
        {
          title: 'Review Management on Autopilot',
          description: "Every happy patient gets a review request at the perfect moment. Negative reviews get a professional, personalized response within hours. Your Google rating climbs while you focus on dentistry, not reputation management.",
          icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
        },
      ],
      conclusion: "Your front desk goes from overwhelmed to organized. New patients get captured, existing patients come back, and your online reputation grows — all automatically.",
      callout: "Most dental practices see a full ROI within 60 days. The systems pay for themselves with just 2-3 new patients.",
    },

    systemsPreview: {
      headline: 'Systems Built for Dental Practices',
      subheadline: 'Real projects we build for practices like yours',
      systems: [
        { slug: 'quiz-funnels', name: 'New Patient Inquiry Quiz', description: 'Qualifies insurance, collects patient info, and books appointments — all before your front desk picks up the phone.' },
        { slug: 'brand-research', name: 'Competitor Analysis', description: "See exactly how nearby practices position themselves, what patients say about them, and where you can win." },
        { slug: 'daily-ads', name: 'Patient Acquisition Ads', description: 'Fresh ad creative generated daily for Google and Meta. No more running the same tired ads for months.' },
      ],
    },

    socialProof: {
      headline: 'What AI Automation Delivers for Dental Practices',
      stats: [
        { number: '85%', label: 'Inquiry Capture Rate', context: 'Up from ~60% with manual processes' },
        { number: '3x', label: 'Recall Response Rate', context: 'Automated sequences vs. manual calls' },
        { number: '4.8★', label: 'Average Google Rating', context: 'With consistent review management' },
      ],
    },

    process: {
      phases: [
        { number: 1, title: 'Discovery', days: 'Day 1-2', tasks: ['Audit your current patient acquisition flow', 'Map your recall and follow-up processes', 'Identify the biggest revenue leaks'] },
        { number: 2, title: 'Design', days: 'Day 3-5', tasks: ['Design your patient inquiry qualification flow', 'Build recall campaign sequences', 'Set up review monitoring and response templates'] },
        { number: 3, title: 'Build', days: 'Week 2', tasks: ['Build and integrate all AI systems', 'Connect to your practice management software', 'Test every workflow end-to-end'] },
        { number: 4, title: 'Launch', days: 'Week 2-3', tasks: ['Go live with real patient inquiries', 'Monitor and optimize response rates', 'Train your team on the dashboard'] },
      ],
    },

    faq: [
      {
        question: 'Does this integrate with my practice management software?',
        answer: "We integrate with Dentrix, Eaglesoft, Open Dental, and most major PMS platforms. If you use something else, we'll confirm compatibility on our first call.",
      },
      {
        question: 'Will patients know they\'re talking to AI?',
        answer: "The system is designed to feel like a knowledgeable front desk team member. It handles the initial qualification and booking, then your team takes over for anything clinical. Patients get fast, helpful responses — that's what matters.",
      },
      {
        question: 'How long does it take to set up?',
        answer: "A single system takes 1-2 weeks. A full front-office automation (inquiry capture + recall + reviews) takes 2-3 weeks. We scope everything on our first call.",
      },
      {
        question: "What's the investment?",
        answer: "Quick Fix projects start at $1,497. Custom Builds run $3,497-$4,997. Full System builds start at $7,997+. Every project is flat-fee, no monthly retainer. That's less than the revenue from two new patients, and these systems generate patients permanently.",
      },
    ],

    cta: {
      headline: 'Stop Losing New Patients to',
      headlineHighlight: 'Missed Calls',
      subheadline: 'Book a call to see which AI systems will fill your schedule and grow your practice.',
    },

    relatedTags: ['dental', 'dentist', 'dental practice', 'AI automation'],

    schema: {
      serviceType: 'AI Automation for Dental Practices',
      targetAudience: 'Dental practices, dentists, dental offices, orthodontists',
    },
  },

  // ─────────────────────────────────────────────
  // 7. LAW FIRMS
  // ─────────────────────────────────────────────
  legal: {
    slug: 'legal',
    label: 'Law Firms',
    shortLabel: 'Legal',
    icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3',
    tagline: 'Convert more consultations into retained clients automatically',

    meta: {
      title: 'AI Automation for Law Firms | Brothers Automate',
      description: 'AI systems that qualify potential clients 24/7, streamline intake paperwork, and track your competitive landscape. Built for law firms doing $1-5M. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'AI Automation for Law Firms',
      headline: 'Every Missed Inquiry Is a',
      headlineGradient: 'Case That Went Somewhere Else.',
      subheadline: "Potential clients contact 3-4 firms before choosing one. The firm that responds fastest and most professionally wins. We build AI systems that qualify leads instantly, automate your intake process, and give you intelligence on competing firms — so you win more cases without more admin hours.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '5min', label: 'Avg Response Time' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Client Intake' },
      ],
      trustSignal: 'Built for law firms. Not a generic lead form.',
    },

    painPoints: {
      headline: "Why You're Losing Cases Before They Start",
      stats: [
        {
          number: '78',
          unit: '% shop around',
          text: "78% of legal clients contact multiple firms. The first firm to respond with a professional, qualifying conversation wins the case 60% of the time. If your intake process takes 24-48 hours, you're already too late."
        },
        {
          number: '15',
          unit: 'hrs/week intake',
          text: "Your paralegals spend 15+ hours per week on intake paperwork, conflict checks, and document collection. That's billable time spent on admin. At $200/hour, that's $156,000/year in lost revenue."
        },
        {
          number: '40',
          unit: '% unqualified',
          text: "40% of initial consultations are with prospects who aren't a good fit — wrong practice area, unrealistic expectations, or no budget. Each wasted consultation costs you an hour of attorney time."
        },
      ],
      bottomStat: "The average law firm spends 30% of its time on non-billable administrative work. That's nearly a third of your capacity going to paperwork instead of practicing law.",
      conclusion: "You went to law school to practice law, not to chase paperwork and play phone tag with prospects.",
    },

    solution: {
      headline: "Here's What Changes",
      headlineHighlight: 'When AI Handles Your Intake',
      features: [
        {
          title: 'Qualify Clients Instantly',
          description: "An AI intake system asks the right questions — practice area, timeline, budget range, case details — and routes qualified prospects to your calendar. Unqualified inquiries get helpful resources instead of your time.",
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        },
        {
          title: 'Automate Document Collection',
          description: "New clients get a personalized onboarding flow that collects retainer agreements, case documents, and personal information before their first meeting. No more chasing signatures or missing paperwork.",
          icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
        },
        {
          title: 'Competitive Intelligence',
          description: "Know exactly what other firms in your market are doing — their positioning, their reviews, their ad spend. The system monitors your competitive landscape daily so you can position where competitors are weakest.",
          icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        },
      ],
      conclusion: "Your attorneys spend time on billable work. Your intake runs itself. And you know exactly where you stand against the competition.",
      callout: "One retained client typically covers the entire cost of the system. Everything after that is pure upside.",
    },

    systemsPreview: {
      headline: 'Systems Built for Law Firms',
      subheadline: 'Real projects we build for firms like yours',
      systems: [
        { slug: 'quiz-funnels', name: 'Case Qualification System', description: 'Qualifies prospects by practice area, timeline, and budget — then books qualified leads directly onto your calendar.' },
        { slug: 'signal-engine', name: 'Competitive Intelligence', description: "Track competing firms' positioning, reviews, and market moves. Know where to win before they do." },
        { slug: 'onboarding-workflow', name: 'Client Onboarding', description: 'Collect retainers, documents, and case info automatically. Clients arrive to their first meeting fully prepared.' },
      ],
    },

    socialProof: {
      headline: 'What AI Automation Delivers for Law Firms',
      stats: [
        { number: '60%', label: 'Faster Intake', context: 'From first contact to retained client' },
        { number: '15hrs', label: 'Saved Per Week', context: 'On intake and admin tasks' },
        { number: '35%', label: 'More Qualified Consults', context: 'By pre-screening before booking' },
      ],
    },

    process: {
      phases: [
        { number: 1, title: 'Discovery', days: 'Day 1-2', tasks: ['Audit your current intake and onboarding flow', 'Identify qualification criteria by practice area', 'Map your competitive landscape'] },
        { number: 2, title: 'Design', days: 'Day 3-5', tasks: ['Design the client qualification logic', 'Build document collection workflows', 'Set up competitive monitoring parameters'] },
        { number: 3, title: 'Build', days: 'Week 2', tasks: ['Build and integrate all AI systems', 'Connect to your case management software', 'Test every workflow with sample cases'] },
        { number: 4, title: 'Launch', days: 'Week 2-3', tasks: ['Go live with real prospect inquiries', 'Monitor qualification accuracy', 'Train your team on the dashboard'] },
      ],
    },

    faq: [
      {
        question: 'Is this compliant with attorney advertising rules?',
        answer: "Absolutely. We build qualification systems, not legal advice engines. The AI asks factual questions about the prospect's situation and routes them appropriately. All messaging is reviewed to comply with your state bar's advertising rules.",
      },
      {
        question: 'Does this work for my practice area?',
        answer: "Personal injury, family law, estate planning, business law, criminal defense, immigration — if clients find you online and need to be qualified, these systems work. We customize the intake flow to your specific practice areas.",
      },
      {
        question: 'How long does setup take?',
        answer: "A single system takes 1-2 weeks. A full intake automation (qualification + onboarding + competitive intel) takes 2-3 weeks. We scope everything on our first call.",
      },
      {
        question: "What's the investment?",
        answer: "Quick Fix projects start at $1,497. Custom Builds run $3,497-$4,997. Full System builds start at $7,997+. Every project is flat-fee, no monthly retainer. One retained client covers the cost of the entire system.",
      },
    ],

    cta: {
      headline: 'Stop Losing Cases to',
      headlineHighlight: 'Slow Intake',
      subheadline: 'Book a call to see which AI systems will help your firm win more clients with less admin.',
    },

    relatedTags: ['legal', 'law firm', 'attorney', 'AI automation'],

    schema: {
      serviceType: 'AI Automation for Law Firms',
      targetAudience: 'Law firms, attorneys, legal practices, solo practitioners',
    },
  },

  // ─────────────────────────────────────────────
  // 8. ACCOUNTING FIRMS
  // ─────────────────────────────────────────────
  accounting: {
    slug: 'accounting',
    label: 'Accounting Firms',
    shortLabel: 'Accounting',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    tagline: 'Automate client onboarding and document collection year-round',

    meta: {
      title: 'AI Automation for Accounting Firms | Brothers Automate',
      description: 'AI systems that automate client onboarding, collect documents without chasing, and screen seasonal hires. Built for accounting firms doing $1-5M. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'AI Automation for Accounting Firms',
      headline: 'Tax Season Shouldn\'t Mean',
      headlineGradient: '80-Hour Weeks.',
      subheadline: "Your firm drowns in the same cycle every year: chase documents, onboard new clients manually, scramble to hire seasonal staff. We build AI systems that collect documents automatically, onboard clients without your team touching a form, and screen candidates while you sleep.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '70%', label: 'Less Document Chasing' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
      ],
      trustSignal: 'Built for accounting firms. Not a generic workflow tool.',
    },

    painPoints: {
      headline: "The Annual Grind That's Burning You Out",
      stats: [
        {
          number: '23',
          unit: 'touches per client',
          text: "The average accounting firm contacts each client 23 times to collect all their tax documents. That's emails, calls, texts, and follow-ups — for every single client. Multiply that by your client list and you've got a full-time job that adds zero billable value."
        },
        {
          number: '6',
          unit: 'hrs onboarding',
          text: "New client onboarding takes 6+ hours of manual work per client — engagement letters, W-9s, prior year returns, entity documents. Most of it is copy-paste and follow-up. Your CPAs should be advising clients, not chasing paperwork."
        },
        {
          number: '45',
          unit: 'days to hire',
          text: "Finding qualified seasonal staff takes 45+ days on average. By the time you've screened resumes and run interviews, busy season is half over. The good candidates already took other offers."
        },
      ],
      bottomStat: "The average CPA firm spends 40% of busy season on administrative work that could be automated. That's hundreds of billable hours going to document chasing instead of client advisory.",
      conclusion: "You built your firm to advise clients, not to play email tag about missing K-1s.",
    },

    solution: {
      headline: "Here's What Changes",
      headlineHighlight: 'When AI Handles the Admin',
      features: [
        {
          title: 'Automated Document Collection',
          description: "The system sends personalized document requests to each client based on their entity type and prior year filing. Clients upload through a simple portal. The system tracks what's missing and sends reminders automatically. You stop chasing and start preparing.",
          icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12',
        },
        {
          title: 'Client Onboarding on Autopilot',
          description: "New clients get a seamless onboarding flow: engagement letter, document checklist, portal access, and prior year data requests — all sent and tracked automatically. Your team gets notified when everything is complete and ready for work.",
          icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z',
        },
        {
          title: 'Seasonal Hiring Pipeline',
          description: "Post once and let AI screen every application. The system scores candidates on relevant experience, availability, and software proficiency, then ranks them for your review. You interview the top 5 instead of reading 200 resumes.",
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        },
      ],
      conclusion: "Your team focuses on advisory work and client relationships. The admin runs itself — during busy season and beyond.",
      callout: "Firms that automate document collection report finishing busy season 2-3 weeks earlier. That's time back for your team and your family.",
    },

    systemsPreview: {
      headline: 'Systems Built for Accounting Firms',
      subheadline: 'Real projects we build for firms like yours',
      systems: [
        { slug: 'onboarding-workflow', name: 'Client Onboarding System', description: 'Engagement letters, document checklists, and portal setup — all automated from the moment a client signs.' },
        { slug: 'screenfast', name: 'Seasonal Hiring Pipeline', description: 'Screen and rank seasonal staff applications automatically. Interview the best, skip the rest.' },
        { slug: 'brand-research', name: 'Market Intelligence', description: 'See how competing firms position themselves, what clients say about them, and where you can differentiate.' },
      ],
    },

    socialProof: {
      headline: 'What AI Automation Delivers for Accounting Firms',
      stats: [
        { number: '70%', label: 'Less Document Chasing', context: 'Automated reminders vs. manual follow-up' },
        { number: '4hrs', label: 'Saved Per New Client', context: 'On onboarding and setup tasks' },
        { number: '3x', label: 'Faster Hiring', context: 'AI screening vs. manual resume review' },
      ],
    },

    process: {
      phases: [
        { number: 1, title: 'Discovery', days: 'Day 1-2', tasks: ['Audit your current onboarding and document collection flow', 'Map entity types and document requirements', 'Identify the biggest time drains'] },
        { number: 2, title: 'Design', days: 'Day 3-5', tasks: ['Design document request sequences by entity type', 'Build the client onboarding workflow', 'Create hiring screening criteria'] },
        { number: 3, title: 'Build', days: 'Week 2', tasks: ['Build and integrate all AI systems', 'Connect to your practice management software', 'Test with sample client scenarios'] },
        { number: 4, title: 'Launch', days: 'Week 2-3', tasks: ['Go live with new client onboarding', 'Activate document collection for existing clients', 'Train your team on the dashboard'] },
      ],
    },

    faq: [
      {
        question: 'Does this integrate with my practice management software?',
        answer: "We work with QuickBooks, Xero, CCH, Drake, Lacerte, and most major tax prep platforms. If you use something specific, we'll confirm compatibility on our first call.",
      },
      {
        question: 'Can this handle different entity types?',
        answer: "Absolutely. The system customizes document requests based on entity type — sole props get different checklists than S-corps or partnerships. Multi-entity clients get separate, organized requests for each entity.",
      },
      {
        question: 'How long does setup take?',
        answer: "A single system takes 1-2 weeks. A full automation suite (onboarding + document collection + hiring) takes 2-3 weeks. We recommend starting before busy season for maximum impact.",
      },
      {
        question: "What's the investment?",
        answer: "Quick Fix projects start at $1,497. Custom Builds run $3,497-$4,997. Full System builds start at $7,997+. Every project is flat-fee, no monthly retainer. That's less than one busy season hire, and these systems work year-round.",
      },
    ],

    cta: {
      headline: 'Stop Drowning in',
      headlineHighlight: 'Document Chasing',
      subheadline: 'Book a call to see which AI systems will give you and your team time back.',
    },

    relatedTags: ['accounting', 'CPA', 'tax preparation', 'AI automation'],

    schema: {
      serviceType: 'AI Automation for Accounting Firms',
      targetAudience: 'Accounting firms, CPAs, tax preparation firms, bookkeeping firms',
    },
  },

  // ─────────────────────────────────────────────
  // 9. HVAC COMPANIES
  // ─────────────────────────────────────────────
  hvac: {
    slug: 'hvac',
    label: 'HVAC Companies',
    shortLabel: 'HVAC',
    icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z',
    tagline: 'Capture emergency calls and optimize routes while you sleep',

    meta: {
      title: 'AI Automation for HVAC Companies | Brothers Automate',
      description: 'AI systems that capture service calls 24/7, optimize technician routes, and screen seasonal hires automatically. Built for HVAC companies doing $1-5M. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'AI Automation for HVAC Companies',
      headline: 'When the AC Goes Out,',
      headlineGradient: 'Speed Wins the Job.',
      subheadline: "Homeowners call 2-3 HVAC companies when their system breaks. The company that responds first gets the job. We build AI systems that capture every service call — day or night — optimize your truck routes, and fill your seasonal crew without the hiring headache.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '24/7', label: 'Call Capture' },
        { number: '100%', label: 'Custom-Built' },
        { number: '20%', label: 'Route Savings' },
      ],
      trustSignal: 'Built for HVAC companies. Not a generic answering service.',
    },

    painPoints: {
      headline: "Why Jobs Are Slipping Through the Cracks",
      stats: [
        {
          number: '35',
          unit: '% calls after hours',
          text: "Over a third of HVAC service calls come in after 5pm, on weekends, or on holidays — exactly when your office is closed. Those callers don't leave voicemails. They call the next company on Google."
        },
        {
          number: '25',
          unit: '% windshield time',
          text: "Your technicians spend 25% of their day driving between jobs. Poor routing means fewer jobs per day, higher fuel costs, and techs sitting in traffic instead of turning wrenches."
        },
        {
          number: '60',
          unit: 'days to fill',
          text: "Finding qualified HVAC technicians takes 60+ days on average. Every unfilled truck is $400-$600/day in lost revenue. By the time summer hits, you're turning away work because you can't staff up fast enough."
        },
      ],
      bottomStat: "The average HVAC company misses 15-20 service calls per week to voicemail. At $300-$500 per service call, that's $4,500-$10,000 in lost revenue every single week.",
      conclusion: "You've got the trucks and the skills. What's killing your growth is the after-hours calls you miss, the routes you don't optimize, and the hires you can't make fast enough.",
    },

    solution: {
      headline: "Here's What Changes",
      headlineHighlight: 'When AI Runs Your Operations',
      features: [
        {
          title: '24/7 Service Call Capture',
          description: "An AI system answers every call — emergency or routine — qualifies the job type, collects property details, and books it into your schedule. Emergency calls get flagged for immediate dispatch. Routine maintenance gets slotted into open windows. You never lose a job to voicemail again.",
          icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
        },
        {
          title: 'Optimized Truck Routes',
          description: "The system plans your daily routes based on job locations, priority, and time windows. Techs spend less time driving and more time on-site. Emergency calls get slotted into the nearest truck's route automatically.",
          icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
        },
        {
          title: 'Automated Hiring Pipeline',
          description: "Post your seasonal positions once. AI screens every application for relevant certifications, experience, and availability. The top candidates get interview invites automatically. You fill trucks in weeks instead of months.",
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        },
      ],
      conclusion: "Your office captures every call, your trucks run efficient routes, and your seasonal hiring happens without the scramble. The system handles it while you focus on growing.",
      callout: "HVAC companies using route optimization typically save 15-25% on fuel and fit 1-2 more jobs per truck per day. That's real money, every single day.",
    },

    systemsPreview: {
      headline: 'Systems Built for HVAC Companies',
      subheadline: 'Real projects we build for HVAC companies like yours',
      systems: [
        { slug: 'quiz-funnels', name: 'Service Inquiry System', description: 'Captures emergency and routine calls 24/7, qualifies job type, and books into your schedule automatically.' },
        { slug: 'route-simply', name: 'Route Optimization', description: 'Plans daily routes for maximum efficiency. Fewer miles, more jobs, lower fuel costs.' },
        { slug: 'screenfast', name: 'Technician Hiring Pipeline', description: 'Screens applications for certifications, experience, and availability. Fill seasonal positions in weeks, not months.' },
      ],
    },

    socialProof: {
      headline: 'What AI Automation Delivers for HVAC Companies',
      stats: [
        { number: '95%', label: 'Call Capture Rate', context: 'Including after-hours and weekends' },
        { number: '20%', label: 'Route Savings', context: 'Less windshield time, more billable jobs' },
        { number: '3x', label: 'Faster Hiring', context: 'AI screening vs. manual resume review' },
      ],
    },

    process: {
      phases: [
        { number: 1, title: 'Discovery', days: 'Day 1-2', tasks: ['Audit your call flow and dispatch process', 'Map your current routing and scheduling', 'Identify seasonal hiring bottlenecks'] },
        { number: 2, title: 'Design', days: 'Day 3-5', tasks: ['Design the service call qualification flow', 'Build route optimization parameters', 'Create hiring screening criteria'] },
        { number: 3, title: 'Build', days: 'Week 2', tasks: ['Build and integrate all AI systems', 'Connect to your dispatch and scheduling software', 'Test with real service scenarios'] },
        { number: 4, title: 'Launch', days: 'Week 2-3', tasks: ['Go live with call capture and routing', 'Monitor and optimize daily performance', 'Train dispatchers on the dashboard'] },
      ],
    },

    faq: [
      {
        question: 'Can this handle emergency vs. routine calls differently?',
        answer: "Absolutely. The system identifies emergency calls (no heat in winter, no AC in summer, gas leaks) and flags them for immediate dispatch. Routine maintenance and estimates get scheduled into available windows. Your team sees priority levels at a glance.",
      },
      {
        question: 'Does route optimization work with my current scheduling?',
        answer: "We integrate with ServiceTitan, Housecall Pro, Jobber, and most field service management platforms. The route optimizer works alongside your existing scheduling to maximize efficiency.",
      },
      {
        question: 'How long does setup take?',
        answer: "A single system takes 1-2 weeks. A full operations automation (call capture + routing + hiring) takes 2-3 weeks. We scope everything on our first call.",
      },
      {
        question: "What's the investment?",
        answer: "Quick Fix projects start at $1,497. Custom Builds run $3,497-$4,997. Full System builds start at $7,997+. Every project is flat-fee, no monthly retainer. That's less than one week of missed after-hours calls, and these systems capture revenue permanently.",
      },
    ],

    cta: {
      headline: 'Stop Losing Emergency Calls to',
      headlineHighlight: 'Voicemail',
      subheadline: 'Book a call to see which AI systems will capture more jobs and optimize your routes.',
    },

    relatedTags: ['hvac', 'heating and cooling', 'HVAC contractor', 'AI automation'],

    schema: {
      serviceType: 'AI Automation for HVAC Companies',
      targetAudience: 'HVAC companies, heating and cooling contractors, HVAC service businesses',
    },
  },

  // ─────────────────────────────────────────────
  // 10. LANDSCAPING COMPANIES
  // ─────────────────────────────────────────────
  landscaping: {
    slug: 'landscaping',
    label: 'Landscaping Companies',
    shortLabel: 'Landscaping',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    tagline: 'Qualify estimates and optimize crew routes automatically',

    meta: {
      title: 'AI Automation for Landscaping Companies | Brothers Automate',
      description: 'AI systems that qualify estimate requests, optimize daily crew routes, and generate fresh ad creative. Built for landscaping companies doing $1-5M. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'AI Automation for Landscaping',
      headline: 'Stop Driving to Estimates That',
      headlineGradient: 'Go Nowhere.',
      subheadline: "Half the estimates you write never turn into jobs. You're spending afternoons driving to properties, measuring, and pricing — for people who were just shopping around. We build AI systems that qualify leads before you leave the truck, optimize your crew routes, and keep your ads fresh all season.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '50%', label: 'Fewer Wasted Estimates' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Lead Qualification' },
      ],
      trustSignal: 'Built for landscaping companies. Not a generic CRM.',
    },

    painPoints: {
      headline: "Why Your Crew Is Busy but Your Profit Isn't Growing",
      stats: [
        {
          number: '50',
          unit: '% close rate',
          text: "The average landscaping company closes only half its estimates. That means for every 10 estimates you write, 5 were a waste of your afternoon. Driving, measuring, pricing — for someone who picked the cheapest bid anyway."
        },
        {
          number: '30',
          unit: '% windshield time',
          text: "Your crews spend nearly a third of their day driving between job sites. Bad routing means fewer jobs completed, higher fuel costs, and crews sitting in traffic when they could be working."
        },
        {
          number: '$3K',
          unit: '/mo on stale ads',
          text: "You're running the same Facebook and Google ads from last spring. Creative fatigue kills your cost per lead. But hiring a designer for fresh ads every week costs more than the ads themselves."
        },
      ],
      bottomStat: "A landscaping company running 5 crews wastes an average of $2,000/week on inefficient routing alone. Add in wasted estimates and stale marketing, and you're bleeding $150,000+ per year.",
      conclusion: "Your crews do great work. The problem is everything around the work — the tire-kicker estimates, the zigzag routes, and the marketing that stopped working months ago.",
    },

    solution: {
      headline: "Here's What Changes",
      headlineHighlight: 'When AI Runs Your Office',
      features: [
        {
          title: 'Qualify Before You Quote',
          description: "An AI qualification system asks prospects about project scope, budget range, timeline, and property size before you schedule an estimate. Tire-kickers get filtered out. Serious jobs get your calendar. You drive to estimates that actually close.",
          icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
        },
        {
          title: 'Optimized Crew Routes',
          description: "The system plans daily routes based on job locations, crew assignments, and time windows. Less driving, more working. Emergency add-ons get slotted into the nearest crew's schedule automatically.",
          icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
        },
        {
          title: 'Fresh Ads All Season',
          description: "Our ad engine generates on-brand creative daily — seasonal promotions, before/after project photos, service highlights. No more running last year's ads. Your cost per lead drops because creative fatigue stops.",
          icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        },
      ],
      conclusion: "Your estimates close at a higher rate, your crews finish more jobs per day, and your marketing stays fresh without lifting a finger.",
      callout: "Landscaping companies using route optimization save 15-25% on fuel and fit 1-2 more jobs per crew per day. Over a season, that adds up fast.",
    },

    systemsPreview: {
      headline: 'Systems Built for Landscaping Companies',
      subheadline: 'Real projects we build for companies like yours',
      systems: [
        { slug: 'quiz-funnels', name: 'Estimate Qualification Quiz', description: 'Filters out tire-kickers before you drive to the property. Only quote jobs that are likely to close.' },
        { slug: 'route-simply', name: 'Crew Route Optimization', description: 'Plans daily routes for maximum efficiency. Less windshield time, more billable hours.' },
        { slug: 'daily-ads', name: 'Seasonal Ad Creative', description: 'Fresh, on-brand ad creative generated daily. No more stale campaigns killing your cost per lead.' },
      ],
    },

    socialProof: {
      headline: 'What AI Automation Delivers for Landscaping Companies',
      stats: [
        { number: '70%', label: 'Estimate Close Rate', context: 'Up from ~50% with pre-qualification' },
        { number: '20%', label: 'Route Savings', context: 'Less driving, more jobs per crew' },
        { number: '40%', label: 'Lower Cost Per Lead', context: 'With daily fresh ad creative' },
      ],
    },

    process: {
      phases: [
        { number: 1, title: 'Discovery', days: 'Day 1-2', tasks: ['Audit your estimate and close rate process', 'Map your current crew routing', 'Review your ad campaigns and creative'] },
        { number: 2, title: 'Design', days: 'Day 3-5', tasks: ['Design the estimate qualification flow', 'Build route optimization parameters', 'Set up ad creative generation templates'] },
        { number: 3, title: 'Build', days: 'Week 2', tasks: ['Build and integrate all AI systems', 'Connect to your scheduling platform', 'Test with real job scenarios'] },
        { number: 4, title: 'Launch', days: 'Week 2-3', tasks: ['Go live with lead qualification', 'Activate route optimization for crews', 'Launch fresh ad creative campaigns'] },
      ],
    },

    faq: [
      {
        question: 'Does this work for both residential and commercial?',
        answer: "Absolutely. The qualification system adapts to your service types — residential lawn care, commercial maintenance, hardscaping, irrigation, whatever you offer. Different question flows for different job types.",
      },
      {
        question: 'How does route optimization handle same-day changes?',
        answer: "Emergency add-ons and cancellations get re-optimized in real-time. The system finds the nearest crew with availability and adjusts their route. No more dispatcher headaches.",
      },
      {
        question: 'How long does setup take?',
        answer: "A single system takes 1-2 weeks. A full operations suite (qualification + routing + ads) takes 2-3 weeks. We scope everything on our first call.",
      },
      {
        question: "What's the investment?",
        answer: "Quick Fix projects start at $1,497. Custom Builds run $3,497-$4,997. Full System builds start at $7,997+. Every project is flat-fee, no monthly retainer. That's less than one week of wasted estimates, and these systems work year-round.",
      },
    ],

    cta: {
      headline: 'Stop Writing Estimates for',
      headlineHighlight: 'Tire-Kickers',
      subheadline: 'Book a call to see which AI systems will save your crew time and close more jobs.',
    },

    relatedTags: ['landscaping', 'lawn care', 'landscape contractor', 'AI automation'],

    schema: {
      serviceType: 'AI Automation for Landscaping Companies',
      targetAudience: 'Landscaping companies, lawn care businesses, landscape contractors, hardscape companies',
    },
  },

  // ─────────────────────────────────────────────
  // 11. CLEANING COMPANIES
  // ─────────────────────────────────────────────
  cleaning: {
    slug: 'cleaning',
    label: 'Cleaning Companies',
    shortLabel: 'Cleaning',
    icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
    tagline: 'Automate rebookings, routes, and hiring so you can scale',

    meta: {
      title: 'AI Automation for Cleaning Companies | Brothers Automate',
      description: 'AI systems that automate rebooking sequences, optimize daily routes, and screen new hires. Built for cleaning companies doing $1-5M. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'AI Automation for Cleaning Companies',
      headline: 'Your Best Clients Should',
      headlineGradient: 'Rebook Without Being Asked.',
      subheadline: "Every cleaning company knows the math: recurring clients are 5x more profitable than one-time jobs. But rebooking takes follow-up your team doesn't have time for. We build AI systems that keep your schedule full, your routes tight, and your hiring pipeline stocked — all automatically.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '40%', label: 'More Rebookings' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
      ],
      trustSignal: 'Built for cleaning companies. Not a generic booking tool.',
    },

    painPoints: {
      headline: "Why Growth Feels So Hard",
      stats: [
        {
          number: '35',
          unit: '% don\'t rebook',
          text: "Over a third of your one-time clients never come back — not because they weren't happy, but because nobody followed up. A simple rebooking sequence would convert most of them into recurring revenue. But who has time to send those messages manually?"
        },
        {
          number: '25',
          unit: '% windshield time',
          text: "Your crews spend a quarter of their day driving between jobs. Bad routing means fewer houses cleaned per day, higher fuel costs, and crews ending late. That's revenue you're burning on gas."
        },
        {
          number: '200',
          unit: '% annual turnover',
          text: "The cleaning industry averages 200% annual staff turnover. You're constantly hiring, training, and losing people. Every time someone quits, you lose capacity and client trust. Manual screening makes the cycle worse."
        },
      ],
      bottomStat: "A cleaning company running 8 crews that loses even one client per crew per month is losing $50,000+ in annual recurring revenue. Most of those clients would have stayed with a simple follow-up.",
      conclusion: "You're great at cleaning. The systems around the cleaning — rebooking, routing, hiring — are what's holding you back.",
    },

    solution: {
      headline: "Here's What Changes",
      headlineHighlight: 'When AI Handles the Back Office',
      features: [
        {
          title: 'Automated Rebooking Sequences',
          description: "After every job, the system sends a personalized rebooking message at the right time. One-time clients get a gentle prompt to schedule again. Recurring clients get reminders before their next visit. Cancellations get a win-back sequence. Your schedule fills itself.",
          icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
        },
        {
          title: 'Optimized Daily Routes',
          description: "The system plans crew routes based on job locations, time windows, and team assignments. Crews clean more houses with less driving. Same-day additions and cancellations get re-routed automatically.",
          icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
        },
        {
          title: 'Hiring Pipeline on Autopilot',
          description: "Post once and let AI screen every application. The system evaluates reliability indicators, availability, transportation, and experience — then ranks candidates for your review. You interview the best 5 instead of reading 100 applications.",
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
        },
      ],
      conclusion: "Your schedule stays full, your crews run efficient routes, and your hiring pipeline never dries up. The system handles the busywork while you grow.",
      callout: "Cleaning companies that automate rebooking see a 30-40% increase in recurring revenue within 90 days. That's the compounding effect of consistent follow-up.",
    },

    systemsPreview: {
      headline: 'Systems Built for Cleaning Companies',
      subheadline: 'Real projects we build for companies like yours',
      systems: [
        { slug: 'quiz-funnels', name: 'Service Booking Quiz', description: 'Qualifies new clients by property size, service type, and frequency — then books them into your schedule automatically.' },
        { slug: 'route-simply', name: 'Crew Route Optimization', description: 'Plans daily routes for maximum efficiency. More houses cleaned per day, less fuel burned.' },
        { slug: 'screenfast', name: 'Hiring Pipeline', description: 'Screens and ranks every application automatically. Fill positions faster and reduce early-stage turnover.' },
      ],
    },

    socialProof: {
      headline: 'What AI Automation Delivers for Cleaning Companies',
      stats: [
        { number: '40%', label: 'More Rebookings', context: 'Automated follow-up vs. no follow-up' },
        { number: '20%', label: 'Route Savings', context: 'Less driving, more houses per crew' },
        { number: '3x', label: 'Faster Hiring', context: 'AI screening vs. manual review' },
      ],
    },

    process: {
      phases: [
        { number: 1, title: 'Discovery', days: 'Day 1-2', tasks: ['Audit your rebooking and retention rates', 'Map your current crew routing', 'Identify hiring and turnover patterns'] },
        { number: 2, title: 'Design', days: 'Day 3-5', tasks: ['Design rebooking sequences by client type', 'Build route optimization parameters', 'Create hiring screening criteria'] },
        { number: 3, title: 'Build', days: 'Week 2', tasks: ['Build and integrate all AI systems', 'Connect to your booking platform', 'Test with real scheduling scenarios'] },
        { number: 4, title: 'Launch', days: 'Week 2-3', tasks: ['Activate rebooking sequences for existing clients', 'Go live with optimized routing', 'Launch the hiring pipeline'] },
      ],
    },

    faq: [
      {
        question: 'Does this work for both residential and commercial cleaning?',
        answer: "Yes. The rebooking sequences, route optimization, and hiring systems all adapt to your service types. Residential, commercial, move-in/move-out, deep cleaning — the system handles different job types with different workflows.",
      },
      {
        question: 'Will this feel spammy to my clients?',
        answer: "Not at all. The rebooking messages are personalized, well-timed, and respectful. Clients get a helpful reminder, not a sales pitch. The tone matches your brand. Most clients appreciate the convenience.",
      },
      {
        question: 'How long does setup take?',
        answer: "A single system takes 1-2 weeks. A full operations suite (rebooking + routing + hiring) takes 2-3 weeks. We scope everything on our first call.",
      },
      {
        question: "What's the investment?",
        answer: "Quick Fix projects start at $1,497. Custom Builds run $3,497-$4,997. Full System builds start at $7,997+. Every project is flat-fee, no monthly retainer. That's less than the revenue from 3-4 recurring clients, and these systems generate clients permanently.",
      },
    ],

    cta: {
      headline: 'Stop Losing Clients to',
      headlineHighlight: 'No Follow-Up',
      subheadline: 'Book a call to see which AI systems will grow your recurring revenue and streamline operations.',
    },

    relatedTags: ['cleaning', 'maid service', 'janitorial', 'AI automation'],

    schema: {
      serviceType: 'AI Automation for Cleaning Companies',
      targetAudience: 'Cleaning companies, maid services, janitorial companies, commercial cleaning businesses',
    },
  },

  // ─────────────────────────────────────────────
  // 12. MEDICAL SPAS
  // ─────────────────────────────────────────────
  'medical-spa': {
    slug: 'medical-spa',
    label: 'Medical Spas',
    shortLabel: 'Med Spas',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    tagline: 'Match clients to the right treatment and fill your chair time',

    meta: {
      title: 'AI Automation for Medical Spas | Brothers Automate',
      description: 'AI systems that recommend treatments, generate daily ad creative, and manage your online reputation. Built for medical spas doing $1-5M. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'AI Automation for Medical Spas',
      headline: 'Your Treatments Are Excellent.',
      headlineGradient: 'Help Clients Pick the Right One.',
      subheadline: "Most med spa visitors browse your menu and freeze — too many options, not enough guidance. We build AI systems that match each client to the perfect treatment, keep your ad creative fresh daily, and manage your online reputation automatically. More bookings, less guesswork.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '35%', label: 'More Bookings' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
      ],
      trustSignal: 'Built for medical spas. Not a generic quiz tool.',
    },

    painPoints: {
      headline: "Why Your Treatment Rooms Have Empty Slots",
      stats: [
        {
          number: '65',
          unit: '% browse, don\'t book',
          text: "65% of med spa website visitors look at your treatment menu and leave without booking. They're interested but overwhelmed by options. Botox or fillers? Which facial? What about body contouring? Without guidance, they do nothing."
        },
        {
          number: '$4K',
          unit: '/mo on ads',
          text: "The average med spa spends $3,000-$5,000/month on digital ads. But you're running the same creative for weeks until it burns out. Creative fatigue drives your cost per lead up 30-40% over time."
        },
        {
          number: '88',
          unit: '% read reviews',
          text: "88% of consumers trust online reviews as much as personal recommendations. For med spas, reviews are everything — one bad review about a treatment outcome can cost you dozens of potential clients. But managing reviews manually takes hours every week."
        },
      ],
      bottomStat: "The average med spa loses $8,000-$12,000/month in potential revenue from website visitors who never book because they couldn't decide on a treatment.",
      conclusion: "Your injectors and aestheticians are world-class. The gap is between a visitor landing on your site and actually booking the right treatment.",
    },

    solution: {
      headline: "Here's What Changes",
      headlineHighlight: 'When AI Guides Your Clients',
      features: [
        {
          title: 'Treatment Recommendation Quiz',
          description: "A personalized quiz asks about their goals, skin concerns, budget, and preferences — then recommends the exact treatments they'll love. Clients book with confidence instead of browsing in circles. Average order value goes up because the recommendation is tailored.",
          icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4',
        },
        {
          title: 'Daily Fresh Ad Creative',
          description: "Our ad engine generates on-brand creative every day — seasonal promotions, treatment spotlights, before/after content. No $5K/month designer. No stale images running for months. Your cost per acquisition drops because creative fatigue stops.",
          icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z',
        },
        {
          title: 'Reputation on Autopilot',
          description: "Every satisfied client gets a review request at the perfect moment — right after their appointment when they're feeling great. Negative reviews get professional responses within hours. Your Google rating climbs while you focus on treatments.",
          icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
        },
      ],
      conclusion: "Clients find the right treatment, your ads stay fresh, and your reputation grows — all without adding to your team's workload.",
      callout: "Med spas with treatment recommendation quizzes see a 25-35% increase in booking rate and a 20% higher average ticket. Guided clients spend more and come back more often.",
    },

    systemsPreview: {
      headline: 'Systems Built for Medical Spas',
      subheadline: 'Real projects we build for med spas like yours',
      systems: [
        { slug: 'quiz-funnels', name: 'Treatment Recommendation Quiz', description: 'Matches each visitor to their ideal treatments based on goals, concerns, and budget. Turns browsers into booked appointments.' },
        { slug: 'daily-ads', name: 'Daily Ad Creative', description: 'Fresh, on-brand ad creative generated every day. No more creative fatigue killing your ad performance.' },
        { slug: 'brand-research', name: 'Competitive Research', description: "See how competing med spas position their services, what clients say about them, and where you can differentiate." },
      ],
    },

    socialProof: {
      headline: 'What AI Automation Delivers for Medical Spas',
      stats: [
        { number: '35%', label: 'More Bookings', context: 'Treatment quiz vs. standard menu page' },
        { number: '40%', label: 'Lower Ad Costs', context: 'With daily fresh creative' },
        { number: '4.9★', label: 'Average Google Rating', context: 'With automated review management' },
      ],
    },

    process: {
      phases: [
        { number: 1, title: 'Discovery', days: 'Day 1-2', tasks: ['Audit your treatment menu and booking flow', 'Review your ad campaigns and creative', 'Assess your online reputation landscape'] },
        { number: 2, title: 'Design', days: 'Day 3-5', tasks: ['Design the treatment recommendation logic', 'Set up ad creative generation templates', 'Build review management workflows'] },
        { number: 3, title: 'Build', days: 'Week 2', tasks: ['Build and integrate all AI systems', 'Connect to your booking platform', 'Test with real client scenarios'] },
        { number: 4, title: 'Launch', days: 'Week 2-3', tasks: ['Go live with the treatment quiz', 'Launch fresh ad creative campaigns', 'Activate review management'] },
      ],
    },

    faq: [
      {
        question: 'Can the quiz handle medical contraindications?',
        answer: "The quiz asks screening questions and flags potential contraindications for your clinical team to review. It doesn't replace a medical consultation — it gets the right information upfront so your team can make informed recommendations faster.",
      },
      {
        question: 'Will the ad creative match our brand aesthetic?',
        answer: "Absolutely. We set up the system with your brand guidelines, color palette, fonts, and tone of voice. Every piece of creative looks like it came from your in-house team. You approve the initial templates, then the system generates variations automatically.",
      },
      {
        question: 'How long does setup take?',
        answer: "A single system takes 1-2 weeks. A full automation suite (quiz + ads + reviews) takes 2-3 weeks. We scope everything on our first call.",
      },
      {
        question: "What's the investment?",
        answer: "Quick Fix projects start at $1,497. Custom Builds run $3,497-$4,997. Full System builds start at $7,997+. Every project is flat-fee, no monthly retainer. That's less than one Botox treatment day's revenue, and these systems generate bookings permanently.",
      },
    ],

    cta: {
      headline: 'Stop Losing Clients to',
      headlineHighlight: 'Choice Paralysis',
      subheadline: 'Book a call to see which AI systems will fill your treatment rooms and grow your practice.',
    },

    relatedTags: ['medical spa', 'med spa', 'aesthetics', 'AI automation'],

    schema: {
      serviceType: 'AI Automation for Medical Spas',
      targetAudience: 'Medical spas, med spas, aesthetic clinics, dermatology practices',
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
