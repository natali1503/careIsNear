import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import svgLoader from 'vite-svg-loader';

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
  },
  test: {
    globals: true,
    environment: 'jsdom',
    server: {
      deps: {
        inline: ['vuetify'],
      },
    },
  },
});
