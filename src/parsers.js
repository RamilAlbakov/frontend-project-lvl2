import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';
import process from 'process';
import path from 'path';

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
  return ini.parse(fileContent);
};

export default getObject;
