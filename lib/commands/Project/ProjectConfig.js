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
const react_final_form_1 = require("react-final-form");
const semver_1 = __importDefault(require("semver"));
const InputText_1 = __importDefault(require("../../components/InputText"));
const InputError_1 = __importDefault(require("../../components/InputError"));
function ProjectConfig({ author, email, project, active, onConfigured, onCompletion, }) {
    const [activeField, setActiveField] = react_1.useState(0);
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
    const onSubmit = (values) => {
        onConfigured === null || onConfigured === void 0 ? void 0 : onConfigured(values);
        if (active)
            onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(true);
    };
    return (react_1.default.createElement(react_final_form_1.Form, { onSubmit: onSubmit, initialValues: {
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
                react_1.default.createElement(InputError_1.default, null, meta.error)))))))))) }));
}
exports.default = ProjectConfig;
const games = [
    'RPG',
    'SHMUP',
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
    'Battle Royal',
];
//# sourceMappingURL=ProjectConfig.js.map