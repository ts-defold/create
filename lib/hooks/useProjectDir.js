"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const react_1 = require("react");
function useProjectDir(dir) {
    const [results, setResults] = (0, react_1.useState)({
        isLoading: true,
        exists: false,
        isEmpty: false,
        relativePath: '',
        name: '',
    });
    (0, react_1.useEffect)(() => {
        let pending = true;
        (async () => {
            var _a;
            const exists = !!(await new Promise((r) => fs_1.default.access(dir, fs_1.default.constants.F_OK, (e) => r(!e))));
            const stats = {
                isLoading: false,
                exists,
                isEmpty: exists
                    ? await (async () => {
                        const itr = await fs_1.default.promises.opendir(dir);
                        const { done } = await itr[Symbol.asyncIterator]().next();
                        if (!done)
                            itr.close();
                        return !!done;
                    })()
                    : true,
                relativePath: path_1.default.relative((_a = process.env.INIT_CWD) !== null && _a !== void 0 ? _a : process.cwd(), dir),
                name: path_1.default.basename(dir),
            };
            if (pending)
                setResults(stats);
        })();
        return () => {
            pending = false;
        };
    }, [dir]);
    return results;
}
exports.default = useProjectDir;
//# sourceMappingURL=useProjectDir.js.map