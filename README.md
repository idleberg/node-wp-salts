# wp-salts

[![License](https://img.shields.io/github/license/idleberg/node-wp-salts?color=blue&style=for-the-badge)](https://github.com/idleberg/node-wp-salts/blob/main/LICENSE)
[![Version](https://img.shields.io/npm/v/wp-salts?style=for-the-badge)](https://www.npmjs.org/package/wp-salts)
[![Build](https://img.shields.io/github/actions/workflow/status/idleberg/node-wp-salts/default.yml?style=for-the-badge)](https://github.com/idleberg/node-wp-salts/actions)

Generates an object of default WordPress salts (or any other string) without the need of an internet-connection

## Installation

`npm install wp-salts -S`

## Usage

`wpSalts(keys: string | string[], length?: number)`

**Example:**

```js
import { wpSalts } from "wp-salts";

// Standard WordPress salts
wpSalts();

// Custom salts
wpSalts("SECURE_AUTH_KEY");
wpSalts(["AUTH_KEY", "AUTH_SALT"], 128);
```

**Note:** The minimum length of each salt is 8-bit (64 characters)

## Credits

- [austinpray](https://github.com/austinpray)
- [idleberg](https://github.com/idleberg)

## Related

- [wp-salts-cli](https://www.npmjs.com/package/wp-salts-cli)
- [atom-wordpress-salts](https://atom.io/packages/wordpress-salts)
- [vscode-wordpress-salts](https://marketplace.visualstudio.com/items?itemName=idleberg.wordpress-salts)

## License

This work is licensed under [The MIT License](LICENSE)
