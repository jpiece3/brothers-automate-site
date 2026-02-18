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
    slug: 'brand-research',
    name: 'Brand Research',
    tagline: 'AI-powered audience and competitor intelligence',
    icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    description: 'Agency: completed full brand research, competitor analysis, and positioning strategy in 48 hours instead of 4 weeks.',
    ctaLabel: 'Try It Live',
    ctaType: 'product-link',
    meta: {
      title: 'Brand Research | AI-Powered Market Intelligence | Brothers Automate',
      description: 'Get deep audience insights, competitor analysis, and positioning strategy powered by AI. In days, not months.'
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
      headline: 'Research in days, not months',
      stats: [
        { number: '48hr', label: 'Turnaround', context: 'Full brand research delivered' },
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
    slug: 'google-review-response',
    name: 'Google Review Response',
    tagline: 'Automated review management and responses',
    icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    description: 'Restaurant: 100% review response rate with personalized, on-brand replies, without the owner touching a keyboard.',
    ctaLabel: 'See How It Works',
    ctaType: 'book-call',
    meta: {
      title: 'Google Review Response | Automated Review Management | Brothers Automate',
      description: 'Never miss another Google review. Our AI responds to every review with personalized, on-brand replies. Automatically.'
    },
    problem: {
      headline: 'Your reviews are going unanswered',
      description: 'Every unanswered review is a missed opportunity. Happy customers feel ignored. Negative reviews fester. And Google notices when you don\'t engage.',
      painPoints: [
        'Reviews pile up and you never get around to responding',
        'Negative reviews sit unanswered for days, damaging your reputation',
        'Writing thoughtful responses takes 10-15 minutes per review',
        'Google\'s algorithm rewards businesses that actively respond to reviews'
      ]
    },
    solution: {
      headline: 'AI that responds to every review, every time',
      description: 'Our system monitors your Google reviews and generates personalized, on-brand responses, thanking happy customers and professionally addressing concerns. You approve or it auto-posts.',
      features: [
        { title: 'Real-Time Monitoring', description: 'New reviews detected and responded to within minutes' },
        { title: 'On-Brand Voice', description: 'Responses match your business personality and tone' },
        { title: 'Smart Escalation', description: 'Negative reviews flagged for your personal attention' },
        { title: 'Auto or Approval Mode', description: 'Choose full automation or review-before-posting' }
      ]
    },
    results: {
      headline: 'Every review gets a response. Automatically.',
      stats: [
        { number: '100%', label: 'Response Rate', context: 'Every review answered' },
        { number: '<5min', label: 'Response Time', context: 'From review to reply' },
        { number: '0', label: 'Hours Spent', context: 'On manual responses' }
      ]
    },
    cta: {
      headline: 'Stop letting reviews go unanswered',
      description: 'Let\'s set up automated review responses that protect your reputation 24/7.'
    }
  },
  {
    slug: 'route-simply',
    name: 'Route Simply',
    tagline: 'AI-optimized routing and scheduling',
    icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7',
    description: 'Contractor: cut drive time by 30% and fit 2 more jobs per week with AI-optimized routing.',
    ctaLabel: 'Learn More',
    ctaType: 'book-call',
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
    }
  }
];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
