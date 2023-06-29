import path from 'path';
import yargs from 'yargs';

import App from './App';

yargs
  .scriptName('')
  .usage('Usage: **npm** init @ts-defold <project-directory> -- `[options]`')
  .positional('project-directory', {
    describe: 'Empty directory to initialize project in',
    type: 'string',
  })
  .options({
    template: {
      describe: 'Starting template for project',
      type: 'string',
    },
  })
  .command(
    '*',
    'Generate a new project',
    () => null,
    async (argv) => {
      try {
        if (argv._.length == 1) {
          await App(`/project`, {
            dir: path.resolve(
              process.env.INIT_CWD ?? process.cwd(),
              argv._[0].toString()
            ),
            template: argv.template,
          });
        } else {
          await App('/help', { help: await yargs.getHelp() });
        }
      } catch (e) {
        //* ignore
      }
      process.exit(0);
    }
  )
  .version()
  .epilogue(
    'For more information on `templates` see:\n' +
      'https://github.com/ts-defold/create#readme\n'
  )
  .help().argv;
