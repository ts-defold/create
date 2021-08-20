"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ink_1 = require("ink");
const react_1 = __importDefault(require("react"));
const Markdown_1 = __importDefault(require("../../components/Markdown"));
function NextSteps({ project }) {
    return (react_1.default.createElement(ink_1.Box, { paddingTop: 1, flexDirection: "column" },
        react_1.default.createElement(ink_1.Text, null, "\uD83D\uDE80 Your project is ready to go!"),
        react_1.default.createElement(ink_1.Box, { paddingTop: 1, flexDirection: "column" },
            react_1.default.createElement(ink_1.Text, null, "Next Steps:"),
            react_1.default.createElement(ink_1.Box, { paddingLeft: 2, flexDirection: "column" },
                react_1.default.createElement(Markdown_1.default, null, `cd *${project}*`),
                react_1.default.createElement(Markdown_1.default, null, "**npm** run dev"),
                react_1.default.createElement(Markdown_1.default, null, "Open *./app/game.project* in the Defold editor.")),
            react_1.default.createElement(ink_1.Box, { width: 48, alignItems: "center", flexDirection: "column" },
                react_1.default.createElement(ink_1.Box, { paddingTop: 1, flexDirection: "row" },
                    react_1.default.createElement(ink_1.Text, null, "TypeScript "),
                    react_1.default.createElement(ink_1.Text, { color: "red" }, "\u2764\uFE0F "),
                    react_1.default.createElement(ink_1.Text, null, " Defold"))))));
}
exports.default = NextSteps;
//# sourceMappingURL=NextSteps.js.map