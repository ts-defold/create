"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function useProjectApply(dir, config) {
    const [info, setInfo] = (0, react_1.useState)({
        isLoading: true,
        complete: false,
        error: '',
    });
    (0, react_1.useEffect)(() => {
        let pending = true;
        (async () => {
            try {
                const packageJson = JSON.parse(await fs_1.default.promises.readFile(path_1.default.join(dir, 'package.json'), 'utf8'));
                packageJson.private = true;
                packageJson.name = config.name;
                packageJson.version = config.version;
                packageJson.description = config.description;
                packageJson.author = config.author;
                delete packageJson.repository;
                delete packageJson.license;
                // Use replacer to provide partially ordered keys
                const keyOrder = [
                    'private',
                    'name',
                    'version',
                    'description',
                    'author',
                ];
                const keys = keyOrder.reduce((acc, key) => ({ ...acc, key }), {});
                JSON.stringify(packageJson, (key, value) => {
                    if (!(key in keys))
                        keyOrder.push(key);
                    return value;
                });
                await fs_1.default.promises.writeFile(path_1.default.join(dir, 'package.json'), JSON.stringify(packageJson, keyOrder, 2));
                if (pending) {
                    setInfo((i) => ({ ...i, isLoading: false, complete: true }));
                }
            }
            catch (e) {
                if (pending) {
                    setInfo((i) => ({
                        ...i,
                        isLoading: false,
                        error: e.message,
                    }));
                }
            }
        })();
        return () => {
            pending = false;
        };
    }, [dir, config]);
    return info;
}
exports.default = useProjectApply;
//# sourceMappingURL=useProjectApply.js.map