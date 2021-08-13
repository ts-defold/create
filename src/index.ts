import path from 'path';
import yargs from 'yargs';

import App from './App';

yargs
  .scriptName('')
  .usage('Usage: npm init @ts-defold <project-directory> [options]')
  .positional('project-directory', {
    describe: 'Empty directory to initialize project in',
    type: 'string',
  })
  .options({
    template: {
      describe: 'Starting template for project',
      default: 'ts-defold',
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
          App(`/project-generator/${argv.template}`, {
            dir: path.resolve(
              process.env.INIT_CWD ?? process.cwd(),
              argv._[0].toString()
            ),
          });
        }
      } else {
        App('/help', { help: await yargs.getHelp() });
      }
    }
  )
  .version()
  .help().argv;
