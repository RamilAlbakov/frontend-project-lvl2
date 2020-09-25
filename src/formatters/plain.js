import _ from 'lodash';

const stringify = (val) => {
  if (_.isObject(val)) {
    return '[complex value]';
  }
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  return val;
};

const plain = (diff) => {
  const iter = (data, ancestry = null) => {
    const result = data
      .filter((item) => item.type !== 'unchanged')
      .map(
        (item) => {
          const { key, value, type } = item;
          const newValue = stringify(value);
          const newAncestry = ancestry ? `${ancestry}.${key}` : key;

          switch (type) {
            case 'added':
              return `Property '${newAncestry}' was added with value: ${newValue}`;
            case 'removed':
              return `Property '${newAncestry}' was removed`;
            case 'changed':
              return `Property '${newAncestry}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
            case 'complex':
              return iter(item.children, newAncestry);
            default:
              throw new Error(`unknown type: ${type}`);
          }
        },
      );

    return result.join('\n');
  };

  return iter(diff);
};

export default plain;
