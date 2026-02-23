// Location-specific SEO landing page content
// Targeting Philadelphia metro area and surrounding counties
// Add a new location = add a new object to the `locations` record below

export interface LocationStat {
  number: string;
  label: string;
}

export interface LocationService {
  slug: string;    // links to /services/[slug]
  name: string;
  description: string;
}

export interface LocationIndustry {
  slug: string;    // links to /for/[slug]
  name: string;
  blurb: string;
}

export interface LocationFAQ {
  question: string;
  answer: string;
}

export interface LocationData {
  slug: string;
  name: string;          // "Philadelphia"
  region: string;        // "PA" or "NJ"
  icon: string;          // SVG path data
  tagline: string;       // One-liner for hub page

  meta: {
    title: string;       // "AI Automation for Philadelphia Businesses | Brothers Automate"
    description: string;
  };

  hero: {
    badge: string;       // "Philadelphia, PA"
    headline: string;
    headlineGradient: string;
    subheadline: string;
    stats: LocationStat[];
  };

  localStats: {
    headline: string;
    stats: { number: string; label: string; context: string }[];
  };

  topServices: {
    headline: string;
    subheadline: string;
    services: LocationService[];
  };

  topIndustries: {
    headline: string;
    subheadline: string;
    industries: LocationIndustry[];
  };

  faq: LocationFAQ[];

  cta: {
    headline: string;
    headlineHighlight: string;
    subheadline: string;
  };
}

// ─────────────────────────────────────────────
// LOCATION DATA
// ─────────────────────────────────────────────

export const locations: Record<string, LocationData> = {

  // ─────────────────────────────────────────────
  // 1. PHILADELPHIA
  // ─────────────────────────────────────────────
  philadelphia: {
    slug: 'philadelphia',
    name: 'Philadelphia',
    region: 'PA',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
    tagline: 'AI automation built for Philly service businesses',

    meta: {
      title: 'AI Automation for Philadelphia Businesses | Brothers Automate',
      description: 'We build AI automations for Philadelphia service businesses doing $1-5M. Automated lead follow-up, review management, ad creative, and more. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'Philadelphia, PA',
      headline: 'AI Automation for',
      headlineGradient: 'Philadelphia Businesses',
      subheadline: "Philadelphia has one of the strongest service business communities on the East Coast. We help those businesses stop losing deals to slow follow-up and free up the hours they're spending on admin.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
        { number: '$0', label: 'Monthly Retainer' },
      ],
    },

    localStats: {
      headline: 'Why Philly Service Businesses Need Automation',
      stats: [
        {
          number: '1,000s',
          label: 'Service Businesses',
          context: 'Philadelphia is home to thousands of service businesses competing for local clients every day',
        },
        {
          number: '15+',
          label: 'Hours Lost Weekly',
          context: 'The average service business owner spends 15+ hours a week on follow-up, scheduling, and admin',
        },
        {
          number: '78%',
          label: 'Expect Fast Replies',
          context: 'Most leads go with whoever responds first. Slow follow-up means lost revenue in a competitive market',
        },
      ],
    },

    topServices: {
      headline: 'What We Build for Philly Businesses',
      subheadline: 'These are the systems that save the most time and close the most deals for Philadelphia service businesses.',
      services: [
        {
          slug: 'lead-follow-up',
          name: 'Automated Lead Follow-Up',
          description: 'Respond to every new lead within minutes, day or night. Qualify them automatically and route hot prospects to your calendar.',
        },
        {
          slug: 'review-management',
          name: 'Google Review Response',
          description: 'Reply to every Google review within minutes with personalized, on-brand responses. Build the reputation that wins local jobs.',
        },
        {
          slug: 'ad-creative',
          name: 'AI Ad Creative',
          description: 'Fresh, on-brand ad creative generated daily. No agency fees, no stale images. Keep your cost per lead low.',
        },
        {
          slug: 'client-onboarding',
          name: 'Client Onboarding',
          description: 'Automate intake forms, welcome sequences, and scheduling so new clients start on the right foot without manual work.',
        },
      ],
    },

    topIndustries: {
      headline: 'Industries We Serve in Philadelphia',
      subheadline: 'We build automations for service businesses across every industry. These are the ones we see most in the Philly market.',
      industries: [
        {
          slug: 'dental',
          name: 'Dental Practices',
          blurb: 'Automate patient follow-ups, review requests, and appointment reminders so your front desk can focus on the people in your waiting room.',
        },
        {
          slug: 'legal',
          name: 'Law Firms',
          blurb: 'Qualify potential clients before the consultation, automate intake, and make sure no lead falls through the cracks.',
        },
        {
          slug: 'home-services',
          name: 'Home Services & Contractors',
          blurb: 'Filter out price shoppers, optimize your routes, and respond to every Google review. Stop wasting time on unqualified estimates.',
        },
        {
          slug: 'coaches',
          name: 'Coaches & Consultants',
          blurb: 'Qualify discovery calls automatically, keep your marketing fresh, and spend your hours coaching instead of chasing leads.',
        },
      ],
    },

    faq: [
      {
        question: 'Do you only work with businesses in Philadelphia?',
        answer: "No. We work with service businesses across the Philly metro area and beyond. We're remote, so we can build for anyone. But we know the Philly market well and have a soft spot for businesses in our own backyard.",
      },
      {
        question: 'How is this different from hiring a Philly marketing agency?',
        answer: "Marketing agencies charge $5-10K per month for ongoing work. We build systems that run on their own. One flat fee, no retainer. You own everything we build, and it keeps working after the project is done.",
      },
      {
        question: 'What types of Philadelphia businesses benefit most?',
        answer: "Any service business doing $1-5M in revenue that relies on leads and appointments. Dental practices, contractors, law firms, coaches, financial advisors, cleaning companies. If you're losing deals to slow follow-up or spending too many hours on admin, we can help.",
      },
      {
        question: 'How long does it take to get up and running?',
        answer: "Most projects launch in 1-3 weeks. We scope everything on our first call so you know the timeline and cost before we start. No surprises.",
      },
    ],

    cta: {
      headline: 'Ready to Automate Your',
      headlineHighlight: 'Philly Business?',
      subheadline: 'Book a call and we will show you which automations will save you the most time and close the most deals.',
    },
  },

  // ─────────────────────────────────────────────
  // 2. MONTGOMERY COUNTY
  // ─────────────────────────────────────────────
  'montgomery-county': {
    slug: 'montgomery-county',
    name: 'Montgomery County',
    region: 'PA',
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    tagline: 'AI automation for MontCo service businesses',

    meta: {
      title: 'AI Automation for Montgomery County Businesses | Brothers Automate',
      description: 'We build AI automations for Montgomery County, PA service businesses. Automated lead follow-up, route optimization, onboarding, and more. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'Montgomery County, PA',
      headline: 'AI Automation for',
      headlineGradient: 'Montgomery County Businesses',
      subheadline: "From King of Prussia to Lansdale, Montgomery County is packed with service businesses competing for local clients. We build the AI systems that help you respond faster, follow up automatically, and stop losing deals.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
        { number: '$0', label: 'Monthly Retainer' },
      ],
    },

    localStats: {
      headline: 'Why MontCo Businesses Are Automating',
      stats: [
        {
          number: '800K+',
          label: 'County Residents',
          context: 'Montgomery County is the third most populous county in Pennsylvania, with a large base of homeowners needing services',
        },
        {
          number: '15+',
          label: 'Hours Lost Weekly',
          context: 'Service business owners spend 15+ hours a week on follow-up, scheduling, and admin that could be automated',
        },
        {
          number: 'Top 10',
          label: 'Wealthiest Counties',
          context: 'MontCo consistently ranks among the wealthiest counties in PA, meaning clients are willing to pay for quality work',
        },
      ],
    },

    topServices: {
      headline: 'What We Build for MontCo Businesses',
      subheadline: 'These are the systems that save the most time for service businesses across Montgomery County.',
      services: [
        {
          slug: 'lead-follow-up',
          name: 'Automated Lead Follow-Up',
          description: 'Respond to every new lead within minutes, qualify them automatically, and route hot prospects to your calendar.',
        },
        {
          slug: 'route-optimization',
          name: 'Route Optimization',
          description: 'Plan the most efficient daily routes across MontCo. Less windshield time, more billable hours.',
        },
        {
          slug: 'client-onboarding',
          name: 'Client Onboarding',
          description: 'Automate intake forms, welcome sequences, and scheduling so new clients get started without manual back-and-forth.',
        },
        {
          slug: 'review-management',
          name: 'Google Review Response',
          description: 'Reply to every Google review automatically. Homeowners check reviews before calling. A strong profile wins jobs.',
        },
      ],
    },

    topIndustries: {
      headline: 'Industries We Serve in Montgomery County',
      subheadline: 'Service businesses across MontCo trust us to automate the busywork so they can focus on clients.',
      industries: [
        {
          slug: 'home-services',
          name: 'Home Services & Contractors',
          blurb: 'Filter out price shoppers, optimize routes between Conshohocken and Hatboro, and respond to reviews automatically.',
        },
        {
          slug: 'dental',
          name: 'Dental Practices',
          blurb: 'Automate patient follow-ups, review management, and appointment reminders. Spend less time on the phone, more time chairside.',
        },
        {
          slug: 'financial-advisors',
          name: 'Financial Advisors',
          blurb: 'Attract qualified prospects beyond referrals, respond to every review, and research your competitive position in the MontCo market.',
        },
      ],
    },

    faq: [
      {
        question: 'Do you work with businesses across all of Montgomery County?',
        answer: "Yes. King of Prussia, Lansdale, Norristown, Conshohocken, Abington, Hatboro, Blue Bell. Anywhere in MontCo. We build remotely, so your location does not limit anything.",
      },
      {
        question: 'How is this different from a traditional marketing agency?',
        answer: "Agencies charge monthly retainers and manage campaigns. We build systems you own. One flat fee, no ongoing cost. The systems keep working after the project is done.",
      },
      {
        question: 'What types of MontCo businesses benefit most?',
        answer: "Service businesses doing $1-5M that depend on leads and appointments. Contractors, dental practices, financial advisors, cleaning companies, landscapers. If slow follow-up or too much admin is costing you deals, we can help.",
      },
      {
        question: 'How quickly can we get started?',
        answer: "Book a call and we scope your project that same week. Most systems launch in 1-3 weeks from kickoff.",
      },
    ],

    cta: {
      headline: 'Ready to Automate Your',
      headlineHighlight: 'MontCo Business?',
      subheadline: 'Book a call and we will figure out which automations will save you the most time and money.',
    },
  },

  // ─────────────────────────────────────────────
  // 3. DELAWARE COUNTY
  // ─────────────────────────────────────────────
  'delaware-county': {
    slug: 'delaware-county',
    name: 'Delaware County',
    region: 'PA',
    icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z',
    tagline: 'AI automation for Delco service businesses',

    meta: {
      title: 'AI Automation for Delaware County Businesses | Brothers Automate',
      description: 'We build AI automations for Delaware County, PA service businesses. Automated lead follow-up, review management, route optimization, and more. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'Delaware County, PA',
      headline: 'AI Automation for',
      headlineGradient: 'Delaware County Businesses',
      subheadline: "Delco is full of hardworking service businesses. Contractors, cleaners, HVAC techs, and more. We build AI systems that handle the follow-up, scheduling, and admin so you can focus on the work that pays.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
        { number: '$0', label: 'Monthly Retainer' },
      ],
    },

    localStats: {
      headline: 'Why Delco Service Businesses Are Automating',
      stats: [
        {
          number: '560K+',
          label: 'County Residents',
          context: 'Delaware County has a dense population of homeowners who need service businesses and expect fast responses',
        },
        {
          number: '5 min',
          label: 'Expected Response Time',
          context: 'Leads expect a response within minutes. If you wait an hour, they have already called your competitor.',
        },
        {
          number: '15+',
          label: 'Hours Lost Weekly',
          context: 'Most service business owners lose 15+ hours a week to follow-up, scheduling, and admin tasks',
        },
      ],
    },

    topServices: {
      headline: 'What We Build for Delco Businesses',
      subheadline: 'These are the automations Delco service businesses use to close more deals and free up their schedules.',
      services: [
        {
          slug: 'lead-follow-up',
          name: 'Automated Lead Follow-Up',
          description: 'Respond to every lead within minutes, qualify them on the spot, and book the good ones straight into your calendar.',
        },
        {
          slug: 'review-management',
          name: 'Google Review Response',
          description: 'Reply to every Google review automatically. In Delco, word of mouth and online reviews drive the business.',
        },
        {
          slug: 'route-optimization',
          name: 'Route Optimization',
          description: 'Plan the most efficient daily routes across Delco. Spend less time driving and more time on the job.',
        },
        {
          slug: 'ad-creative',
          name: 'AI Ad Creative',
          description: 'Fresh ad creative generated daily to keep your local campaigns performing without paying a designer.',
        },
      ],
    },

    topIndustries: {
      headline: 'Industries We Serve in Delaware County',
      subheadline: 'From Media to Springfield, these are the service businesses we help most in Delco.',
      industries: [
        {
          slug: 'home-services',
          name: 'Home Services & Contractors',
          blurb: 'Qualify homeowner projects before you drive out for the estimate. Optimize routes. Respond to every review. Stop wasting time on tire-kickers.',
        },
        {
          slug: 'hvac',
          name: 'HVAC Companies',
          blurb: 'Automate seasonal lead follow-up, route your techs efficiently, and build a Google review profile that dominates the local search results.',
        },
        {
          slug: 'cleaning',
          name: 'Cleaning Companies',
          blurb: 'Automate booking, follow-ups, and review requests. Spend your time managing crews, not chasing down leads.',
        },
      ],
    },

    faq: [
      {
        question: 'Do you serve all of Delaware County?',
        answer: "Yes. Media, Springfield, Havertown, Drexel Hill, Ridley, Upper Darby, Swarthmore, Broomall. Anywhere in Delco. We build remotely so geography is never a blocker.",
      },
      {
        question: 'How much does it cost?',
        answer: "Projects start at $1,497 for a single automation. Custom builds run $3,497-$4,997. Full system builds start at $7,997+. Every project is flat-fee with no monthly retainer.",
      },
      {
        question: 'What kind of Delco businesses benefit most?',
        answer: "Any service business doing $1-5M. Contractors, HVAC companies, cleaning services, dental practices. If leads are slipping through the cracks or you are spending too many hours on admin, we can help.",
      },
      {
        question: 'How fast can we launch?',
        answer: "Most projects go live in 1-3 weeks. We scope everything on the first call so you know the timeline and investment up front.",
      },
    ],

    cta: {
      headline: 'Ready to Automate Your',
      headlineHighlight: 'Delco Business?',
      subheadline: 'Book a call and we will show you which automations will save you the most time and close more jobs.',
    },
  },

  // ─────────────────────────────────────────────
  // 4. CHESTER COUNTY
  // ─────────────────────────────────────────────
  'chester-county': {
    slug: 'chester-county',
    name: 'Chester County',
    region: 'PA',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    tagline: 'AI automation for Chester County service businesses',

    meta: {
      title: 'AI Automation for Chester County Businesses | Brothers Automate',
      description: 'We build AI automations for Chester County, PA service businesses. Automated lead follow-up, review management, ad creative, and more. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'Chester County, PA',
      headline: 'AI Automation for',
      headlineGradient: 'Chester County Businesses',
      subheadline: "Chester County homeowners and professionals expect premium service. We build the AI systems that help you deliver it, from instant lead response to automated onboarding, so nothing slips through the cracks.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
        { number: '$0', label: 'Monthly Retainer' },
      ],
    },

    localStats: {
      headline: 'Why Chester County Businesses Are Automating',
      stats: [
        {
          number: '530K+',
          label: 'County Residents',
          context: 'Chester County is one of the fastest growing counties in the Philly suburbs, with an affluent homeowner base that values quality',
        },
        {
          number: 'Top 5',
          label: 'Wealthiest PA Counties',
          context: 'Higher household incomes mean clients who will pay for premium work. But they also expect a premium experience.',
        },
        {
          number: '15+',
          label: 'Hours Lost Weekly',
          context: 'Even high-end service businesses lose 15+ hours a week to admin, follow-up, and scheduling',
        },
      ],
    },

    topServices: {
      headline: 'What We Build for Chester County Businesses',
      subheadline: 'These are the systems that help Chester County service businesses deliver a premium client experience without the overhead.',
      services: [
        {
          slug: 'lead-follow-up',
          name: 'Automated Lead Follow-Up',
          description: 'Respond to every inquiry within minutes. Qualify leads automatically and send the best ones straight to your calendar.',
        },
        {
          slug: 'client-onboarding',
          name: 'Client Onboarding',
          description: 'Deliver a polished onboarding experience with automated intake, welcome sequences, and scheduling. First impressions matter.',
        },
        {
          slug: 'review-management',
          name: 'Google Review Response',
          description: 'Reply to every Google review with personalized, on-brand responses. Chester County clients check reviews before they call.',
        },
        {
          slug: 'ad-creative',
          name: 'AI Ad Creative',
          description: 'Fresh ad creative generated daily for your local campaigns. No designer fees, no stale images.',
        },
      ],
    },

    topIndustries: {
      headline: 'Industries We Serve in Chester County',
      subheadline: 'From West Chester to Exton, these are the industries we build for most often in Chester County.',
      industries: [
        {
          slug: 'financial-advisors',
          name: 'Financial Advisors',
          blurb: 'Attract qualified prospects beyond referrals, respond to every review, and sharpen your positioning in the Chester County market.',
        },
        {
          slug: 'dental',
          name: 'Dental Practices',
          blurb: 'Automate patient follow-ups, review management, and appointment reminders. Give every patient a seamless experience.',
        },
        {
          slug: 'landscaping',
          name: 'Landscaping Companies',
          blurb: 'Qualify projects before the site visit, optimize your daily routes, and build the review profile that wins high-value residential contracts.',
        },
      ],
    },

    faq: [
      {
        question: 'Do you work with businesses across all of Chester County?',
        answer: "Yes. West Chester, Exton, Downingtown, Malvern, Phoenixville, Kennett Square. Anywhere in the county. We build remotely so we can serve businesses in every part of ChesCo.",
      },
      {
        question: 'We already have a high-end brand. Will these automations match our voice?',
        answer: "Absolutely. We custom-build every system to match your brand voice and client experience. Nothing feels generic or automated. Your clients get the premium experience they expect, just faster.",
      },
      {
        question: 'What types of Chester County businesses benefit most?',
        answer: "Service businesses doing $1-5M that serve an affluent client base. Financial advisors, dental practices, landscaping companies, home remodelers. If your clients expect fast, polished communication and you are struggling to keep up manually, we can help.",
      },
      {
        question: 'How fast can we get started?',
        answer: "Book a call and we will scope your project that same week. Most systems launch in 1-3 weeks.",
      },
    ],

    cta: {
      headline: 'Ready to Automate Your',
      headlineHighlight: 'Chester County Business?',
      subheadline: 'Book a call and we will show you which automations deliver the biggest ROI for your business.',
    },
  },

  // ─────────────────────────────────────────────
  // 5. BUCKS COUNTY
  // ─────────────────────────────────────────────
  'bucks-county': {
    slug: 'bucks-county',
    name: 'Bucks County',
    region: 'PA',
    icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z',
    tagline: 'AI automation for Bucks County service businesses',

    meta: {
      title: 'AI Automation for Bucks County Businesses | Brothers Automate',
      description: 'We build AI automations for Bucks County, PA service businesses. Automated lead follow-up, route optimization, review management, and more. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'Bucks County, PA',
      headline: 'AI Automation for',
      headlineGradient: 'Bucks County Businesses',
      subheadline: "Bucks County service businesses cover a lot of ground, from Doylestown to Bristol and everywhere in between. We build AI systems that handle follow-up, routing, and admin so you can cover more ground and close more deals.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
        { number: '$0', label: 'Monthly Retainer' },
      ],
    },

    localStats: {
      headline: 'Why Bucks County Businesses Are Automating',
      stats: [
        {
          number: '640K+',
          label: 'County Residents',
          context: 'Bucks County has a large and spread-out population, meaning service businesses cover serious territory every day',
        },
        {
          number: '2-3 hrs',
          label: 'Lost to Driving Daily',
          context: 'With jobs from Doylestown to Levittown, route optimization alone can save hours every week',
        },
        {
          number: '15+',
          label: 'Hours Lost Weekly',
          context: 'Follow-up, scheduling, and admin eat 15+ hours a week for the typical service business owner',
        },
      ],
    },

    topServices: {
      headline: 'What We Build for Bucks County Businesses',
      subheadline: 'These are the automations that make the biggest difference for service businesses spread across Bucks County.',
      services: [
        {
          slug: 'lead-follow-up',
          name: 'Automated Lead Follow-Up',
          description: 'Respond to every lead in minutes, qualify them automatically, and book the serious ones into your calendar.',
        },
        {
          slug: 'route-optimization',
          name: 'Route Optimization',
          description: 'Plan the most efficient daily routes across Bucks County. Stop wasting hours driving back and forth.',
        },
        {
          slug: 'review-management',
          name: 'Google Review Response',
          description: 'Reply to every Google review automatically with personalized, on-brand responses. Reviews drive local business in Bucks County.',
        },
        {
          slug: 'client-onboarding',
          name: 'Client Onboarding',
          description: 'Automate intake forms, welcome sequences, and scheduling so new clients get started without the back-and-forth.',
        },
      ],
    },

    topIndustries: {
      headline: 'Industries We Serve in Bucks County',
      subheadline: 'From Upper Bucks to Lower Bucks, these are the service industries we work with most.',
      industries: [
        {
          slug: 'home-services',
          name: 'Home Services & Contractors',
          blurb: 'Qualify homeowner projects, optimize routes across the county, and respond to every review. Stop losing time on unqualified estimates.',
        },
        {
          slug: 'hvac',
          name: 'HVAC Companies',
          blurb: 'Automate seasonal lead follow-up, route your techs efficiently across Bucks County, and build a dominant Google review profile.',
        },
        {
          slug: 'landscaping',
          name: 'Landscaping Companies',
          blurb: 'Route your crews efficiently, qualify new projects before the site visit, and keep your ad spend working with fresh creative.',
        },
      ],
    },

    faq: [
      {
        question: 'Do you serve all of Bucks County?',
        answer: "Yes. Doylestown, New Hope, Newtown, Warrington, Langhorne, Bristol, Levittown. Upper Bucks, Central Bucks, Lower Bucks. We build remotely so we serve the whole county.",
      },
      {
        question: 'How does route optimization work for a spread-out county?',
        answer: "Our routing system takes your daily jobs and plans the most efficient sequence. For Bucks County businesses that cover a lot of miles, this typically saves 2+ hours of drive time per week and lets you fit extra jobs into your schedule.",
      },
      {
        question: 'What types of Bucks County businesses benefit most?',
        answer: "Any service business doing $1-5M that covers ground across the county. Contractors, HVAC companies, landscapers, cleaning services. If you are losing hours to driving and admin, we can help.",
      },
      {
        question: 'How fast can we get started?',
        answer: "Book a call this week, launch in 1-3 weeks. We scope everything on the first call so there are no surprises.",
      },
    ],

    cta: {
      headline: 'Ready to Automate Your',
      headlineHighlight: 'Bucks County Business?',
      subheadline: 'Book a call and we will show you which automations will save you the most time and close more deals.',
    },
  },

  // ─────────────────────────────────────────────
  // 6. BURLINGTON COUNTY
  // ─────────────────────────────────────────────
  'burlington-county': {
    slug: 'burlington-county',
    name: 'Burlington County',
    region: 'NJ',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    tagline: 'AI automation for Burlington County service businesses',

    meta: {
      title: 'AI Automation for Burlington County, NJ Businesses | Brothers Automate',
      description: 'We build AI automations for Burlington County, NJ service businesses. Automated lead follow-up, review management, route optimization, and more. Custom-built in 1-3 weeks.',
    },

    hero: {
      badge: 'Burlington County, NJ',
      headline: 'AI Automation for',
      headlineGradient: 'Burlington County Businesses',
      subheadline: "Burlington County sits right across the river from Philly, and its service businesses face the same challenges: slow follow-up, wasted drive time, and too many hours on admin. We build AI systems that fix all three.",
      stats: [
        { number: '1-3', label: 'Weeks to Launch' },
        { number: '100%', label: 'Custom-Built' },
        { number: '24/7', label: 'Runs Automatically' },
        { number: '$0', label: 'Monthly Retainer' },
      ],
    },

    localStats: {
      headline: 'Why Burlington County Businesses Are Automating',
      stats: [
        {
          number: '460K+',
          label: 'County Residents',
          context: 'Burlington County is the largest county in New Jersey by area, with a spread-out population that needs local services',
        },
        {
          number: 'Largest',
          label: 'NJ County by Area',
          context: 'More territory means more driving. Route optimization and automated scheduling are essential for businesses covering BurlCo',
        },
        {
          number: '15+',
          label: 'Hours Lost Weekly',
          context: 'Service business owners lose 15+ hours a week to admin, follow-up, and scheduling that should be automated',
        },
      ],
    },

    topServices: {
      headline: 'What We Build for Burlington County Businesses',
      subheadline: 'These are the automations that make the biggest impact for service businesses across Burlington County.',
      services: [
        {
          slug: 'lead-follow-up',
          name: 'Automated Lead Follow-Up',
          description: 'Respond to every new lead in minutes, qualify them automatically, and get the serious ones on your calendar.',
        },
        {
          slug: 'route-optimization',
          name: 'Route Optimization',
          description: 'Plan the most efficient daily routes across New Jersey\'s largest county. Save hours of drive time every week.',
        },
        {
          slug: 'review-management',
          name: 'Google Review Response',
          description: 'Reply to every Google review automatically. Build the online reputation that wins jobs in a competitive NJ market.',
        },
        {
          slug: 'client-onboarding',
          name: 'Client Onboarding',
          description: 'Automate intake, welcome sequences, and scheduling. New clients get a smooth start without the manual work.',
        },
      ],
    },

    topIndustries: {
      headline: 'Industries We Serve in Burlington County',
      subheadline: 'From Mount Laurel to Moorestown to Burlington Township, these are the industries we help most across BurlCo.',
      industries: [
        {
          slug: 'home-services',
          name: 'Home Services & Contractors',
          blurb: 'Qualify projects before the estimate, optimize routes across this large county, and respond to every review. Spend your time on real jobs.',
        },
        {
          slug: 'cleaning',
          name: 'Cleaning Companies',
          blurb: 'Automate booking, follow-ups, and review requests. Route your crews efficiently across Burlington County and grow without more admin.',
        },
        {
          slug: 'landscaping',
          name: 'Landscaping Companies',
          blurb: 'Optimize crew routes, qualify new projects before the site visit, and build a review profile that dominates local search.',
        },
      ],
    },

    faq: [
      {
        question: 'Do you work with NJ businesses even though you are a PA company?',
        answer: "We are remote. We work with service businesses across the entire Philly metro area, including Burlington County and South Jersey. We know the market on both sides of the river.",
      },
      {
        question: 'How much does it cost?',
        answer: "Projects start at $1,497 for a single automation. Custom builds run $3,497-$4,997. Full system builds start at $7,997+. Every project is flat-fee with no monthly retainer.",
      },
      {
        question: 'What types of Burlington County businesses benefit most?',
        answer: "Any service business doing $1-5M that covers ground across the county. Contractors, cleaning companies, landscapers, HVAC techs. If slow follow-up or too much admin is costing you jobs, we can help.",
      },
      {
        question: 'How fast can we get started?',
        answer: "Book a call and we scope your project that same week. Most systems launch in 1-3 weeks from kickoff.",
      },
    ],

    cta: {
      headline: 'Ready to Automate Your',
      headlineHighlight: 'Burlington County Business?',
      subheadline: 'Book a call and we will figure out which automations will save you the most time and money.',
    },
  },
};

// ─────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────

/** Get all locations as an array */
export function getAllLocations(): LocationData[] {
  return Object.values(locations);
}

/** Get all location slugs for Astro getStaticPaths() */
export function getLocationSlugs(): { params: { location: string } }[] {
  return Object.keys(locations).map(key => ({
    params: { location: key },
  }));
}

/** Look up a single location by slug */
export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations[slug];
}
