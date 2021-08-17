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
const react_router_1 = require("react-router");
const ProjectConfig_1 = __importDefault(require("./ProjectConfig"));
const ProjectDir_1 = __importDefault(require("./ProjectDir"));
const TemplateInfo_1 = __importDefault(require("./TemplateInfo"));
const DownloadTemplate_1 = __importDefault(require("./DownloadTemplate"));
const ExtractTemplate_1 = __importDefault(require("./ExtractTemplate"));
const Wizard_1 = require("../../components/Wizard");
const useGitConfig_1 = __importDefault(require("../../hooks/useGitConfig"));
const useProjectDir_1 = __importDefault(require("../../hooks/useProjectDir"));
const useFetchTemplate_1 = __importDefault(require("../../hooks/useFetchTemplate"));
function Project({ dir, template }) {
    const [config, setConfig] = react_1.useState();
    const [archivePath, setArchivePath] = react_1.useState();
    const history = react_router_1.useHistory();
    const { exit } = ink_1.useApp();
    const { step } = react_router_1.useParams();
    const currentStep = step ? parseInt(step) : 0;
    const { user: author, email } = useGitConfig_1.default();
    const project = useProjectDir_1.default(dir);
    const templateInfo = useFetchTemplate_1.default(template);
    const onWizardNext = (success) => {
        if (success) {
            history.push(`/project/${currentStep + 1}`);
        }
        else {
            exit();
        }
    };
    // TODO: Use project config values
    void config;
    return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
        react_1.default.createElement(Wizard_1.Wizard, { step: currentStep },
            react_1.default.createElement(Wizard_1.Step, { index: 0, name: "Project Directory" },
                react_1.default.createElement(ProjectDir_1.default, { project: project, onCompletion: onWizardNext })),
            react_1.default.createElement(Wizard_1.Step, { index: 1, name: "Template Info" },
                react_1.default.createElement(TemplateInfo_1.default, { template: templateInfo, onCompletion: onWizardNext })),
            react_1.default.createElement(Wizard_1.Step, { index: 2, name: "Project Configuration" },
                react_1.default.createElement(ProjectConfig_1.default, { author: author, email: email, project: project, onConfigured: (v) => setConfig(v), onCompletion: onWizardNext })),
            react_1.default.createElement(Wizard_1.Step, { index: 3, name: "Download Template" },
                react_1.default.createElement(DownloadTemplate_1.default, { url: templateInfo.url, onDownloaded: (f) => setArchivePath(f), onCompletion: onWizardNext })),
            react_1.default.createElement(Wizard_1.Step, { index: 4, name: "Extract Template" }, archivePath && react_1.default.createElement(ExtractTemplate_1.default, { src: archivePath, dest: dir })),
            react_1.default.createElement(Wizard_1.Step, { index: 5, name: "Apply Config" },
                react_1.default.createElement(ink_1.Text, null,
                    react_1.default.createElement(ink_1.Text, { color: "red" }, "\uD800\uDD02"),
                    " Applying Configuration")),
            react_1.default.createElement(Wizard_1.Step, { index: 6, name: "Init Git" },
                react_1.default.createElement(ink_1.Text, null,
                    react_1.default.createElement(ink_1.Text, { color: "red" }, "\uD800\uDD02"),
                    " Initializing Git Repository")))));
}
exports.default = Project;
//# sourceMappingURL=index.js.map