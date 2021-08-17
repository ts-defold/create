"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const node_fetch_1 = __importDefault(require("node-fetch"));
function useFetchTemplate(template) {
    const [archive, setArchive] = react_1.useState({
        isLoading: true,
        found: false,
        match: '',
        url: '',
        name: '',
    });
    react_1.useEffect(() => {
        let pending = true;
        (async () => {
            const slug = (template &&
                (template.startsWith('tsd-template-')
                    ? template
                    : `tsd-template-${template}`)) ||
                'tsd-template';
            const payload = { ...archive, isLoading: false };
            const req = await node_fetch_1.default(`https://api.github.com/search/repositories?q=${slug}&sort=stars`);
            if (req.status === 200) {
                const json = (await req.json());
                const results = json.items.filter((item) => item.name.startsWith('tsd-template'));
                const exact = results.find((item) => item.name === slug);
                const match = (results.length && results[0]) || undefined;
                const url = exact
                    ? exact.archive_url
                        .replace('{archive_format}', 'zipball')
                        .replace('{/ref}', `/${exact.default_branch}`)
                    : '';
                payload.found = !!exact;
                payload.match =
                    !exact && match ? match.name.replace('tsd-template-', '') : '';
                payload.url = url;
                payload.name = exact ? exact.name : template;
            }
            else if (req.status === 403) {
                const reset = req.headers.get('X-RateLimit-Reset');
                if (reset) {
                    payload.found = false;
                    payload.rate = parseInt(reset) - Date.now();
                }
            }
            if (pending)
                setArchive(payload);
        })();
        return () => {
            pending = false;
        };
    }, [template]);
    return archive;
}
exports.default = useFetchTemplate;
//# sourceMappingURL=useFetchTemplate.js.map