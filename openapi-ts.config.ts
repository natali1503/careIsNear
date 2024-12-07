import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: './apispec2.yaml',
  output: 'src/api/generated',
});
