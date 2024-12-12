import path from 'path';

import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import svgLoader from 'vite-svg-loader';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    svgLoader({
      svgoConfig: {
        plugins: [
          {
            name: 'removeDimensions',
          },
        ],
      },
    }),
  ],
  resolve: {
    extensions: ['.vue', '.js', '.ts', '.jsx', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './src'), // Указываем путь к вашей папке "src"
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: '/tests/setupTests.ts',
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
  },
});
