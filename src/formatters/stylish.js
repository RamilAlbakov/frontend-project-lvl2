import _ from 'lodash';

const addSpaces = 2;
const depthSpaceCount = 4;

const stringify = (data, spaceCount) => {
  if (!_.isPlainObject(data)) {
    return data;
  }

  const keys = Object.keys(data);
  const indent = ' '.repeat(spaceCount + depthSpaceCount);

  const result = keys.map(
    (key) => {
      const value = data[key];
      if (!_.isPlainObject(value)) {
        return `${indent}  ${key}: ${value}`;
      }
      return `${indent}  ${key}: ${stringify(value, spaceCount + depthSpaceCount)}`;
    },
  );
  const spacesBeforBracket = ' '.repeat(spaceCount + addSpaces);
  return `{\n${result.join('\n')}\n${spacesBeforBracket}}`;
};

const stylish = (diff) => {
  const iter = (data, nestedDepth) => {
    const spaceCount = nestedDepth * depthSpaceCount + addSpaces;
    const indent = ' '.repeat(spaceCount);

    const result = data.map(
      (item) => {
        const { key, type, value } = item;
        if (type === 'added') {
          return `${indent}+ ${key}: ${stringify(value, spaceCount)}`;
        }
        if (type === 'removed') {
          return `${indent}- ${key}: ${stringify(value, spaceCount)}`;
        }
        if (type === 'unchanged') {
          return `${indent}  ${key}: ${stringify(value, spaceCount)}`;
        }
        if (type === 'changed') {
          const oldVal = `${indent}- ${key}: ${stringify(item.oldValue, spaceCount)}`;
          const newVal = `${indent}+ ${key}: ${stringify(item.newValue, spaceCount)}`;
          return `${oldVal}\n${newVal}`;
        }
        return `${indent}  ${key}: ${iter(item.children, nestedDepth + 1)}`;
      },
    );

    const spacesBeforBracket = ' '.repeat(nestedDepth * depthSpaceCount);
    return `{\n${result.join('\n')}\n${spacesBeforBracket}}`;
  };

  return iter(diff, 0);
};

export default stylish;
