import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import typescript from '@rollup/plugin-typescript';

const defaults = {
  external: [ 'crypto' ],
  output: {
    dir: 'dist',
    format: 'cjs'
  },
  plugins: [
    commonjs(),
    filesize(),
    nodeResolve(),
    typescript({
      strictNullChecks: true
    })
  ]
};

export default [
  {
    ...defaults,
    input: 'src/index.ts',
  }
];
