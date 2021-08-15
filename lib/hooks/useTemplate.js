"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useTemplate(template, delay = 500) {
    const [archive, setArchive] = react_1.useState({
        isLoading: true,
        found: false,
        match: '',
        archive: '',
        name: '',
    });
    react_1.useEffect(() => {
        (async () => {
            setArchive({
                isLoading: false,
                found: false,
                match: '',
                archive: '',
                name: '',
            });
        })();
    }, [template, delay]);
    return archive;
}
exports.default = useTemplate;
//# sourceMappingURL=useTemplate.js.map