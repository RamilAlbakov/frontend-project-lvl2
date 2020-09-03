import _ from 'lodash';

const isFormatedKey = (key) => key.startsWith('-') || key.startsWith('+');

const stylish = (diff, spaceCount = 0) => {
  const keys = Object.keys(diff);

  const result = keys.reduce(
    (acc, key) => {
      const value = diff[key];
      const neededSpaceCount = isFormatedKey(key) ? spaceCount + 2 : spaceCount + 4;
      if (!_.isPlainObject(value)) {
        return `${acc}\n${' '.repeat(neededSpaceCount)}${key}: ${value}`;
      }
      return `${acc}\n${' '.repeat(neededSpaceCount)}${key}: ${stylish(value, spaceCount + 4)}`;
    },
    '',
  );

  return `{${result}\n${' '.repeat(spaceCount)}}`;
};

export default stylish;
