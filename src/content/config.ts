import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
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
  }),
});

export const collections = {
  blog: blogCollection,
};
