import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';

const parseIni = (data) => {
  const isNumber = (val) => !Number.isNaN(parseFloat(val));

  const changeStrToNum = (obj) => {
    const result = _.mapValues(obj, (value) => {
      if (isNumber(value)) {
        return parseFloat(value);
      }
      if (_.isObject(value)) {
        return changeStrToNum(value);
      }
      return value;
    });
    return result;
  };

  return changeStrToNum(ini.parse(data));
};

const parse = (fileContent, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(fileContent);
    case 'yml':
    case 'yaml':
      return yaml.safeLoad(fileContent);
    case 'ini':
      return parseIni(fileContent);
    default:
      throw new Error(`unsupported file format: ${format}`);
  }
};

export default parse;
