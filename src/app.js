import commander from 'commander';
import genDiff from './difference.js';

const showHelp = () => {
  const { program } = commander;

  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => console.log(genDiff(filepath1, filepath2)));

  program.parse(process.argv);
};

export default showHelp;
