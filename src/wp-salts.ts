import { generateSalt } from './util.ts';

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
const MINIMUM_KEY_LENGTH = 64;

/**
 * Returns object of default WordPress salts or  string/array of strings.
 *
 * @param keys - length of the salt, defaults to 64
 * @param length - length of the salt, defaults to 64
 * @returns - object of salts
 *
 * @example
 * ```js
 * import { wpSalts } from 'wp-salts';
 *
 * // Standard WordPress salts
 * wpSalts();
 *
 * // Custom salts
 * wpSalts('SECURE_AUTH_KEY');
 * wpSalts(['AUTH_KEY', 'AUTH_SALT'], 128);
 * ```
 */
export function wpSalts(keys: string | string[] | null = '', saltLength = 64): Record<string, string> {
	const resolvedKeys =
		typeof keys === 'string'
			? keys.length > 0
				? [keys]
				: WORDPRESS_KEYS
			: keys !== null && keys.length > 0
				? keys
				: WORDPRESS_KEYS;

	const finalSaltLength = saltLength < MINIMUM_KEY_LENGTH ? MINIMUM_KEY_LENGTH : saltLength;

	return resolvedKeys.reduce(
		(output, key) => {
			output[key] = generateSalt(finalSaltLength);

			return output;
		},
		{} as Record<string, string>,
	);
}
