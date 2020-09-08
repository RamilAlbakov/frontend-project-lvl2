import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import process from 'process';
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

const getObject = (filepath) => {
  let fileContent;

  if (path.isAbsolute(filepath)) {
    fileContent = fs.readFileSync(filepath, 'utf8');
  } else {
    const currentDir = process.cwd();
    const absoluteFilePath = path.resolve(currentDir, filepath);
    fileContent = fs.readFileSync(absoluteFilePath, 'utf8');
  }

  const extName = path.extname(filepath);
  if (extName === '.json') return JSON.parse(fileContent);
  if (extName === '.yml') return yaml.safeLoad(fileContent);
  return changeStrToNum(ini.parse(fileContent));
};

export default getObject;
