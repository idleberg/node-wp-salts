import { describe, expect, it } from 'vitest';
import { generateSalt } from './util.ts';

describe('generateSalt', () => {
	describe('default behavior', () => {
		it('should generate salt with default length of 64 characters', () => {
			const salt = generateSalt();

			expect(salt).toHaveLength(64);
		});

		it('should generate different salts on each call', () => {
			const salt1 = generateSalt();
			const salt2 = generateSalt();

			expect(salt1).not.toBe(salt2);
		});
	});

	describe('custom length', () => {
		it('should generate salt with specified length', () => {
			const lengths = [64, 80, 100, 128, 256];

			lengths.forEach((length) => {
				const salt = generateSalt(length);
				expect(salt).toHaveLength(length);
			});
		});

		it('should enforce minimum length of 64 when provided length is below', () => {
			const belowMinimum = [1, 10, 32, 50, 63];

			belowMinimum.forEach((length) => {
				const salt = generateSalt(length);
				expect(salt).toHaveLength(64);
			});
		});

		it('should generate very long salts', () => {
			const salt = generateSalt(512);

			expect(salt).toHaveLength(512);
		});
	});

	describe('character validation', () => {
		it('should only contain valid ASCII characters (33-126)', () => {
			const salt = generateSalt(200);

			for (const char of salt) {
				const code = char.charCodeAt(0);
				expect(code).toBeGreaterThanOrEqual(33);
				expect(code).toBeLessThanOrEqual(126);
			}
		});

		it('should not contain single quotes', () => {
			// Generate multiple salts to increase confidence
			for (let i = 0; i < 10; i++) {
				const salt = generateSalt(100);
				expect(salt).not.toContain("'");
			}
		});

		it('should not contain double quotes', () => {
			// Generate multiple salts to increase confidence
			for (let i = 0; i < 10; i++) {
				const salt = generateSalt(100);
				expect(salt).not.toContain('"');
			}
		});

		it('should not contain backslashes', () => {
			// Generate multiple salts to increase confidence
			for (let i = 0; i < 10; i++) {
				const salt = generateSalt(100);
				expect(salt).not.toContain('\\');
			}
		});

		it('should contain a variety of characters', () => {
			// Generate a long salt to increase variety
			const salt = generateSalt(500);
			const uniqueChars = new Set(salt);

			// Should have a good variety of characters (at least 30 unique chars)
			expect(uniqueChars.size).toBeGreaterThan(30);
		});
	});

	describe('randomness', () => {
		it('should generate highly unique salts', () => {
			const salts = new Set();
			const iterations = 100;

			for (let i = 0; i < iterations; i++) {
				salts.add(generateSalt(64));
			}

			// All salts should be unique
			expect(salts.size).toBe(iterations);
		});

		it('should have good character distribution', () => {
			// Generate a very long salt to test distribution
			const salt = generateSalt(1000);
			const charCounts = new Map<string, number>();

			for (const char of salt) {
				charCounts.set(char, (charCounts.get(char) || 0) + 1);
			}

			// With 1000 characters and ~91 possible characters (94 - 3 excluded),
			// no character should appear more than ~50 times (allowing for randomness)
			charCounts.forEach((count) => {
				expect(count).toBeLessThan(50);
			});
		});
	});

	describe('edge cases', () => {
		it('should enforce minimum length even for 0', () => {
			const salt = generateSalt(0);

			expect(salt).toHaveLength(64);
		});

		it('should be deterministic in length only', () => {
			const length = 75;
			const salt1 = generateSalt(length);
			const salt2 = generateSalt(length);

			// Same length
			expect(salt1).toHaveLength(length);
			expect(salt2).toHaveLength(length);

			// But different content
			expect(salt1).not.toBe(salt2);
		});
	});
});
