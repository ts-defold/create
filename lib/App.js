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
const react_router_1 = require("react-router");
const ink_1 = require("ink");
const Help_1 = __importDefault(require("./pages/Help"));
const Project_1 = __importDefault(require("./pages/Project"));
const Serve_1 = __importDefault(require("./pages/Serve"));
const CLI = ({ path, data }) => {
    const { help, dir, template } = react_1.useMemo(() => {
        const { help, dir, template } = data;
        return { help: help !== null && help !== void 0 ? help : '', dir: dir !== null && dir !== void 0 ? dir : '', template: template !== null && template !== void 0 ? template : '' };
    }, [data]);
    return (react_1.default.createElement(ink_1.Box, { width: 80, flexDirection: "column" },
        react_1.default.createElement(react_router_1.MemoryRouter, { initialEntries: [path], initialIndex: 0 },
            react_1.default.createElement(react_router_1.Switch, null,
                react_1.default.createElement(react_router_1.Route, { path: "/help" },
                    react_1.default.createElement(Help_1.default, { text: help })),
                react_1.default.createElement(react_router_1.Route, { path: "/project/:step?" },
                    react_1.default.createElement(Project_1.default, { dir: dir, template: template })),
                react_1.default.createElement(react_router_1.Route, { path: "/serve" },
                    react_1.default.createElement(Serve_1.default, null))))));
};
function App(path, data) {
    ink_1.render(react_1.default.createElement(CLI, { path: path, data: data }));
}
exports.default = App;
//# sourceMappingURL=App.js.map