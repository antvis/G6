import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import _ from 'lodash';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { visualizer } from 'rollup-plugin-visualizer';

const { camelCase, upperFirst } = _;
const isBundleVis = !!process.env.BUNDLE_VIS;

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/{{projectName}}.min.js',
      name: upperFirst(camelCase('{{projectName}}')),
      format: 'umd',
      sourcemap: false,
    },
    plugins: [
      nodePolyfills(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.build.json',
      }),
      terser(),
      ...(isBundleVis ? [visualizer()] : []),
    ],
  },
];
