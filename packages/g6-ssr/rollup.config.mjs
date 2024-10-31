import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/g6-ssr.cjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    plugins: [
      nodePolyfills(),
      resolve(),
      commonjs(),
      json(),
      typescript({
        tsconfig: 'tsconfig.build.json',
      }),
      terser(),
    ],
    external: ['fs', 'path', 'canvas'],
  },
];
