import _ from 'lodash';

const stringify = (val) => {
  if (_.isPlainObject(val) || Array.isArray(val)) {
    return '[complex value]';
  }
  if (val === true || val === false) {
    return val;
  }
  return `'${val}'`;
};

const plain = (diff) => {
  const iter = (data, ancestor) => {
    const result = data
      .filter((item) => item.type !== 'unchanged')
      .map(
        (item) => {
          const { key, value, type } = item;
          const newValue = stringify(value);
          const fullKey = ancestor ? `${ancestor}.${key}` : key;

          switch (type) {
            case 'added':
              return `Property '${fullKey}' was added with value: ${newValue}`;
            case 'removed':
              return `Property '${fullKey}' was removed`;
            case 'changed':
              return `Property '${fullKey}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
            case 'complex':
              return iter(item.children, fullKey);
            default:
              throw new Error(`unknown type: ${type}`);
          }
        },
      );

    return result.join('\n');
  };

  return iter(diff, null);
};

export default plain;
