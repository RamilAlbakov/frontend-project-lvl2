import _ from 'lodash';

const compareObjects = (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));

  const difference = keys.map(
    (key) => {
      const value1 = obj1[key];
      const value2 = obj2[key];

      if (!_.has(obj1, key)) {
        return { key, value: value2, type: 'added' };
      }
      if (!_.has(obj2, key)) {
        return { key, value: value1, type: 'removed' };
      }
      if (_.isObject(value1) && _.isObject(value2)) {
        return { key, type: 'complex', children: compareObjects(value1, value2) };
      }
      if (value1 !== value2) {
        return {
          key, type: 'changed', oldValue: value1, newValue: value2,
        };
      }
      return { key, value: value1, type: 'unchanged' };
    },
  );

  return difference;
};

export default compareObjects;
