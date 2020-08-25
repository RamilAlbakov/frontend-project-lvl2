import commander from 'commander';

const showHelp = () => {
  const { program } = commander;

  program
    .version('1.0.0')
    .description('Compares two configuration files and shows a difference.');

  program.parse(process.argv);
};

export default showHelp;
