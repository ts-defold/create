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
function ProjectDir({ project, active, onCompletion, }) {
    react_1.useEffect(() => {
        if (active && !project.isLoading) {
            if (project.exists || !project.isEmpty) {
                onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(false);
            }
            else {
                onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(true);
            }
        }
    }, [project, active, onCompletion]);
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
            react_1.default.createElement(ink_1.Text, { color: "grey" }, "Please choose an empty or new directory for your project.")));
    }
    //* Project directory is valid
    return (react_1.default.createElement(ink_1.Text, null,
        react_1.default.createElement(ink_1.Text, { color: "green" }, "\u2713"),
        " Creating new project in",
        ' ',
        react_1.default.createElement(ink_1.Text, { color: "green" }, project.relativePath)));
}
exports.default = ProjectDir;
//# sourceMappingURL=ProjectDir.js.map