import _ from 'lodash';

const isFormatedKey = (key) => key.startsWith('-') || key.startsWith('+');

const stylish = (diff, spaceCount) => {
  const keys = Object.keys(diff);

  const result = keys.reduce(
    (acc, key) => {
      const value = diff[key];
      if (!_.isPlainObject(value)) {
        return isFormatedKey(key) ? `${acc}\n${' '.repeat(spaceCount + 2)}${key}: ${value}`
          : `${acc}\n${' '.repeat(spaceCount + 4)}${key}: ${value}`;
      }
      if (isFormatedKey(key)) {
        return `${acc}\n${' '.repeat(spaceCount + 2)}${key}: ${stylish(value, spaceCount + 4)}`;
      }
      return `${acc}\n${' '.repeat(spaceCount + 4)}${key}: ${stylish(value, spaceCount + 4)}`;
    },
    '',
  );

  return `{${result}\n${' '.repeat(spaceCount)}}`;
};

export default stylish;
