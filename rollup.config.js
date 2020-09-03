import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

const defaults = {
  external: [ 'crypto' ],
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    nodeResolve(),
    typescript()
  ]
};

export default [
  {
    ...defaults,
    input: 'src/index.ts',
  },
  {
    ...defaults,
    input: 'src/formatters.ts',
  }
];
