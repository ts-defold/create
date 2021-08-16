"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const ink_spinner_1 = __importDefault(require("ink-spinner"));
const react_router_1 = require("react-router");
const react_final_form_1 = require("react-final-form");
const semver_1 = __importDefault(require("semver"));
const InputText_1 = __importDefault(require("../../components/InputText"));
const InputError_1 = __importDefault(require("../../components/InputError"));
const Markdown_1 = __importDefault(require("../../components/Markdown"));
const Wizard_1 = require("../../components/Wizard");
const useGitConfig_1 = __importDefault(require("../../hooks/useGitConfig"));
const useProjectDir_1 = __importDefault(require("../../hooks/useProjectDir"));
const useFetchTemplate_1 = __importDefault(require("../../hooks/useFetchTemplate"));
const games = [
    'RPG',
    'Shmup',
    'FPS',
    'Platformer',
    'Tower Defense',
    'Puzzle',
    'Racing',
    'Action',
    'Adventure',
    'Strategy',
    'Simulation',
    'MMORPG',
];
function Project({ dir, template }) {
    const [activeField, setActiveField] = react_1.useState(0);
    const [projectConfigured, setProjectConfigured] = react_1.useState(false);
    const { step } = react_router_1.useParams();
    const history = react_router_1.useHistory();
    const { exit } = ink_1.useApp();
    const { user: author, email } = useGitConfig_1.default();
    const project = useProjectDir_1.default(dir);
    const archive = useFetchTemplate_1.default(template);
    const fields = react_1.useMemo(() => {
        return [
            {
                name: 'name',
                label: 'Project Name',
                validate: (value) => {
                    if (!value) {
                        return 'Required';
                    }
                },
                format: (value) => value
                    ? value
                        .toLowerCase()
                        .replace(/[^a-z \\-]/g, '')
                        .replace(/ /g, '-')
                    : '',
                placeholder: project.name || 'my-awesome-game',
            },
            {
                name: 'version',
                label: 'Version',
                placeholder: '0.1.0',
                format: (value) => value === undefined ? '' : value.replace(/[^0-9.]/g, ''),
                validate: (value) => !value
                    ? 'Required'
                    : semver_1.default.valid(value)
                        ? undefined
                        : 'Invalid semantic version',
            },
            {
                name: 'description',
                label: 'Description',
                placeholder: `My Awesome ${games[Math.trunc(Math.random() * games.length - 1)]} Game!`,
                format: (value) => (value === undefined ? '' : value),
                validate: (value) => (!value ? 'Required' : undefined),
            },
            {
                name: 'author',
                label: 'Author',
                placeholder: author + (email ? ` <${email}>` : ''),
                format: (value) => (value === undefined ? '' : value),
                validate: (value) => (!value ? 'Required' : undefined),
            },
        ];
    }, [author, email, project]);
    const onSubmit = async (values) => {
        function timeout(ms) {
            return new Promise((resolve) => setTimeout(resolve, ms));
        }
        void values;
        // TODO: Fetch template archive, extract, and use values to update package.json
        setProjectConfigured(true);
        for (let i = 1; i <= 4; i++) {
            await timeout(1000);
            history.push(`/project/${i}`);
        }
        setTimeout(() => exit(), 3000);
    };
    //* Check if project directory is valid
    if (project.isLoading) {
        return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
            react_1.default.createElement(ink_1.Text, null,
                react_1.default.createElement(ink_1.Text, { color: "cyanBright" },
                    react_1.default.createElement(ink_spinner_1.default, { type: "hamburger" })),
                ' ',
                "Checking project directory")));
    }
    else if (project.exists || !project.isEmpty) {
        return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
            react_1.default.createElement(ink_1.Text, null,
                react_1.default.createElement(ink_1.Text, { color: "red" }, "\uD800\uDD02"),
                " Project directory at",
                ' ',
                react_1.default.createElement(ink_1.Text, { color: "red" }, project.relativePath || '.'),
                " already exists!"),
            react_1.default.createElement(ink_1.Text, { color: "grey" },
                '  ',
                "Please choose an empty or new directory for your project.")));
    }
    const Project = () => (react_1.default.createElement(ink_1.Text, null,
        react_1.default.createElement(ink_1.Text, { color: "green" }, "\u2713"),
        " Creating new project in",
        ' ',
        react_1.default.createElement(ink_1.Text, { color: "green" }, project.relativePath)));
    //* Check to see if template is valid
    if (archive.isLoading) {
        return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
            react_1.default.createElement(Project, null),
            react_1.default.createElement(ink_1.Text, null,
                react_1.default.createElement(ink_1.Text, { color: "cyanBright" },
                    react_1.default.createElement(ink_spinner_1.default, { type: "hamburger" })),
                ' ',
                "Getting Template Info")));
    }
    else if (!archive.found) {
        return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
            react_1.default.createElement(Project, null),
            react_1.default.createElement(ink_1.Text, null,
                react_1.default.createElement(ink_1.Text, { color: "red" }, "\uD800\uDD02"),
                " The template",
                ' ',
                react_1.default.createElement(ink_1.Text, { color: "red" }, template),
                " was not found!"),
            archive.match ? (react_1.default.createElement(ink_1.Text, { color: "grey" },
                "Are you looking for ",
                react_1.default.createElement(ink_1.Text, { color: "yellow" }, archive.match),
                ' ',
                "instead?")) : (react_1.default.createElement(Markdown_1.default, null, "`Try:` https://github.com/search?q=tsd-template&type=repositories"))));
    }
    const Template = () => (react_1.default.createElement(ink_1.Text, null,
        react_1.default.createElement(ink_1.Text, { color: "green" }, "\u2713"),
        " Using project template",
        ' ',
        react_1.default.createElement(ink_1.Text, { color: "green" }, archive.name)));
    return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
        react_1.default.createElement(Project, null),
        react_1.default.createElement(Template, null),
        react_1.default.createElement(react_final_form_1.Form, { mutators: {
                setValue: ([field, value], state, { changeValue }) => {
                    changeValue(state, field, () => value);
                },
            }, onSubmit: onSubmit, initialValues: {
                ...fields.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {}),
            }, render: ({ handleSubmit }) => (react_1.default.createElement(ink_1.Box, { flexDirection: "column" }, fields.map(({ name, label, placeholder, format, validate }, index) => (react_1.default.createElement(react_final_form_1.Field, { name: name, key: name, format: format, validate: validate }, ({ input, meta }) => (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
                react_1.default.createElement(ink_1.Box, null,
                    react_1.default.createElement(ink_1.Text, { bold: activeField === index },
                        react_1.default.createElement(ink_1.Text, { color: meta.error && !meta.pristine
                                ? 'red'
                                : meta.valid
                                    ? 'green'
                                    : 'cyanBright' }, activeField === index
                            ? '❯ '
                            : meta.touched
                                ? '✓ '
                                : '  '),
                        `${label}: `),
                    activeField === index ? (react_1.default.createElement(InputText_1.default, { ...input, tabComplete: true, placeholder: placeholder, onSubmit: () => {
                            if (meta.valid && !meta.validating) {
                                setActiveField((value) => value + 1);
                                if (activeField === fields.length - 1) {
                                    handleSubmit();
                                }
                            }
                        } })) : (react_1.default.createElement(ink_1.Text, { color: !meta.touched || !input.value ? 'gray' : undefined }, input.value || placeholder)),
                    meta.validating && name === 'name' && (react_1.default.createElement(ink_1.Box, { marginLeft: 1 },
                        react_1.default.createElement(ink_1.Text, { color: "yellow" },
                            react_1.default.createElement(ink_spinner_1.default, { type: "dots" }))))),
                meta.error && meta.touched && !meta.pristine && (react_1.default.createElement(ink_1.Box, { paddingLeft: 2 },
                    react_1.default.createElement(InputError_1.default, null, meta.error)))))))))) }),
        projectConfigured && (react_1.default.createElement(Wizard_1.Wizard, { step: step ? parseInt(step) : -1 },
            react_1.default.createElement(Wizard_1.Step, { index: 1, name: "Download Template" },
                react_1.default.createElement(ink_1.Text, null,
                    react_1.default.createElement(ink_1.Text, { color: "cyanBright" },
                        react_1.default.createElement(ink_spinner_1.default, { type: "hamburger" })),
                    ' ',
                    "Downloading template")),
            react_1.default.createElement(Wizard_1.Step, { index: 2, name: "Extract Template" },
                react_1.default.createElement(ink_1.Text, null,
                    react_1.default.createElement(ink_1.Text, { color: "red" }, "\uD800\uDD02"),
                    " Extracting template")),
            react_1.default.createElement(Wizard_1.Step, { index: 3, name: "Apply Config" },
                react_1.default.createElement(ink_1.Text, null,
                    react_1.default.createElement(ink_1.Text, { color: "red" }, "\uD800\uDD02"),
                    " Applying Configuration")),
            react_1.default.createElement(Wizard_1.Step, { index: 4, name: "Init Git" },
                react_1.default.createElement(ink_1.Text, null,
                    react_1.default.createElement(ink_1.Text, { color: "red" }, "\uD800\uDD02"),
                    " Initializing Git Repository"))))));
}
exports.default = Project;
//# sourceMappingURL=index.js.map