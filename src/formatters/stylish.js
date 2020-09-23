import _ from 'lodash';

const legacySpaces = 2;
const depthSpaceCount = 4;

const stringify = (data, depth) => {
  if (!_.isObject(data)) {
    return data;
  }

  const keys = Object.keys(data);
  const spaceCount = (depth + 1) * depthSpaceCount + legacySpaces;
  const indent = ' '.repeat(spaceCount);

  const result = keys.map(
    (key) => {
      const value = data[key];
      if (!_.isObject(value)) {
        return `${indent}  ${key}: ${value}`;
      }
      return `${indent}  ${key}: ${stringify(value, depth + 1)}`;
    },
  );
  const spacesBeforBracket = ' '.repeat(spaceCount - legacySpaces);
  return `{\n${result.join('\n')}\n${spacesBeforBracket}}`;
};

const stylish = (diff) => {
  const iter = (data, depth) => {
    const spaceCount = depth * depthSpaceCount + legacySpaces;
    const indent = ' '.repeat(spaceCount);

    const result = data.map(
      (item) => {
        const { key, type, value } = item;
        switch (type) {
          case 'added':
            return `${indent}+ ${key}: ${stringify(value, depth)}`;
          case 'removed':
            return `${indent}- ${key}: ${stringify(value, depth)}`;
          case 'changed': {
            const oldVal = `${indent}- ${key}: ${stringify(item.oldValue, depth)}`;
            const newVal = `${indent}+ ${key}: ${stringify(item.newValue, depth)}`;
            return `${oldVal}\n${newVal}`;
          }
          case 'unchanged':
            return `${indent}  ${key}: ${stringify(value, depth)}`;
          case 'complex':
            return `${indent}  ${key}: ${iter(item.children, depth + 1)}`;
          default:
            throw new Error(`unknown type: ${type}`);
        }
      },
    );

    const spacesBeforBracket = ' '.repeat(depth * depthSpaceCount);
    return `{\n${result.join('\n')}\n${spacesBeforBracket}}`;
  };

  return iter(diff, 0);
};

export default stylish;
