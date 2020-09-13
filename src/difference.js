import _ from 'lodash';
import getObject from './parsers.js';
import formatter from './formatters/index.js';

const getObjsDiff = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2).sort((a, b) => a.localeCompare(b));

  const difference = allKeys.reduce(
    (diff, key) => {
      const val1 = obj1[key];
      const val2 = obj2[key];

      if (!keys1.includes(key)) {
        return { ...diff, [`+ ${key}`]: obj2[key] };
      }
      if (!keys2.includes(key)) {
        return { ...diff, [`- ${key}`]: obj1[key] };
      }
      if (val1 === val2) {
        return { ...diff, [key]: obj1[key] };
      }
      if (_.isPlainObject(val1) && _.isPlainObject(val2)) {
        return { ...diff, [key]: getObjsDiff(val1, val2) };
      }
      return { ...diff, [`- ${key}`]: obj1[key], [`+ ${key}`]: obj2[key] };
    },
    {},
  );

  return difference;
};

const genDiff = (filepath1, filepath2, formatterType = 'stylish') => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const diff = getObjsDiff(obj1, obj2);

  return formatter(diff, formatterType);
};

export default genDiff;
