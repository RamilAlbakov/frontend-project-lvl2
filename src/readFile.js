import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const absoluteFilePath = path.resolve(filepath);
  const fileContent = fs.readFileSync(absoluteFilePath, 'utf8');
  const extName = path.extname(filepath);

  return [fileContent, extName];
};

export default readFile;
