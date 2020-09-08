import commander from 'commander';
import genDiff from './difference.js';

const app = () => {
  const { program } = commander;

  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format [stylish, plain, json]', 'stylish')
    .action((filepath1, filepath2) => {
      if (program.format === 'stylish') {
        console.log(genDiff(filepath1, filepath2));
      } else if (program.format === 'plain') {
        console.log(genDiff(filepath1, filepath2, 'plain'));
      } else if (program.format === 'json') {
        console.log(genDiff(filepath1, filepath2, 'json'));
      } else {
        console.log('no such kind of formatter');
      }
    });

  program.parse(process.argv);
};

export default app;
