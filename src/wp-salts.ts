import { generateSalt } from './util';

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
 * Returns object of default WordPress salts or  string/array of strings
 * @param {string | string[] | null} keys - length of the salt, defaults to 64
 * @param {number} length - length of the salt, defaults to 64
 * @returns - object of salts
 */
const wpSalts = (keys: string | string[] | null = '', saltLength = 64): Record<string, string> => {
	const output: Record<string, string> = {};

	if (typeof keys === 'string') {
		keys = keys.length > 0 ? [keys] : WORDPRESS_KEYS;
	} else if (typeof keys === 'object') {
		keys = keys !== null && keys.length > 0 ? keys : WORDPRESS_KEYS;
	} else {
		keys = WORDPRESS_KEYS;
	}

	saltLength = saltLength < MINIMUM_KEY_LENGTH ? MINIMUM_KEY_LENGTH : saltLength;

	keys.map((key) => (output[key] = generateSalt(saltLength)));

	return output;
};

export { wpSalts };
