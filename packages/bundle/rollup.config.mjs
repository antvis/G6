import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import nodePolyfills from 'rollup-plugin-polyfill-node';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/rollup/g6.umd.js',
    name: 'g6',
    format: 'umd',
    sourcemap: false,
  },
  plugins: [nodePolyfills(), resolve(), commonjs(), typescript(), terser()],
};
