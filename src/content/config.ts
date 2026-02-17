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
      'Lead Magnets',
      'Quiz Funnels',
      'Email Marketing',
      'Case Studies',
      'Marketing Automation',
      'Conversion Optimization',
      'Content Marketing',
      'Small Business Growth',
      'AI for Business',
    ]),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  blog: blogCollection,
};
