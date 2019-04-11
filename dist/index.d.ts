/**
 * Returns object of default WordPress salts or any string/array of strings
 * @param length - length of the salt, defaults to 64
 * @returns - object of salts
 */
declare const wpSalts: (keys?: string | string[], saltLength?: number) => Object;
export { wpSalts };
