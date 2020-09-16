import getObject from './parsers.js';
import formatter from './formatters/index.js';
import compareObjects from './compare.js';

const genDiff = (filepath1, filepath2, formatterType = 'stylish') => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);
  const diff = compareObjects(obj1, obj2);

  return formatter(diff, formatterType);
};

export default genDiff;
