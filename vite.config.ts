import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  // Set the base to the repo name when building for GitHub Pages.
  // In local dev (process.env.NODE_ENV !== 'production') this is '/' automatically.
  base: process.env.GITHUB_ACTIONS ? '/aethernotes/' : '/',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Aether Notes',
        short_name: 'Aether',
        description: 'Minimal markdown notes',
        theme_color: '#FAFAF7',
        background_color: '#FAFAF7',
        display: 'standalone',
        icons: [
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml'
          }
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

