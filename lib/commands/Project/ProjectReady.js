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
const ink_1 = require("ink");
const react_1 = __importStar(require("react"));
const Markdown_1 = __importDefault(require("../../components/Markdown"));
function ProjectReady({ project, active, onCompletion, }) {
    (0, react_1.useEffect)(() => {
        if (active)
            onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(true);
    }, [active, onCompletion]);
    return (react_1.default.createElement(ink_1.Box, { paddingTop: 1, flexDirection: "column" },
        react_1.default.createElement(ink_1.Text, null, "\uD83D\uDE80 Your project is ready to go!"),
        react_1.default.createElement(ink_1.Box, { paddingTop: 1, flexDirection: "column" },
            react_1.default.createElement(ink_1.Text, null, "Next Steps:"),
            react_1.default.createElement(ink_1.Box, { paddingLeft: 2, flexDirection: "column" },
                react_1.default.createElement(Markdown_1.default, null, `cd *${project}*`),
                react_1.default.createElement(Markdown_1.default, null, "**npm** run dev"),
                react_1.default.createElement(Markdown_1.default, null, "Open *app/game.project* in the Defold editor.")),
            react_1.default.createElement(ink_1.Box, { width: 46, alignItems: "center", flexDirection: "column" },
                react_1.default.createElement(ink_1.Box, { paddingTop: 1, flexDirection: "row" },
                    react_1.default.createElement(ink_1.Text, null, "TypeScript "),
                    react_1.default.createElement(ink_1.Text, { color: "red" }, "\u2764\uFE0F "),
                    react_1.default.createElement(ink_1.Text, null, " Defold"))))));
}
exports.default = ProjectReady;
//# sourceMappingURL=ProjectReady.js.map