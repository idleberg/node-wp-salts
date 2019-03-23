import { generateSalt } from './util';

const wordpressKeys = [
  'AUTH_KEY',
  'SECURE_AUTH_KEY',
  'LOGGED_IN_KEY',
  'NONCE_KEY',
  'AUTH_SALT',
  'SECURE_AUTH_SALT',
  'LOGGED_IN_SALT',
  'NONCE_SALT',
];

/**
 * Returns object of default WordPress salts or any string/array or strings
 * @param length - length of the salt, defaults to 64
 * @returns - object of salts
 */
const wpSalts = (keys: string|Array<string> = '', saltLength: number = 64): Object => {
  let output = {};

  if (typeof keys === 'string') {
    keys = (keys.length > 0) ? [ keys ] : wordpressKeys;
  } else if (keys.length === 0) {
    keys = wordpressKeys;
  }

  keys.map(key => output[key] = generateSalt(saltLength));

  return output;
};

export {
  wpSalts
};
