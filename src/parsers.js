import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';

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

const getFileContent = (filepath) => {
  const absoluteFilePath = path.resolve(filepath);
  return fs.readFileSync(absoluteFilePath, 'utf8');
};

const getObject = (filepath) => {
  const fileContent = getFileContent(filepath);
  const extName = path.extname(filepath);

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

export default getObject;
