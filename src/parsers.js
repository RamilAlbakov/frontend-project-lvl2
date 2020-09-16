import yaml from 'js-yaml';
import ini from 'ini';
import _ from 'lodash';
import readFile from './readFile.js';

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

const parseFileContent = (fileContent, extName) => {
  switch (extName) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
      return yaml.safeLoad(fileContent);
    case '.ini':
      return changeStrToNum(ini.parse(fileContent));
    default:
      throw new Error('unsupported file format');
  }
};

const getObject = (filepath) => {
  const [fileContent, extName] = readFile(filepath);
  return parseFileContent(fileContent, extName);
};

export default getObject;
