import parse from './parsers.js';
import readFile from './readFile.js';
import formatter from './formatters/index.js';
import compareObjects from './compare.js';

const getData = (filepath) => {
  const [fileContent, format] = readFile(filepath);
  return parse(fileContent, format);
};

const genDiff = (filepath1, filepath2, formatterType = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = compareObjects(data1, data2);

  return formatter(diff, formatterType);
};

export default genDiff;
