import {
  test, expect, describe, beforeAll,
} from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';
import { expectedStylishDiff, expectedPlainDiff, expectedJsonDiff } from '../__fixtures__/expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

describe('compare two JSON files', () => {
  let filepath1;
  let filepath2;

  beforeAll(() => {
    filepath1 = getFixturePath('file1.json');
    filepath2 = getFixturePath('file2.json');
  });

  test.each`
    formatter    | expected
    ${'stylish'} | ${expectedStylishDiff}
    ${'plain'}   | ${expectedPlainDiff}
    ${'json'}    | ${expectedJsonDiff}
  `('$formatter formatter', ({
    formatter, expected,
  }) => {
    const diff = genDiff(filepath1, filepath2, formatter);
    expect(diff).toBe(expected);
  });
});

describe('compare two YAML files', () => {
  let filepath1;
  let filepath2;

  beforeAll(() => {
    filepath1 = getFixturePath('file1.yml');
    filepath2 = getFixturePath('file2.yml');
  });

  test.each`
    formatter    | expected
    ${'stylish'} | ${expectedStylishDiff}
    ${'plain'}   | ${expectedPlainDiff}
    ${'json'}    | ${expectedJsonDiff}
  `('$formatter formatter', ({
    formatter, expected,
  }) => {
    const diff = genDiff(filepath1, filepath2, formatter);
    expect(diff).toBe(expected);
  });
});

describe('compare two INI files', () => {
  let filepath1;
  let filepath2;

  beforeAll(() => {
    filepath1 = getFixturePath('file1.ini');
    filepath2 = getFixturePath('file2.ini');
  });

  test.each`
    formatter    | expected
    ${'stylish'} | ${expectedStylishDiff}
    ${'plain'}   | ${expectedPlainDiff}
    ${'json'}    | ${expectedJsonDiff}
  `('$formatter formatter', ({
    formatter, expected,
  }) => {
    const diff = genDiff(filepath1, filepath2, formatter);
    expect(diff).toBe(expected);
  });
});
