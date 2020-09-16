import _ from 'lodash';

const compareObjects = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2).sort((a, b) => a.localeCompare(b));

  const difference = allKeys.map(
    (key) => {
      const [value1, value2] = [obj1[key], obj2[key]];
      const item = { key };

      if (!keys1.includes(key)) {
        item.type = 'added';
        item.value = value2;
      } else if (!keys2.includes(key)) {
        item.type = 'removed';
        item.value = value1;
      } else if (value1 === value2) {
        item.type = 'unchanged';
        item.value = value1;
      } else if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        item.type = 'complex';
        item.children = compareObjects(value1, value2);
      } else {
        item.type = 'changed';
        item.oldValue = value1;
        item.newValue = value2;
      }
      return item;
    },
  );

  return difference;
};

export default compareObjects;
