const buildObject = (data) => {
  const result = data.reduce(
    (obj, item) => {
      const { key, value, type } = item;

      if (type === 'added') {
        return { ...obj, [`+ ${key}`]: value };
      }
      if (type === 'removed') {
        return { ...obj, [`- ${key}`]: value };
      }
      if (type === 'changed') {
        return { ...obj, [`- ${key}`]: item.oldValue, [`+ ${key}`]: item.newValue };
      }
      if (type === 'unchanged') {
        return { ...obj, [key]: value };
      }

      const newData = item.children;
      return { ...obj, [key]: buildObject(newData) };
    },
    {},
  );

  return result;
};

const json = (diff) => JSON.stringify(buildObject(diff));

export default json;
