import { randomBytes } from 'node:crypto';

const MINIMUM_KEY_LENGTH = 64;
const FORBIDDEN_CHARACTERS = ["'", '"', '\\'];

/**
 * Generate a random BigInt value.
 *
 * @param bytesNeeded - Number of bytes needed.
 * @returns - Random BigInt value.
 */
function getRandom(bytesNeeded: number): bigint {
	// Generate a random byte array
	const byteArray = randomBytes(bytesNeeded);

	// Calculate the random value using reduce and BigInt
	const randomValue = byteArray.reduce((acc, byte, index) => {
		return acc + BigInt(byte) * BigInt(2) ** BigInt((bytesNeeded - 1 - index) * 8);
	}, BigInt(0));

	return randomValue;
}

/**
 * Get random character.
 *
 * @returns - Random character.
 *
 * @see {@link https://roots.io/salts.html}
 */
function getRandomChar(): string {
	const minCharacter = 33;
	const maxCharacter = 126;
	const character: string = String.fromCharCode(
		(Number(getRandom(1)) % (maxCharacter - minCharacter + 1)) + minCharacter,
	);

	if (FORBIDDEN_CHARACTERS.some((forbiddenCharacter) => character === forbiddenCharacter)) {
		return getRandomChar();
	}

	return character;
}

/**
 * Generates a salt.
 *
 * @param length - length of the salt, defaults to 64
 * @returns - string
 *
 * @see {@link https://roots.io/salts.html}
 */
export function generateSalt(saltLength = MINIMUM_KEY_LENGTH): string {
	const finalSaltLength = saltLength < MINIMUM_KEY_LENGTH ? MINIMUM_KEY_LENGTH : saltLength;

	return Array.from({ length: finalSaltLength }, getRandomChar).join('');
}
