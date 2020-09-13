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

const getPlainKey = (key) => (key.startsWith('+ ') || key.startsWith('- ') ? key.slice(2) : key);

const getKeyStatus = (key, keys) => {
  if (key.startsWith('+ ')) {
    const updatedKey = `- ${getPlainKey(key)}`;
    return keys.includes(updatedKey) ? 'updated' : 'added';
  }
  if (key.startsWith('- ')) {
    const updatedKey = `+ ${getPlainKey(key)}`;
    if (!keys.includes(updatedKey)) return 'removed';
  }
  return 'unchanged';
};

const plain = (diff, parentKey = null) => {
  const keys = Object.keys(diff);

  const result = keys.reduce(
    (acc, key) => {
      const val = diff[key];
      const formattedValue = getFormattedValue(val);
      const plainKey = getPlainKey(key);
      const fullKey = parentKey ? `${parentKey}.${plainKey}` : plainKey;
      const keyStatus = getKeyStatus(key, keys);

      if (keyStatus === 'added') {
        return `${acc}Property '${fullKey}' was added with value: ${formattedValue}\n`;
      }
      if (keyStatus === 'updated') {
        const updatedKey = `- ${getPlainKey(key)}`;
        const previousValue = getFormattedValue(diff[updatedKey]);
        return `${acc}Property '${fullKey}' was updated. From ${previousValue} to ${formattedValue}\n`;
      }
      if (keyStatus === 'removed') {
        return `${acc}Property '${fullKey}' was removed\n`;
      }
      if (formattedValue === '[complex value]') {
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
