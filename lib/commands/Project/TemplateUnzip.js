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
const ink_spinner_1 = __importDefault(require("ink-spinner"));
const useUnzip_1 = __importDefault(require("../../hooks/useUnzip"));
function TemplateUnzip({ src, dest, remove, active, onCompletion, }) {
    const unzip = (0, useUnzip_1.default)(src, dest, remove);
    (0, react_1.useEffect)(() => {
        if (active) {
            if (unzip.complete) {
                onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(true);
            }
            else if (unzip.error) {
                onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(false);
            }
        }
    }, [unzip, active, onCompletion]);
    if (unzip.isLoading) {
        return (react_1.default.createElement(ink_1.Box, { flexDirection: "row" },
            react_1.default.createElement(ink_1.Text, null,
                react_1.default.createElement(ink_1.Text, { color: "cyanBright" },
                    react_1.default.createElement(ink_spinner_1.default, { type: "hamburger" })),
                ' ',
                "Extracting template",
                ' ',
                unzip.progress && react_1.default.createElement(ink_1.Text, { color: "grey" }, unzip.progress))));
    }
    else if (unzip.error) {
        return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
            react_1.default.createElement(ink_1.Text, null,
                react_1.default.createElement(ink_1.Text, { color: "red" }, "\uD800\uDD02"),
                " Template extraction failed!"),
            react_1.default.createElement(ink_1.Text, { color: "red" },
                '  ',
                unzip.error)));
    }
    return (react_1.default.createElement(ink_1.Text, null,
        react_1.default.createElement(ink_1.Text, { color: "green" }, "\u2713"),
        " Extracted template archive"));
}
exports.default = TemplateUnzip;
//# sourceMappingURL=TemplateUnzip.js.map