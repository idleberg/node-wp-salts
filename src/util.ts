import * as getRandomValues from 'get-random-values';

/**
 * Generate random number
 * @param min - lowest value
 * @param max - highest value
 * @returns - random number
 *
 * @see https://github.com/EFForg/OpenWireless/blob/0e0bd06277f7178f840c36a9b799c7659870fa57/app/js/diceware.js#L59
 */
const getRandom = (min: number, max: number): number => {
  let randomValue: number = 0;
  const range: number = max - min;

  const bitsNeeded: number = Math.ceil(Math.log2(range));

  if (bitsNeeded > 53) {
    throw new RangeError('Cannot generate numbers larger than 53 bits.');
  }

  const bytesNeeded: number = Math.ceil(bitsNeeded / 8);
  const mask: number = Math.pow(2, bitsNeeded) - 1;
  const byteArray: Uint8Array = new Uint8Array(bytesNeeded);

  getRandomValues(byteArray);

  let p = (bytesNeeded - 1) * 8;

  for (let i = 0; i < bytesNeeded; i++) {
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
const getRandomChar = (): string => {
  const minCharacter: number = 33;
  const maxCharacter: number = 126;
  const character: string = String.fromCharCode(getRandom(minCharacter, maxCharacter));

  if (
    ['\'', '"', '\\'].some(badCharacter => {
      return character === badCharacter;
    })
  ) {
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
const generateSalt = (saltLength = 64): string => {
  return Array.apply(null, Array(saltLength))
    .map(getRandomChar)
    .join('');
};

export {
  generateSalt
};
