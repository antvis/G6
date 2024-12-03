import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'g6',
      fileName: 'g6',
      formats: ['umd'],
    },
    outDir: 'dist/vite',
  },
});
