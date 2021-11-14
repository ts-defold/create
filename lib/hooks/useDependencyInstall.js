"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const cross_spawn_1 = require("cross-spawn");
function useDependencyInstall(dir) {
    const [install, setInstall] = (0, react_1.useState)({
        isLoading: true,
        complete: false,
        progress: '',
        errors: [],
    });
    (0, react_1.useEffect)(() => {
        var _a;
        let output;
        const child = (0, cross_spawn_1.spawn)('npm', ['ci', '--no-audit', '--no-progress', '--verbose'], {
            cwd: dir,
            stdio: 'pipe',
        });
        function process(data) {
            var _a;
            output += data.toString();
            const lines = output.split('\n');
            if (!output.endsWith('\n'))
                output = (_a = lines.pop()) !== null && _a !== void 0 ? _a : '';
            const module = lines
                .map((l) => l.replace(
            // eslint-disable-next-line no-control-regex
            /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, ''))
                .map((line) => {
                var _a, _b;
                return (_b = (_a = /.*reifyNode:node_modules\/(?<module>[^\s]+)/.exec(line)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b.module;
            })
                .filter((l) => l)
                .pop();
            if (module) {
                setInstall((i) => ({
                    ...i,
                    progress: module,
                }));
            }
        }
        (_a = child.stderr) === null || _a === void 0 ? void 0 : _a.on('data', process);
        child.on('close', (code) => {
            if (code === 0) {
                setInstall((i) => ({
                    ...i,
                    isLoading: false,
                    complete: true,
                }));
            }
            else {
                setInstall((i) => ({
                    ...i,
                    isLoading: false,
                    complete: false,
                    errors: [
                        'Failed to install dependencies',
                        'run npm install for details',
                    ],
                }));
            }
        });
        return () => {
            child.kill();
        };
    }, [dir]);
    return install;
}
exports.default = useDependencyInstall;
//# sourceMappingURL=useDependencyInstall.js.map