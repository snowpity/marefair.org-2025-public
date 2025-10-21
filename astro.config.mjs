// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: "https://marefair.org",
  redirects: {
    '/cinemare': 'https://www.zeffy.com/en-US/ticketing/cinemare-night-at-mare-fair--2025',
    '/tendies': 'https://www.zeffy.com/en-US/ticketing/spaghetti-and-tendie-dinner',
    '/schedules': '/schedule'
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load',
  },
  output: 'static',
  integrations: [
    tailwind(),
    icon()
  ],
  image: {
    domains: ['fair-filer.marefair.org']
  },
});
