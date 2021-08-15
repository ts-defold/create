"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = exports.Wizard = void 0;
const react_1 = __importDefault(require("react"));
function Wizard({ children, step, exclusive, }) {
    const matches = [];
    react_1.default.Children.forEach(children, (child) => {
        var _a;
        if (react_1.default.isValidElement(child)) {
            const tl = (_a = child.props.index) !== null && _a !== void 0 ? _a : Number.MAX_VALUE;
            const match = exclusive
                ? tl == step
                    ? child
                    : null
                : tl <= step
                    ? child
                    : null;
            if (match)
                matches.push(match);
        }
    });
    if (exclusive) {
        return matches.length > 0
            ? react_1.default.cloneElement(matches[0], { step, active: true })
            : null;
    }
    return (react_1.default.createElement(react_1.default.Fragment, null, matches.map((match, index) => react_1.default.cloneElement(match, {
        step,
        key: index,
        active: match.props.index == step,
        complete: match.props.index < step,
    }))));
}
exports.Wizard = Wizard;
function Step({ children, active, complete }) {
    const childrenWithProps = react_1.default.Children.map(children, (child) => {
        if (react_1.default.isValidElement(child)) {
            return react_1.default.cloneElement(child, { active, complete });
        }
        return child;
    });
    return react_1.default.createElement(react_1.default.Fragment, null, childrenWithProps);
}
exports.Step = Step;
//# sourceMappingURL=Wizard.js.map