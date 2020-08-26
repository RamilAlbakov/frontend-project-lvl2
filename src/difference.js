import fs from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';

const getObject = (filepath) => {
  let fileContent;

  if (filepath.startsWith('/')) {
    fileContent = fs.readFileSync(filepath, 'utf8');
  } else {
    const currentDir = process.cwd();
    const absoluteFilePath = path.resolve(currentDir, filepath);
    fileContent = fs.readFileSync(absoluteFilePath, 'utf8');
  }

  return JSON.parse(fileContent);
};

const getDifference = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = _.union(keys1, keys2).sort((a, b) => a.localeCompare(b));

  const diff = allKeys.reduce((acc, key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      return obj1[key] === obj2[key] ? `${acc}  ${key}: ${obj1[key]}\n  ` : `${acc}- ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}\n  `;
    }
    if (!keys1.includes(key)) {
      return `${acc}+ ${key}: ${obj2[key]}\n  `;
    }
    return `${acc}- ${key}: ${obj1[key]}\n  `;
  }, '');

  return `{\n  ${diff.slice(0, -2)}}`;
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = getObject(filepath1);
  const obj2 = getObject(filepath2);

  return getDifference(obj1, obj2);
};

export default genDiff;
