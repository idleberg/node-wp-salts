// Modules
import { wpSalts } from '../dist';

// Dependencies
import test from 'ava';

const defaultFields = [
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
test('Default usage', async t => {
  const actual = Object.keys(wpSalts()).sort();
  const expected = defaultFields;

  t.deepEqual(expected, actual);
});

test('Custom key', async t => {
  const key = 'test';

  const actual = Object.keys(wpSalts(key));
  const expected = [ key ];

  t.deepEqual(expected, actual);
});

test('Custom keys', async t => {
  const keys = ['test1', 'test2', 'test3']

  const actual = Object.keys(wpSalts(keys));
  const expected = keys;

  t.deepEqual(expected, actual);
});
