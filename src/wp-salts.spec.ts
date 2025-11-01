import { describe, expect, it } from 'vitest';
import { wpSalts } from './wp-salts.ts';

const WORDPRESS_KEYS = [
	'AUTH_KEY',
	'SECURE_AUTH_KEY',
	'LOGGED_IN_KEY',
	'NONCE_KEY',
	'AUTH_SALT',
	'SECURE_AUTH_SALT',
	'LOGGED_IN_SALT',
	'NONCE_SALT',
];

describe('wpSalts', () => {
	describe('default behavior', () => {
		it('should generate all 8 default WordPress keys', () => {
			const salts = wpSalts();
			const keys = Object.keys(salts);

			expect(keys).toHaveLength(8);
			expect(keys.sort()).toEqual(WORDPRESS_KEYS.sort());
		});

		it('should generate salts with default length of 64 characters', () => {
			const salts = wpSalts();

			Object.values(salts).forEach((salt) => {
				expect(salt).toHaveLength(64);
			});
		});

		it('should generate unique salts for each key', () => {
			const salts = wpSalts();
			const saltValues = Object.values(salts);
			const uniqueSalts = new Set(saltValues);

			expect(uniqueSalts.size).toBe(saltValues.length);
		});
	});

	describe('custom length', () => {
		it('should generate salts with custom length', () => {
			const customLength = 128;
			const salts = wpSalts(null, customLength);

			Object.values(salts).forEach((salt) => {
				expect(salt).toHaveLength(customLength);
			});
		});

		it('should enforce minimum length of 64 when provided length is below', () => {
			const belowMinimum = 32;
			const salts = wpSalts(null, belowMinimum);

			Object.values(salts).forEach((salt) => {
				expect(salt).toHaveLength(64);
			});
		});

		it('should allow length exactly at minimum (64)', () => {
			const salts = wpSalts(null, 64);

			Object.values(salts).forEach((salt) => {
				expect(salt).toHaveLength(64);
			});
		});
	});

	describe('custom keys - single string', () => {
		it('should generate salt for a single custom key', () => {
			const customKey = 'CUSTOM_KEY';
			const salts = wpSalts(customKey);

			expect(Object.keys(salts)).toEqual([customKey]);
			expect(salts[customKey]).toHaveLength(64);
		});

		it('should handle custom key with custom length', () => {
			const customKey = 'CUSTOM_KEY';
			const customLength = 100;
			const salts = wpSalts(customKey, customLength);

			expect(salts[customKey]).toHaveLength(customLength);
		});

		it('should use default keys when empty string is provided', () => {
			const salts = wpSalts('');

			expect(Object.keys(salts).sort()).toEqual(WORDPRESS_KEYS.sort());
		});
	});

	describe('custom keys - array', () => {
		it('should generate salts for multiple custom keys', () => {
			const customKeys = ['KEY1', 'KEY2', 'KEY3'];
			const salts = wpSalts(customKeys);

			expect(Object.keys(salts)).toEqual(customKeys);
			customKeys.forEach((key) => {
				expect(salts[key]).toHaveLength(64);
			});
		});

		it('should handle custom keys array with custom length', () => {
			const customKeys = ['KEY1', 'KEY2'];
			const customLength = 80;
			const salts = wpSalts(customKeys, customLength);

			customKeys.forEach((key) => {
				expect(salts[key]).toHaveLength(customLength);
			});
		});

		it('should use default keys when empty array is provided', () => {
			const salts = wpSalts([]);

			expect(Object.keys(salts).sort()).toEqual(WORDPRESS_KEYS.sort());
		});
	});

	describe('null parameter', () => {
		it('should use default keys when null is provided', () => {
			const salts = wpSalts(null);

			expect(Object.keys(salts).sort()).toEqual(WORDPRESS_KEYS.sort());
		});

		it('should use default keys with custom length when null is provided', () => {
			const customLength = 96;
			const salts = wpSalts(null, customLength);

			expect(Object.keys(salts).sort()).toEqual(WORDPRESS_KEYS.sort());
			Object.values(salts).forEach((salt) => {
				expect(salt).toHaveLength(customLength);
			});
		});
	});

	describe('salt quality', () => {
		it('should generate different salts on each call', () => {
			const salts1 = wpSalts();
			const salts2 = wpSalts();

			WORDPRESS_KEYS.forEach((key) => {
				expect(salts1[key]).not.toBe(salts2[key]);
			});
		});

		it('should generate salts containing only valid characters', () => {
			const salts = wpSalts();

			Object.values(salts).forEach((salt) => {
				// Check that all characters are in the valid ASCII range (33-126)
				// and not one of the excluded characters: ', ", \
				for (const char of salt) {
					const code = char.charCodeAt(0);
					expect(code).toBeGreaterThanOrEqual(33);
					expect(code).toBeLessThanOrEqual(126);
					expect(["'", '"', '\\']).not.toContain(char);
				}
			});
		});
	});
});
