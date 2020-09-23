import fs from 'fs';
import path from 'path';

const readFile = (filepath) => {
  const absoluteFilePath = path.resolve(filepath);
  const fileContent = fs.readFileSync(absoluteFilePath, 'utf8');
  const format = path.extname(filepath).slice(1);

  return [fileContent, format];
};

export default readFile;
