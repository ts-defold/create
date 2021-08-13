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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const ink_1 = require("ink");
const Router_1 = require("./components/Router");
const Demo = () => {
    const { exit } = ink_1.useApp();
    ink_1.useInput((input) => {
        if (input === 'q') {
            exit();
        }
        else if (input === 't') {
            setRoute((r) => (r === 'test' ? 'help' : 'test'));
        }
    });
    const [route, setRoute] = react_1.useState('test');
    return (react_1.default.createElement(Router_1.Switch, { route: route },
        react_1.default.createElement(Router_1.Route, { path: "help" },
            react_1.default.createElement(ink_1.Text, { color: "cyanBright" }, "Hello World")),
        react_1.default.createElement(Router_1.Route, { path: "test" },
            react_1.default.createElement(ink_1.Text, { color: "greenBright" }, "Hello World")),
        react_1.default.createElement(ink_1.Text, { color: "white" }, "Press 'q' to quit")));
};
function create() {
    ink_1.render(react_1.default.createElement(Demo, null));
}
exports.default = create;
//# sourceMappingURL=create.js.map