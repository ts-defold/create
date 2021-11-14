"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const rimraf_1 = __importDefault(require("rimraf"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
function useUnzip(src, dest = '', cleanup = false) {
    const [unzip, setUnzip] = (0, react_1.useState)({
        isLoading: true,
        complete: false,
        error: '',
        src,
        dest,
        progress: '',
    });
    (0, react_1.useEffect)(() => {
        let pending = true;
        (async () => {
            const zip = new adm_zip_1.default(src);
            const entries = zip.getEntries();
            const packageEntry = entries.find((entry) => entry.name === 'package.json');
            if (packageEntry) {
                const parts = packageEntry.entryName.split('/');
                const root = (parts.length > 1 ? parts.slice(0, parts.length - 1).join('/') : '') +
                    '/';
                for (let i = 0; i < entries.length; i++) {
                    const entry = entries[i];
                    if (entry.entryName.startsWith(root) &&
                        entry.entryName !== root &&
                        !entry.entryName.endsWith('/')) {
                        const relEntry = entry.entryName.replace(root, '');
                        const destPath = path_1.default.join(dest, path_1.default.dirname(relEntry), '/');
                        (0, fs_1.mkdir)(destPath, { recursive: true }, () => null);
                        if (pending) {
                            setUnzip((z) => ({ ...z, progress: relEntry }));
                            await new Promise((resolve) => setTimeout(resolve, 1));
                        }
                        zip.extractEntryTo(entry.entryName, destPath, false, false);
                    }
                }
                if (cleanup)
                    (0, rimraf_1.default)(src, () => null);
                if (pending) {
                    setUnzip((z) => ({ ...z, isLoading: false, complete: true }));
                }
            }
            else {
                if (cleanup) {
                    (0, rimraf_1.default)(src, () => null);
                    (0, rimraf_1.default)(dest, () => null);
                }
                if (pending) {
                    setUnzip((z) => ({
                        ...z,
                        isLoading: false,
                        error: 'No package.json',
                    }));
                }
            }
        })();
        return () => {
            pending = false;
        };
    }, [src, dest, cleanup]);
    return unzip;
}
exports.default = useUnzip;
//# sourceMappingURL=useUnzip.js.map