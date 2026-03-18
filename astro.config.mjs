import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://brothersautomate.com',
  output: 'hybrid',
  adapter: vercel(),
  integrations: [sitemap()],
});
