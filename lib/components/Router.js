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
exports.useData = exports.useArgs = exports.Route = exports.Switch = void 0;
const react_1 = __importStar(require("react"));
const Router = react_1.createContext({});
function Switch({ children, route, data }) {
    const [, path, ...args] = route ? route.split('/') : [];
    let match = null;
    react_1.default.Children.forEach(children, (child) => {
        var _a, _b;
        if (match == null && react_1.default.isValidElement(child)) {
            const tl = (_b = (_a = child.props) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : '';
            match = tl == `/${path}` ? child : null;
        }
    });
    return (react_1.default.createElement(Router.Provider, { value: { path, args, data } }, match ? react_1.default.cloneElement(match, { route }) : null));
}
exports.Switch = Switch;
function Route({ children, }) {
    return react_1.default.createElement(react_1.default.Fragment, null, children);
}
exports.Route = Route;
function useArgs() {
    var _a, _b;
    return (_b = (_a = react_1.useContext(Router)) === null || _a === void 0 ? void 0 : _a.args) !== null && _b !== void 0 ? _b : [];
}
exports.useArgs = useArgs;
function useData() {
    var _a, _b;
    return (_b = (_a = react_1.useContext(Router)) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : null;
}
exports.useData = useData;
//# sourceMappingURL=Router.js.map