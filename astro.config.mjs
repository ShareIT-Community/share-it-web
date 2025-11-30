// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sanity()],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'catppuccin-mocha',
      wrap: true,
    }
  },
  adapter: netlify(),
})