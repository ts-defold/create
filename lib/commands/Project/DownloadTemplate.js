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
const Markdown_1 = __importDefault(require("../../components/Markdown"));
const useFileDownload_1 = __importDefault(require("../../hooks/useFileDownload"));
function DownloadTemplate({ url, active, onDownloaded, onCompletion, }) {
    const download = useFileDownload_1.default(url);
    const label = 'Downloading template ';
    react_1.useEffect(() => {
        if (active) {
            if (download.complete) {
                onDownloaded === null || onDownloaded === void 0 ? void 0 : onDownloaded(download.file);
                onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(true);
            }
            else if (download.error) {
                onCompletion === null || onCompletion === void 0 ? void 0 : onCompletion(false);
            }
        }
    }, [download, active]);
    if (download.isLoading) {
        return (react_1.default.createElement(ink_1.Box, { flexDirection: "row" },
            react_1.default.createElement(ink_1.Text, null,
                react_1.default.createElement(ink_1.Text, { color: "cyanBright" },
                    react_1.default.createElement(ink_spinner_1.default, { type: "hamburger" })),
                ' ',
                label,
                react_1.default.createElement(ink_1.Text, { color: "grey" }, `${Number(download.progress / 1024).toFixed(2)} KB`))));
    }
    else if (download.error) {
        return (react_1.default.createElement(ink_1.Box, { flexDirection: "column" },
            react_1.default.createElement(ink_1.Text, null,
                react_1.default.createElement(ink_1.Text, { color: "red" }, "\uD800\uDD02"),
                " Template download failed!"),
            react_1.default.createElement(ink_1.Text, { color: "red" },
                '  ',
                download.error),
            react_1.default.createElement(Markdown_1.default, null, `\`URL\`: ${url}`)));
    }
    return (react_1.default.createElement(ink_1.Text, null,
        react_1.default.createElement(ink_1.Text, { color: "green" }, "\u2713"),
        " Downloaded template archive"));
}
exports.default = DownloadTemplate;
//# sourceMappingURL=DownloadTemplate.js.map