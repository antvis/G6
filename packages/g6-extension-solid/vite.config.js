import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: './__tests__',
  server: {
    port: 8082,
    open: '/',
  },
  plugins: [{ name: 'isolation' }],
  resolve: {
    alias: {
      '@antv/g6': path.resolve(__dirname, '../g6/src'),
      '@antv/g6-extension-react': path.resolve(__dirname, './src'),
    },
  },
});
