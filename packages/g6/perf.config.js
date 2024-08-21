import { defineConfig } from 'iperf';
import path from 'path';

export default defineConfig({
  perf: {
    report: {
      dir: './__tests__/perf-report',
    },
  },
  resolve: {
    alias: {
      '@antv/g6': path.resolve(__dirname, './src'),
    },
  },
});
