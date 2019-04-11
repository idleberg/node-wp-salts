"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getRandomValues = require("get-random-values");
/**
 * Generate random number
 * @param min - lowest value
 * @param max - highest value
 * @returns - random number
 *
 * @see https://github.com/EFForg/OpenWireless/blob/0e0bd06277f7178f840c36a9b799c7659870fa57/app/js/diceware.js#L59
 */
var getRandom = function (min, max) {
    var randomValue = 0;
    var range = max - min;
    var bitsNeeded = Math.ceil(Math.log2(range));
    if (bitsNeeded > 53) {
        throw new RangeError('Cannot generate numbers larger than 53 bits.');
    }
    var bytesNeeded = Math.ceil(bitsNeeded / 8);
    var mask = Math.pow(2, bitsNeeded) - 1;
    var byteArray = new Uint8Array(bytesNeeded);
    getRandomValues(byteArray);
    var p = (bytesNeeded - 1) * 8;
    for (var i = 0; i < bytesNeeded; i++) {
        randomValue += byteArray[i] * Math.pow(2, p);
        p -= 8;
    }
    randomValue = randomValue & mask;
    return randomValue >= range ? getRandom(min, max) : min + randomValue;
};
/**
 * Get random character
 * @returns - random character
 *
 * @see https://roots.io/salts.html
 */
var getRandomChar = function () {
    var minCharacter = 33;
    var maxCharacter = 126;
    var character = String.fromCharCode(getRandom(minCharacter, maxCharacter));
    if (['\'', '"', '\\'].some(function (badCharacter) {
        return character === badCharacter;
    })) {
        return getRandomChar();
    }
    return character;
};
/**
 * Generate a salt
 * @param length - length of the salt, defaults to 64
 * @returns - string
 *
 * @see https://roots.io/salts.html
 */
var generateSalt = function (saltLength) {
    if (saltLength === void 0) { saltLength = 64; }
    return Array.apply(null, Array(saltLength))
        .map(getRandomChar)
        .join('');
};
exports.generateSalt = generateSalt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbURBQXFEO0FBRXJEOzs7Ozs7O0dBT0c7QUFDSCxJQUFNLFNBQVMsR0FBRyxVQUFDLEdBQVcsRUFBRSxHQUFXO0lBQ3pDLElBQUksV0FBVyxHQUFXLENBQUMsQ0FBQztJQUM1QixJQUFNLEtBQUssR0FBVyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBRWhDLElBQU0sVUFBVSxHQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBRXZELElBQUksVUFBVSxHQUFHLEVBQUUsRUFBRTtRQUNuQixNQUFNLElBQUksVUFBVSxDQUFDLDhDQUE4QyxDQUFDLENBQUM7S0FDdEU7SUFFRCxJQUFNLFdBQVcsR0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN0RCxJQUFNLElBQUksR0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakQsSUFBTSxTQUFTLEdBQWUsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFMUQsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTNCLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLFdBQVcsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0MsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNSO0lBRUQsV0FBVyxHQUFHLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFFakMsT0FBTyxXQUFXLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDO0FBQ3hFLENBQUMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ0gsSUFBTSxhQUFhLEdBQUc7SUFDcEIsSUFBTSxZQUFZLEdBQVcsRUFBRSxDQUFDO0lBQ2hDLElBQU0sWUFBWSxHQUFXLEdBQUcsQ0FBQztJQUNqQyxJQUFNLFNBQVMsR0FBVyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUVyRixJQUNFLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxZQUFZO1FBQ2pDLE9BQU8sU0FBUyxLQUFLLFlBQVksQ0FBQztJQUNwQyxDQUFDLENBQUMsRUFDRjtRQUNBLE9BQU8sYUFBYSxFQUFFLENBQUM7S0FDeEI7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFFRjs7Ozs7O0dBTUc7QUFDSCxJQUFNLFlBQVksR0FBRyxVQUFDLFVBQWU7SUFBZiwyQkFBQSxFQUFBLGVBQWU7SUFDbkMsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDeEMsR0FBRyxDQUFDLGFBQWEsQ0FBQztTQUNsQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDZCxDQUFDLENBQUM7QUFHQSxvQ0FBWSJ9