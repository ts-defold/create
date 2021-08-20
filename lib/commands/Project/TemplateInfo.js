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
const Markdown_1 = __importDefault(require("../../components/Markdown"));
function TemplateInfo({ template, active, onCompletion, }) {
    react_1.useEffect(() => {
        if (active && !template.isLoading) {
            onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(template.found);
        }
    }, [template, active, onCompletion]);
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
        if (template.rate) {
            return (react_1.default.createElement(ink_1.Text, null,
                react_1.default.createElement(ink_1.Text, { color: "red" }, "\uD800\uDD02"),
                " The api is rate limited, try again in",
                ' ',
                react_1.default.createElement(ink_1.Text, { color: "yellow" }, Math.ceil(template.rate / 60)),
                ' ',
                Math.ceil(template.rate / 60) > 1 ? 'minutes' : 'minute'));
        }
        else {
            return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
                react_1.default.createElement(ink_1.Text, null,
                    react_1.default.createElement(ink_1.Text, { color: "red" }, "\uD800\uDD02"),
                    " The template",
                    ' ',
                    react_1.default.createElement(ink_1.Text, { color: "red" }, template.name),
                    " was not found!"),
                template.match ? (react_1.default.createElement(ink_1.Text, { color: "grey" },
                    "Are you looking for ",
                    react_1.default.createElement(ink_1.Text, { color: "yellow" }, template.match),
                    ' ',
                    "instead?")) : (react_1.default.createElement(Markdown_1.default, null, "`Try:` https://github.com/search?q=tsd-template&type=repositories"))));
        }
    }
    //* Template is valid
    return (react_1.default.createElement(ink_1.Text, null,
        react_1.default.createElement(ink_1.Text, { color: "green" }, "\u2713"),
        " Using project template",
        ' ',
        react_1.default.createElement(ink_1.Text, { color: "green" }, template.name)));
}
exports.default = TemplateInfo;
//# sourceMappingURL=TemplateInfo.js.map