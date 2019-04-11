/**
 * Generate a salt
 * @param length - length of the salt, defaults to 64
 * @returns - string
 *
 * @see https://roots.io/salts.html
 */
declare const generateSalt: (saltLength?: number) => string;
export { generateSalt };
