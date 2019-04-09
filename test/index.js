// Modules
import { wpSalts } from '../dist';

// Dependencies
import test from 'ava';

const defaultFields = [
  'AUTH_KEY',
  'SECURE_AUTH_KEY',
  'LOGGED_IN_KEY',
  'NONCE_KEY',
  'AUTH_SALT',
  'SECURE_AUTH_SALT',
  'LOGGED_IN_SALT',
  'NONCE_SALT'
];

// Tests
test('Default usage', async t => {
  const actual = Object.keys(wpSalts());
  const expected = defaultFields;

  t.deepEqual(expected, actual);
});
