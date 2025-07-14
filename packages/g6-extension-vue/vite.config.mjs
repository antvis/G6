import path from 'path';
import { defineConfig } from 'vite';
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  root: './__tests__',
  server: {
    port: 8082,
    open: '/',
  },
  plugins: [vue(), vueJsx({}), { name: 'isolation' },],
  resolve: {
    alias: {
      '@antv/g6': path.resolve(__dirname, '../g6/src'),
      '@antv/g6-extension-vue': path.resolve(__dirname, './src'),
    },
  },
});
