import terser from '@rollup/plugin-terser';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { visualizer } from 'rollup-plugin-visualizer';

const isBundleVis = !!process.env.BUNDLE_VIS;

module.exports = [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/g6-plugin-map-view.min.js',
      name: 'G6V5',
      format: 'umd',
      sourcemap: false,
    },
    plugins: [
      nodePolyfills(),
      resolve(),
      commonjs(),
      typescript(),
      terser(),
      ...(isBundleVis ? [visualizer()] : []),
    ],
  },
];
