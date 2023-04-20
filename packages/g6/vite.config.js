import { defineConfig } from 'vite';

export default defineConfig({
  root: './tests',
  server: {
    port: 8080,
    open: '/',
  },
});
