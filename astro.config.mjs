// @ts-check
import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

import sanity from '@sanity/astro';

import {loadEnv} from "vite";

const {
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(process.env.NODE_ENV, process.cwd, "");

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sanity({
    projectId: PUBLIC_SANITY_PROJECT_ID,
    dataset: PUBLIC_SANITY_DATASET,
    useCdn: false,
    apiVersion: "2025-11-30",
  })],
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