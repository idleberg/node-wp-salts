import { defineConfig } from 'tsdown';

export default defineConfig((options) => {
	const isProduction = options.watch !== true;

	return {
		target: 'node20',
		clean: isProduction,
		dts: isProduction,
		entry: ['src/wp-salts.ts'],
		external: ['get-random-values'],
		format: 'esm',
		minify: isProduction,
	};
});
