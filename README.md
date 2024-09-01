# wp-salts

> Generates an object of default WordPress salts. Fully offline.

[![License](https://img.shields.io/github/license/idleberg/node-wp-salts?color=blue&style=for-the-badge)](https://github.com/idleberg/node-wp-salts/blob/main/LICENSE)
[![Version: npm](https://img.shields.io/npm/v/wp-salts?style=for-the-badge)](https://www.npmjs.org/package/wp-salts)
[![Version: jsr](https://img.shields.io/jsr/v/@idleberg/wordpress-salts?style=for-the-badge)](https://jsr.io/@idleberg/wordpress-salts)
[![CI: Node](https://img.shields.io/github/actions/workflow/status/idleberg/node-wp-salts/node.yml?logo=nodedotjs&logoColor=white&style=for-the-badge)](https://github.com/idleberg/node-wp-salts/actions/workflows/node.yml)
[![CI: Deno](https://img.shields.io/github/actions/workflow/status/idleberg/node-wp-salts/deno.yml?logo=deno&logoColor=white&style=for-the-badge)](https://github.com/idleberg/node-wp-salts/actions/workflows/deno.yml)

## Installation

`npm install wp-salts -S`

## Usage

`wpSalts(keys: string | string[], length?: number)`

**Example:**

```js
import { wpSalts } from 'wp-salts';

// Standard WordPress salts
wpSalts();

// Custom salts
wpSalts('SECURE_AUTH_KEY');
wpSalts(['AUTH_KEY', 'AUTH_SALT'], 128);
```

**Note:** The minimum length of each salt is 8-bit (64 characters)

## Credits

- [idleberg](https://github.com/idleberg)
- [austinpray](https://github.com/austinpray)

## Related

- [wp-salts-cli](https://www.npmjs.com/package/wp-salts-cli)
- [vscode-wordpress-salts](https://marketplace.visualstudio.com/items?itemName=idleberg.wordpress-salts)

## License

This work is licensed under [The MIT License](LICENSE).
