"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const nodegit_1 = __importDefault(require("nodegit"));
function useGitConfig() {
    const [config, setConfig] = (0, react_1.useState)({
        user: '',
        email: '',
    });
    (0, react_1.useEffect)(() => {
        let pending = true;
        (async () => {
            try {
                const config = await nodegit_1.default.Config.openDefault();
                const cfg = {
                    user: (await config.getStringBuf('user.name')).toString(),
                    email: (await config.getStringBuf('user.email')).toString(),
                };
                if (pending)
                    setConfig(cfg);
            }
            catch (e) {
                //! ignore
            }
        })();
        return () => {
            pending = false;
        };
    }, []);
    return config;
}
exports.default = useGitConfig;
//# sourceMappingURL=useGitConfig.js.map