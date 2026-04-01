import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/static';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://brothersautomate.com',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap(), react()],
});
