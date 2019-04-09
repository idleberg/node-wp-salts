// Modules
import { wpSalts } from '../dist';

// Dependencies
import test from 'ava';

const wpKeys = [
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
test('Default: Key count', async t => {
  const actual = Object.keys(wpSalts()).sort();
  const expected = wpKeys;

  t.deepEqual(expected, actual);
});

test('Default: Key length (8-bit)', async t => {
  const salts = wpSalts();
  let actual = 0;

  Object.keys(salts).sort().forEach( (key, index) => {
    actual += salts[key].length;
  });

  const expected = wpKeys.length * 64;

  t.is(expected, actual);
});


test('Default: Key length (16-bit)', async t => {
  const keyLength = 128;
  const salts = wpSalts({}, keyLength);

  let actual = 0;

  Object.keys(salts).sort().forEach( (key, index) => {
    actual += salts[key].length;
  });

  const expected = wpKeys.length * keyLength;

  t.is(expected, actual);
});

test('Custom String: Key count', async t => {
  const key = 'test';

  const actual = Object.keys(wpSalts(key));
  const expected = [ key ];

  t.deepEqual(expected, actual);
});

test('Custom String: Key length (8-bit)', async t => {
  const defaultKey = 'test';
  const salts = wpSalts(defaultKey);

  const actual = salts[defaultKey].length;
  const expected = 64;

  t.is(expected, actual);
});

test('Custom String: Key length (16-bit)', async t => {
  const defaultKey = 'test';
  const keyLength = 128;
  const salts = wpSalts(defaultKey, keyLength);

  const actual = salts[defaultKey].length;
  const expected = keyLength;

  t.is(expected, actual);
});

test('Custom Array: Key count', async t => {
  const keys = ['test1', 'test2', 'test3']

  const actual = Object.keys(wpSalts(keys));
  const expected = keys;

  t.deepEqual(expected, actual);
});

test('Custom Array: Key length (8-bit)', async t => {
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

  t.is(expected, actual);
});

test('Custom Array: Key length (16-bit)', async t => {
  const defaultKeys = [
    'test1',
    'test2',
    'test3'
  ];
  const keyLength = 128;
  const salts = wpSalts(defaultKeys, keyLength);

  let actual = 0;

  defaultKeys.forEach( defaultKey => {
    actual += salts[defaultKey].length
  });

  const expected = defaultKeys.length * keyLength;

  t.is(expected, actual);
});
