import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://skyaboveme.github.io',
  base: '/carsbuyai',
  outDir: './dist',
  build: {
    assets: '_astro'
  }
}); 