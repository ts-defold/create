"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ink_1 = require("ink");
const react_1 = __importDefault(require("react"));
const Router_1 = require("../components/Router");
function ProjectGenerator() {
    const [template] = Router_1.useArgs();
    const { dir } = Router_1.useData();
    return (react_1.default.createElement(ink_1.Box, { paddingTop: 1, flexDirection: "column", alignItems: "center" },
        react_1.default.createElement(ink_1.Box, { flexDirection: "column", alignItems: "center", borderStyle: "bold", borderColor: "magentaBright", flexGrow: 1, paddingX: 1 },
            react_1.default.createElement(ink_1.Text, { color: "greenBright" }, "Project Generator"),
            react_1.default.createElement(ink_1.Text, { color: "cyanBright" },
                "Template: ",
                template),
            react_1.default.createElement(ink_1.Text, { color: "yellowBright" },
                "Path: ",
                dir))));
}
exports.default = ProjectGenerator;
//# sourceMappingURL=ProjectGenerator.js.map