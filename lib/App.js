"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const ink_1 = require("ink");
const Router_1 = require("./components/Router");
const Help_1 = __importDefault(require("./pages/Help"));
const Project_1 = __importDefault(require("./pages/Project"));
const Serve_1 = __importDefault(require("./pages/Serve"));
const CLI = ({ path, data }) => {
    return (react_1.default.createElement(ink_1.Box, { width: 80, flexDirection: "column" },
        react_1.default.createElement(Router_1.Switch, { route: path, data: data },
            react_1.default.createElement(Router_1.Route, { path: "/help" },
                react_1.default.createElement(Help_1.default, null)),
            react_1.default.createElement(Router_1.Route, { path: "/project" },
                react_1.default.createElement(Project_1.default, null)),
            react_1.default.createElement(Router_1.Route, { path: "/serve" },
                react_1.default.createElement(Serve_1.default, null)))));
};
function App(path, data) {
    ink_1.render(react_1.default.createElement(CLI, { path: path, data: data }));
}
exports.default = App;
//# sourceMappingURL=App.js.map