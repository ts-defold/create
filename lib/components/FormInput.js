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
const ink_text_input_1 = __importDefault(require("ink-text-input"));
function FormInput({ onFocus, onBlur, ...props }) {
    (0, react_1.useEffect)(() => {
        onFocus === null || onFocus === void 0 ? void 0 : onFocus();
        return onBlur === null || onBlur === void 0 ? void 0 : onBlur();
    }, [onFocus, onBlur]);
    return react_1.default.createElement(ink_text_input_1.default, { ...props, showCursor: true });
}
exports.default = FormInput;
//# sourceMappingURL=FormInput.js.map