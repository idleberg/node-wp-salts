"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
var wordpressKeys = [
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
 * Returns object of default WordPress salts or any string/array of strings
 * @param length - length of the salt, defaults to 64
 * @returns - object of salts
 */
var wpSalts = function (keys, saltLength) {
    if (keys === void 0) { keys = ''; }
    if (saltLength === void 0) { saltLength = 64; }
    var output = {};
    if (typeof keys === 'string') {
        keys = (keys.length > 0) ? [keys] : wordpressKeys;
    }
    else if (typeof keys === 'object') {
        keys = (keys.length > 0) ? keys : wordpressKeys;
    }
    else {
        keys = wordpressKeys;
    }
    saltLength = (saltLength < 64) ? 64 : saltLength;
    keys.map(function (key) { return output[key] = util_1.generateSalt(saltLength); });
    return output;
};
exports.wpSalts = wpSalts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3Atc2FsdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvd3Atc2FsdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSwrQkFBc0M7QUFFdEMsSUFBTSxhQUFhLEdBQUc7SUFDcEIsVUFBVTtJQUNWLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsV0FBVztJQUNYLFdBQVc7SUFDWCxrQkFBa0I7SUFDbEIsZ0JBQWdCO0lBQ2hCLFlBQVk7Q0FDYixDQUFDO0FBRUY7Ozs7R0FJRztBQUNILElBQU0sT0FBTyxHQUFHLFVBQUMsSUFBK0IsRUFBRSxVQUF1QjtJQUF4RCxxQkFBQSxFQUFBLFNBQStCO0lBQUUsMkJBQUEsRUFBQSxlQUF1QjtJQUN2RSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFFaEIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDNUIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxJQUFJLENBQUUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO0tBQ3JEO1NBQU0sSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDbkMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7S0FDakQ7U0FBTTtRQUNMLElBQUksR0FBRyxhQUFhLENBQUM7S0FDdEI7SUFFRCxVQUFVLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0lBRWpELElBQUksQ0FBQyxHQUFHLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsbUJBQVksQ0FBQyxVQUFVLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO0lBRXhELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQztBQUdBLDBCQUFPIn0=