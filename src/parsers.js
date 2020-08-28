import yaml from 'js-yaml';
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

  return path.extname(filepath) === '.json' ? JSON.parse(fileContent) : yaml.safeLoad(fileContent);
};

export default getObject;
