import path from 'path';
import yargs from 'yargs';

import App from './App';

yargs
  .scriptName('')
  .usage('Usage: **npm** init @ts-defold <project-directory> `[options]`')
  .positional('project-directory', {
    describe: 'Empty directory to initialize project in',
    type: 'string',
  })
  .options({
    template: {
      describe: 'Starting template for project',
      type: 'string',
    },
    serve: {
      describe: 'Start a dev server and file watcher',
      type: 'boolean',
    },
  })
  .command(
    '*',
    'Generate a new project',
    () => null,
    async (argv) => {
      if (argv._.length == 1) {
        if (argv.serve) {
          App(`/serve`);
        } else {
          App(`/project`, {
            dir: path.resolve(
              process.env.INIT_CWD ?? process.cwd(),
              argv._[0].toString()
            ),
            template: argv.template,
          });
        }
      } else {
        App('/help', { help: await yargs.getHelp() });
      }
    }
  )
  .version()
  .epilogue(
    'For more information on `templates` and the `dev server` see:\n' +
      'https://github.com/ts-defold/create#readme\n'
  )
  .help().argv;
