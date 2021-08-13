"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ink_1 = require("ink");
const react_1 = __importDefault(require("react"));
function DevServer() {
    return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
        react_1.default.createElement(ink_1.Text, { color: "whiteBright" }, "\uD83D\uDE80 watching for changes..."),
        react_1.default.createElement(ink_1.Box, { flexDirection: "column", marginTop: 1 },
            react_1.default.createElement(ink_1.Box, null,
                react_1.default.createElement(ink_1.Text, { color: "green" }, "./src/player.script.ts"),
                react_1.default.createElement(ink_1.Text, { color: "gray" }, " [1.3 Kb] (21ms)")),
            react_1.default.createElement(ink_1.Box, null,
                react_1.default.createElement(ink_1.Text, { color: "green" }, "./src/orbit.script.ts"),
                react_1.default.createElement(ink_1.Text, { color: "gray" }, " [1.3 Kb] (21ms)")),
            react_1.default.createElement(ink_1.Box, null,
                react_1.default.createElement(ink_1.Text, { color: "yellow" }, "./src/hooks.editor_script.ts"),
                react_1.default.createElement(ink_1.Text, { color: "gray" }, " ...")))));
}
exports.default = DevServer;
//# sourceMappingURL=DevServer.js.map