import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    updated: z.date().optional(),
    author: z.string().default('Brothers Automate'),
    image: z.string().optional(),
    category: z.enum([
      // Legacy categories (existing posts)
      'Lead Magnets',
      'Quiz Funnels',
      'Email Marketing',
      'Case Studies',
      'Marketing Automation',
      'Conversion Optimization',
      'Content Marketing',
      'Small Business Growth',
      'AI for Business',
      // New automation categories
      'AI Automation',
      'Operations Automation',
      'Sales Automation',
      'Customer Service Automation',
      'HR & Hiring Automation',
      'Finance & Admin Automation',
    ]),
    tags: z.array(z.string()).optional(),
    videoId: z.string().optional(),
    videoTitle: z.string().optional(),
    offerText: z.string().optional(),
    offerLabel: z.string().optional(),
    offerHref: z.string().optional(),
    // Point a near-duplicate post at the version that should rank, so the two
    // stop splitting the same query between them. Absolute URL.
    canonicalUrl: z.string().url().optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
