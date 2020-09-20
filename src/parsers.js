import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseIni = (data) => {
  const isNumber = (val) => !Number.isNaN(parseFloat(val));

  const changeStrToNum = (obj) => {
    const keys = Object.keys(obj);

    const result = keys.reduce(
      (acc, key) => {
        const val = obj[key];
        if (isNumber(val)) {
          return { ...acc, [key]: parseFloat(val) };
        }
        if (_.isPlainObject(val)) {
          return { ...acc, [key]: changeStrToNum(val) };
        }
        return { ...acc, [key]: val };
      },
      {},
    );

    return result;
  };

  return changeStrToNum(ini.parse(data));
};

const parse = (fileContent, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
      return yaml.safeLoad(fileContent);
    case '.ini':
      return parseIni(fileContent);
    default:
      throw new Error(`unsupported file format: ${format}`);
  }
};

export default parse;
