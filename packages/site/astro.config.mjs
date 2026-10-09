import { defineConfig } from '@antv/astro-theme-antv';
import { fileURLToPath } from 'node:url';
import site from './site.config.mjs';

const config = defineConfig(site);
export default {
  ...config,
  devToolbar: { enabled: false },
  vite: {
    optimizeDeps: {
      include: [
        '@antv/astro-theme-antv > sucrase',
        ...Object.keys(site.demo.dependencies).filter((name) => !name.startsWith('/')),
      ],
    },
    resolve: {
      // Exact matches keep extension packages and subpath imports intact.
      alias: [
        ...['g6', 'g6-extension-3d', 'g6-extension-react'].map((name) => ({
          find: new RegExp(`^@antv/${name}$`),
          replacement: fileURLToPath(new URL(`../${name}/src/index.ts`, import.meta.url)),
        })),
        { find: '/demo-runtime.ts', replacement: fileURLToPath(new URL('./src/demo-runtime.ts', import.meta.url)) },
      ],
    },
  },
};
