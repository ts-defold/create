"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ink_1 = require("ink");
const ink_spinner_1 = __importDefault(require("ink-spinner"));
const react_1 = __importDefault(require("react"));
const Markdown_1 = __importDefault(require("../../components/Markdown"));
function TemplateInfo({ template, active, onCompletion, }) {
    //* Check to see if template is valid
    if (template.isLoading) {
        return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
            react_1.default.createElement(ink_1.Text, null,
                react_1.default.createElement(ink_1.Text, { color: "cyanBright" },
                    react_1.default.createElement(ink_spinner_1.default, { type: "hamburger" })),
                ' ',
                "Getting Template Info")));
    }
    else if (!template.found) {
        if (active)
            onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(false);
        return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
            react_1.default.createElement(ink_1.Text, null,
                react_1.default.createElement(ink_1.Text, { color: "red" }, "\uD800\uDD02"),
                " The template",
                ' ',
                react_1.default.createElement(ink_1.Text, { color: "red" }, template),
                " was not found!"),
            template.match ? (react_1.default.createElement(ink_1.Text, { color: "grey" },
                "Are you looking for ",
                react_1.default.createElement(ink_1.Text, { color: "yellow" }, template.match),
                ' ',
                "instead?")) : (react_1.default.createElement(Markdown_1.default, null, "`Try:` https://github.com/search?q=tsd-template&type=repositories"))));
    }
    //* Template is valid
    if (active)
        onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(true);
    return (react_1.default.createElement(ink_1.Text, null,
        react_1.default.createElement(ink_1.Text, { color: "green" }, "\u2713"),
        " Using project template",
        ' ',
        react_1.default.createElement(ink_1.Text, { color: "green" }, template.name)));
}
exports.default = TemplateInfo;
//# sourceMappingURL=TemplateInfo.js.map