"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_markdown_1 = __importDefault(require("ink-markdown"));
const chalk_1 = __importDefault(require("chalk"));
function Markdown({ children, ...props }) {
    return (react_1.default.createElement(ink_markdown_1.default, { html: chalk_1.default.cyan, link: chalk_1.default.blueBright, strong: chalk_1.default.green, em: chalk_1.default.yellowBright, codespan: chalk_1.default.dim, ...props }, children));
}
exports.default = Markdown;
//# sourceMappingURL=Markdown.js.map