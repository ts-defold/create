"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const yargs_1 = __importDefault(require("yargs"));
const App_1 = __importDefault(require("./App"));
yargs_1.default
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
    .command('*', 'Generate a new project', () => null, async (argv) => {
    var _a;
    if (argv._.length == 1) {
        if (argv.serve) {
            App_1.default(`/serve`);
        }
        else {
            App_1.default(`/project/${argv.template}`, {
                dir: path_1.default.resolve((_a = process.env.INIT_CWD) !== null && _a !== void 0 ? _a : process.cwd(), argv._[0].toString()),
            });
        }
    }
    else {
        App_1.default('/help', { help: await yargs_1.default.getHelp() });
    }
})
    .version()
    .epilogue('For more information on `templates` and the `dev server` see:\n' +
    'https://github.com/ts-defold/create#readme\n')
    .help().argv;
//# sourceMappingURL=index.js.map