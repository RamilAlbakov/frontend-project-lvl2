import _ from 'lodash';

const getFormattedValue = (val) => {
  let newVal;
  if (_.isPlainObject(val) || Array.isArray(val)) {
    newVal = '[complex value]';
  } else if (val !== true && val !== false) {
    newVal = `'${val}'`;
  } else {
    newVal = val;
  }
  return newVal;
};

const plain = (diff, parentKey = null) => {
  const keys = Object.keys(diff);

  const result = keys.reduce(
    (acc, key, i, arr) => {
      const val = diff[key];
      const newValue = getFormattedValue(val);
      const formattedKey = key.startsWith('+ ') || key.startsWith('- ') ? key.slice(2) : key;
      const fullKey = parentKey ? `${parentKey}.${formattedKey}` : formattedKey;

      if (key.startsWith('+ ')) {
        if (arr[i - 1] && formattedKey === arr[i - 1].slice(2)) {
          const previousValue = getFormattedValue(diff[arr[i - 1]]);
          return `${acc}Property '${fullKey}' was updated. From ${previousValue} to ${newValue}\n`;
        }
        return `${acc}Property '${fullKey}' was added with value: ${newValue}\n`;
      }
      if (key.startsWith('- ') && formattedKey !== arr[i + 1].slice(2)) {
        return `${acc}Property '${fullKey}' was removed\n`;
      }
      if (newValue === '[complex value]') {
        return `${acc}${plain(val, fullKey)}\n`;
      }
      return acc;
    },
    '',
  );

  return result
    .split('\n')
    .filter((item) => item !== '')
    .join('\n');
};

export default plain;
