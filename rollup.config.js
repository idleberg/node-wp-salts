import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';

const plugins = [
  commonjs(),
  json()
];

const compilerOptions = {
  allowSyntheticDefaultImports: true,
  moduleResolution: "node",
  strictNullChecks: true,
  typeRoots: ['./types', './node_modules/@types']
};

export default [
  {
    input: 'src/wp-salts.ts',
    output: {
      file: 'dist/wp-salts.cjs',
      format: 'cjs'
    },
    plugins: [
      ...plugins,
      typescript(compilerOptions)
    ]
  },
  {
    input: 'src/wp-salts.ts',
    output: {
      file: 'dist/wp-salts.mjs',
      format: 'esm'
    },
    plugins: [
      ...plugins,
      typescript({
        ...compilerOptions,
        module: "ES2020",
        moduleResolution: "node"
      })
    ]
  }
];
