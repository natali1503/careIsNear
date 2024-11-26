import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import svgLoader from 'vite-svg-loader';

// https://vite.dev/config/
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
});
