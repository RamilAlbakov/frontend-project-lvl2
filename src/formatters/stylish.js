import _ from 'lodash';

const addSpaces = 2;

const objToString = (data, spaceCount) => {
  if (!_.isPlainObject(data)) {
    return data;
  }

  const keys = Object.keys(data);
  const spaces = ' '.repeat(spaceCount + addSpaces * 2);

  const result = keys.map(
    (key) => {
      const value = data[key];
      if (!_.isPlainObject(value)) {
        return `${spaces}  ${key}: ${value}`;
      }
      return `${spaces}  ${key}: ${objToString(value, spaceCount + addSpaces * 2)}`;
    },
  );
  const spacesBeforBracket = ' '.repeat(spaceCount + addSpaces);
  return `{\n${result.join('\n')}\n${spacesBeforBracket}}`;
};

const stylish = (diff) => {
  const iter = (data, spaceNum) => {
    const neededSpaces = ' '.repeat(spaceNum + addSpaces);
    const spaceCount = spaceNum + addSpaces;

    const result = data.map(
      (item) => {
        const { key, type, value } = item;
        if (type === 'added') {
          return `${neededSpaces}+ ${key}: ${objToString(value, spaceCount)}`;
        }
        if (type === 'removed') {
          return `${neededSpaces}- ${key}: ${objToString(value, spaceCount)}`;
        }
        if (type === 'unchanged') {
          return `${neededSpaces}  ${key}: ${objToString(value, spaceCount)}`;
        }
        if (type === 'changed') {
          const oldVal = `${neededSpaces}- ${key}: ${objToString(item.oldValue, spaceCount)}`;
          const newVal = `${neededSpaces}+ ${key}: ${objToString(item.newValue, spaceCount)}`;
          return `${oldVal}\n${newVal}`;
        }

        const newData = item.children;
        return `${neededSpaces}  ${key}: ${iter(newData, spaceNum + addSpaces * 2)}`;
      },
    );

    const spacesBeforBracket = ' '.repeat(spaceNum);
    return `{\n${result.join('\n')}\n${spacesBeforBracket}}`;
  };

  return iter(diff, 0);
};

export default stylish;
