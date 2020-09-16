import _ from 'lodash';

const getFormattedValue = (val) => {
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
          const newValue = getFormattedValue(value);
          const fullKey = ancestor ? `${ancestor}.${key}` : key;

          if (type === 'added') {
            return `Property '${fullKey}' was added with value: ${newValue}`;
          }
          if (type === 'removed') {
            return `Property '${fullKey}' was removed`;
          }
          if (type === 'changed') {
            return `Property '${fullKey}' was updated. From ${getFormattedValue(item.oldValue)} to ${getFormattedValue(item.newValue)}`;
          }
          const newData = item.children;
          return iter(newData, fullKey);
        },
      );

    return result.join('\n');
  };

  return iter(diff, null);
};

export default plain;
