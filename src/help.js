import commander from 'commander';

const showHelp = () => {
  const { program } = commander;

  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.')
    .arguments('<filepath1>, <filepath2>')
    .option('-f, --format [type]', 'output format');

  program.parse(process.argv);
};

export default showHelp;
