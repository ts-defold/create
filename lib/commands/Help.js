"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const ink_gradient_1 = __importDefault(require("ink-gradient"));
const ink_big_text_1 = __importDefault(require("ink-big-text"));
const Markdown_1 = __importDefault(require("../components/Markdown"));
const makeGradient = () => {
    const GRADIENT = [
        { h: 0, s: 1, v: 1, a: 1 },
        { h: 90, s: 1, v: 1, a: 1 },
        { h: 180, s: 1, v: 1, a: 1 },
        { h: 270, s: 1, v: 1, a: 1 },
        { h: 360, s: 1, v: 1, a: 1 },
    ];
    const theta = new Date().getSeconds() * 6;
    return GRADIENT.map((stop, index) => ({
        ...stop,
        h: (theta + index * 90) % 360,
    }));
};
function Help({ text }) {
    return (react_1.default.createElement(ink_1.Box, { alignItems: "center", flexDirection: "column" },
        react_1.default.createElement(ink_gradient_1.default, { colors: makeGradient() },
            react_1.default.createElement(ink_big_text_1.default, { text: "TS-DEFOLD", font: "simple3d", letterSpacing: 0, space: false })),
        react_1.default.createElement(ink_1.Box, { flexDirection: "column", paddingTop: 1 },
            react_1.default.createElement(Markdown_1.default, null, text))));
}
exports.default = Help;
//# sourceMappingURL=Help.js.map