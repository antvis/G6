import { defineConfig } from 'vite';

export default defineConfig({
  root: './tests',
  server: {
    port: 8080,
    open: '/',
  },
  optimizeDeps: {
    // @see https://github.com/vitejs/vite/issues/10839#issuecomment-1345193175
    // @see https://vitejs.dev/guide/dep-pre-bundling.html#customizing-the-behavior
    // @see https://vitejs.dev/config/dep-optimization-options.html#optimizedeps-exclude
    exclude: ['@antv/layout-wasm'],
  },
  plugins: [
    {
      name: 'isolation',
      configureServer(server) {
        // The multithreads version of @antv/layout-wasm needs to use SharedArrayBuffer, which should be used in a secure context.
        // @see https://gist.github.com/mizchi/afcc5cf233c9e6943720fde4b4579a2b
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
          res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
          next();
        });
      },
    },
  ],
});
