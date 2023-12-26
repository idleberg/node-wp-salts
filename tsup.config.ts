import { defineConfig } from 'tsup';

export default defineConfig({
	target: 'esnext',
  clean: true,
  dts: true,
  entry: ['src/wp-salts.ts'],
	external: ['get-random-values'],
	format: 'esm',
  minify: true,
  treeshake: 'recommended'
});
