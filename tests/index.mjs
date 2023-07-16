import { test } from 'uvu';
import { wpSalts } from '../dist/wp-salts';
import * as assert from 'uvu/assert';

const WORDPRESS_KEYS = [
  'AUTH_KEY',
  'AUTH_SALT',
  'LOGGED_IN_KEY',
  'LOGGED_IN_SALT',
  'NONCE_KEY',
  'NONCE_SALT',
  'SECURE_AUTH_KEY',
  'SECURE_AUTH_SALT'
];

// Tests
test('Default: Key count', async () => {
  const actual = Object.keys(wpSalts()).sort();
  const expected = WORDPRESS_KEYS;

  assert.equal(expected, actual);
});

test('Default: Key length (8-bit)', async () => {
  const salts = wpSalts();
  let actual = 0;

  Object.keys(salts).sort().forEach(key => {
    actual += salts[key].length;
  });

  const expected = WORDPRESS_KEYS.length * 64;

  assert.is(expected, actual);
});

test('Default: Key length (16-bit)', async () => {
  const keyLength = 128;
  const salts = wpSalts(null, keyLength);

  let actual = 0;

  Object.keys(salts).sort().forEach(key => {
    actual += salts[key].length;
  });

  const expected = WORDPRESS_KEYS.length * keyLength;

  assert.is(expected, actual);
});

test('Default: Key length below minimum', async () => {
  const keyLength = 32;
  const salts = wpSalts(null, keyLength);

  let actual = 0;

  Object.keys(salts).sort().forEach(key => {
    actual += salts[key].length;
  });

  const expected = 512;

  assert.is(expected, actual);
});

test('Custom String: Key count', async () => {
  const defaultKey = 'test';

  const actual = Object.keys(wpSalts(defaultKey));
  const expected = [ defaultKey ];

  assert.equal(expected, actual);
});

test('Custom String: Key length (8-bit)', async () => {
  const defaultKey = 'test';
  const salts = wpSalts(defaultKey);

  const actual = salts[defaultKey].length;
  const expected = 64;

  assert.is(expected, actual);
});

test('Custom String: Key length (16-bit)', async () => {
  const defaultKey = 'test';
  const keyLength = 128;
  const salts = wpSalts(defaultKey, keyLength);

  const actual = salts[defaultKey].length;
  const expected = keyLength;

  assert.is(expected, actual);
});

test('Custom String: Key length below minimum', async () => {
  const defaultKey = 'test';
  const keyLength = 32;
  const salts = wpSalts(defaultKey, keyLength);

  const actual = salts[defaultKey].length;
  const expected = 64;

  assert.is(expected, actual);
});

test('Custom Array: Key count', async () => {
  const defaultKeys = ['test1', 'test2', 'test3']

  const actual = Object.keys(wpSalts(defaultKeys));
  const expected = defaultKeys;

  assert.equal(expected, actual);
});

test('Custom Array: Key length (8-bit)', async () => {
  const defaultKeys = [
    'test1',
    'test2',
    'test3'
  ];
  const salts = wpSalts(defaultKeys);

  let actual = 0;

  defaultKeys.forEach( defaultKey => {
    actual += salts[defaultKey].length
  });

  const expected = defaultKeys.length * 64;

  assert.is(expected, actual);
});

test('Custom Array: Key length (16-bit)', async () => {
  const defaultKeys = ['test1', 'test2', 'test3'];
  const keyLength = 128;
  const salts = wpSalts(defaultKeys, keyLength);

  let actual = 0;

  defaultKeys.forEach( defaultKey => {
    actual += salts[defaultKey].length
  });

  const expected = defaultKeys.length * keyLength;

  assert.is(expected, actual);
});

test('Custom Array: Key length below minimum', async () => {
  const defaultKeys = ['test1', 'test2', 'test3'];
  const keyLength = 32;
  const salts = wpSalts(defaultKeys, keyLength);

  let actual = 0;

  defaultKeys.forEach( defaultKey => {
    actual += salts[defaultKey].length
  });

  const expected = 192;

  assert.is(expected, actual);
});

test.run();
