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
const Router_1 = require("../components/Router");
const ink_gradient_1 = __importDefault(require("ink-gradient"));
const ink_big_text_1 = __importDefault(require("ink-big-text"));
const GRADIENT = [
    { h: 0, s: 1, v: 1, a: 1 },
    { h: 90, s: 1, v: 1, a: 1 },
    { h: 180, s: 1, v: 1, a: 1 },
    { h: 270, s: 1, v: 1, a: 1 },
    { h: 360, s: 1, v: 1, a: 1 },
];
function Help() {
    const [gradient, setGradient] = react_1.useState(GRADIENT);
    const { help } = Router_1.useData();
    react_1.useEffect(() => {
        const theta = new Date().getSeconds() * 6;
        setGradient(GRADIENT.map((stop, index) => ({
            ...stop,
            h: (theta + index * 90) % 360,
        })));
    }, []);
    return (react_1.default.createElement(ink_1.Box, { alignItems: "center", flexDirection: "column" },
        react_1.default.createElement(ink_gradient_1.default, { colors: gradient },
            react_1.default.createElement(ink_big_text_1.default, { text: "TS-DEFOLD", font: "simple3d", letterSpacing: 0, space: false })),
        react_1.default.createElement(ink_1.Box, { flexDirection: "column", paddingTop: 1 },
            react_1.default.createElement(ink_1.Text, null, help))));
}
exports.default = Help;
//# sourceMappingURL=Help.js.map