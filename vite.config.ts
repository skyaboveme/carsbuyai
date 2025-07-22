import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // For custom domain (CarsBuyAI.com)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  publicDir: 'public', // This will copy files from public/ to dist/
});
