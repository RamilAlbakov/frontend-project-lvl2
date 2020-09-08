import { test, expect, describe } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/difference.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const expectedStylishDiff = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: too much
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
}`;

const expectedPlainDiff = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

const expecteDiffObject = {
  common: {
    '+ follow': false,
    setting1: 'Value 1',
    '- setting2': 200,
    '- setting3': true,
    '+ setting3': {
      key: 'value',
    },
    '+ setting4': 'blah blah',
    '+ setting5': {
      key5: 'value5',
    },
    setting6: {
      doge: {
        '- wow': 'too much',
        '+ wow': 'so much',
      },
      key: 'value',
      '+ ops': 'vops',
    },
  },
  group1: {
    '- baz': 'bas',
    '+ baz': 'bars',
    foo: 'bar',
    '- nest': {
      key: 'value',
    },
    '+ nest': 'str',
  },
  '- group2': {
    abc: 12345,
    deep: {
      id: 45,
    },
  },
  '+ group3': {
    fee: 100500,
    deep: {
      id: {
        number: 45,
      },
    },
  },
};

const expectedJsonDiff = JSON.stringify(expecteDiffObject);

describe('compare two JSON files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');

  test('stylish formatter', () => {
    const diff = genDiff(filepath1, filepath2);
    expect(diff).toBe(expectedStylishDiff);
  });

  test('plain formatter', () => {
    const diff = genDiff(filepath1, filepath2, 'plain');
    expect(diff).toBe(expectedPlainDiff);
  });

  test('json formatter', () => {
    const diff = genDiff(filepath1, filepath2, 'json');
    expect(diff).toBe(expectedJsonDiff);
  });
});

describe('compare two YAML files', () => {
  const filepath1 = getFixturePath('file1.yml');
  const filepath2 = getFixturePath('file2.yml');

  test('stylish formatter', () => {
    const diff = genDiff(filepath1, filepath2);
    expect(diff).toBe(expectedStylishDiff);
  });

  test('plain formatter', () => {
    const diff = genDiff(filepath1, filepath2, 'plain');
    expect(diff).toBe(expectedPlainDiff);
  });

  test('json formatter', () => {
    const diff = genDiff(filepath1, filepath2, 'json');
    expect(diff).toBe(expectedJsonDiff);
  });
});

describe('compare two INI files', () => {
  const filepath1 = getFixturePath('file1.ini');
  const filepath2 = getFixturePath('file2.ini');

  test('stylish formatter', () => {
    const diff = genDiff(filepath1, filepath2);
    expect(diff).toBe(expectedStylishDiff);
  });

  test('plain formatter', () => {
    const diff = genDiff(filepath1, filepath2, 'plain');
    expect(diff).toBe(expectedPlainDiff);
  });

  test('json formatter', () => {
    const diff = genDiff(filepath1, filepath2, 'json');
    expect(diff).toBe(expectedJsonDiff);
  });
});
