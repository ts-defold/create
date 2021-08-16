"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ink_1 = require("ink");
const ink_spinner_1 = __importDefault(require("ink-spinner"));
const react_1 = __importDefault(require("react"));
function ProjectDir({ project, active, onCompletion, }) {
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
        if (active)
            onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(false);
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
    //* Project directory is valid
    if (active)
        onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(true);
    return (react_1.default.createElement(ink_1.Text, null,
        react_1.default.createElement(ink_1.Text, { color: "green" }, "\u2713"),
        " Creating new project in",
        ' ',
        react_1.default.createElement(ink_1.Text, { color: "green" }, project.relativePath)));
}
exports.default = ProjectDir;
//# sourceMappingURL=ProjectDir.js.map