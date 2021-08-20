"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const cross_spawn_1 = require("cross-spawn");
function useDependencyInstall(dir) {
    const [install, setInstall] = react_1.useState({
        isLoading: true,
        complete: false,
        progress: '',
        errors: [],
    });
    react_1.useEffect(() => {
        var _a;
        let stdout, stderr;
        const child = cross_spawn_1.spawn('npm', ['ci', '--no-audit', '--no-progress', '--verbose'], {
            cwd: dir,
            stdio: 'pipe',
        });
        function process(data) {
            var _a;
            stdout += data.toString();
            const lines = stdout.split('\n');
            if (!stdout.endsWith('\n'))
                stdout = (_a = lines.pop()) !== null && _a !== void 0 ? _a : '';
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
                setInstall({
                    ...install,
                    isLoading: false,
                    complete: true,
                });
            }
            else {
                setInstall({
                    ...install,
                    isLoading: false,
                    complete: false,
                    errors: stderr.split('\n'),
                });
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