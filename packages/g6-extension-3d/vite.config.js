import { defineConfig } from 'vite';

export default defineConfig({
  root: './__tests__',
  server: {
    port: 8081,
    open: '/',
  },
  plugins: [{ name: 'isolation' }],
  optimizeDeps: {
    exclude: ['@antv/g6'],
  },
});
