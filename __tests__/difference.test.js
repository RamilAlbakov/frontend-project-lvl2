import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/difference.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const expectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('compare two flat JSON files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const diff = genDiff(filepath1, filepath2);

  expect(diff).toBe(expectedDiff);
});

test('compare two flat YAML files', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');
  const diff = genDiff(filepath1, filepath2);

  expect(diff).toBe(expectedDiff);
});

test('compare two flat INI files', () => {
  const filepath1 = getFixturePath('file1.ini');
  const filepath2 = getFixturePath('file2.ini');
  const diff = genDiff(filepath1, filepath2);

  expect(diff).toBe(expectedDiff);
});
