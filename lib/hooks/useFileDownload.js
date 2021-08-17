"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const node_fetch_1 = __importDefault(require("node-fetch"));
const fs_1 = __importDefault(require("fs"));
const tmp_promise_1 = __importDefault(require("tmp-promise"));
function useFileDownload(url, file = '') {
    const [download, setDownload] = react_1.useState({
        isLoading: true,
        complete: false,
        error: '',
        progress: 0,
        total: 0,
        url,
        file,
    });
    react_1.useEffect(() => {
        let pending = true;
        (async () => {
            const req = await node_fetch_1.default(url);
            if (req.status === 200) {
                const dest = file ? file : (await tmp_promise_1.default.file()).path;
                const stream = fs_1.default.createWriteStream(dest);
                //* total size
                if (pending) {
                    setDownload((a) => ({
                        ...a,
                        file: dest,
                        total: Number(req.headers.get('content-length') || 1),
                    }));
                }
                //* progress
                req.body.on('data', (chunk) => {
                    stream.write(chunk);
                    if (pending) {
                        setDownload((a) => ({
                            ...a,
                            progress: a.progress + chunk.length,
                        }));
                    }
                });
                //* complete
                req.body.on('end', () => {
                    stream.close();
                    if (pending) {
                        setDownload((a) => ({
                            ...a,
                            isLoading: false,
                            complete: true,
                            progress: a.total > 0 ? a.total : a.progress,
                        }));
                    }
                });
            }
            else {
                if (pending) {
                    setDownload((a) => ({
                        ...a,
                        isLoading: false,
                        error: `${req.status} ${req.statusText}`,
                    }));
                }
            }
        })();
        return () => {
            pending = false;
        };
    }, [url, file]);
    return download;
}
exports.default = useFileDownload;
//# sourceMappingURL=useFileDownload.js.map