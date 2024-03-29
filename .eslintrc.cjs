/* eslint-disable */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:json/recommended'
  ],
  rules: {},
  ignorePatterns: [
    'test/**/*'
  ],
  "overrides": [
    {
      "files": ["tsconfig.json"],
      "rules": {
        "json/*": ["error", "allowComments"]
      }
    }
  ]
};
