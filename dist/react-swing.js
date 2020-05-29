"use strict";
/// <reference path="../src/types/swing.d.ts" />
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @project react-swing
 * Created by ssanjun on 2018. 7. 08..
 */
var react_1 = __importStar(require("react"));
var swing = __importStar(require("swing"));
var ReactSwing = react_1.forwardRef(function (_a, ref) {
    var children = _a.children, config = _a.config, setStack = _a.setStack, restProps = __rest(_a, ["children", "config", "setStack"]);
    var stack = react_1.useRef(swing.Stack(config || {})).current;
    var childElements = react_1.useRef([]).current;
    react_1.default.Children.forEach(children, function (_, index) {
        childElements[index] = react_1.default.createRef();
    });
    react_1.useEffect(function () {
        // bind events
        ReactSwing.EVENTS.forEach(function (eventName) {
            if (typeof restProps[eventName] === 'function') {
                stack.on(eventName, restProps[eventName]);
            }
        });
    }, []);
    react_1.useEffect(function () {
        // create card
        react_1.default.Children.forEach(children, function (child, index) {
            var element = childElements[index];
            if (element && element.current) {
                var existCard = stack.getCard(element.current);
                if (existCard) {
                    existCard.destroy();
                }
                var card_1 = stack.createCard(element.current);
                ReactSwing.EVENTS.forEach(function (eventName) {
                    if (child.props[eventName]) {
                        card_1.on(eventName, child.props[eventName]);
                    }
                });
            }
        });
        if (typeof setStack === 'function') {
            stack.childElements = childElements;
            setStack(stack);
        }
    }, [react_1.default.Children.count(children)]);
    var tagProps = Object.keys(restProps).reduce(function (result, key) {
        if (ReactSwing.EVENTS.indexOf(key) === -1) {
            result[key] = restProps[key];
        }
        return result;
    }, {});
    return (react_1.default.createElement("div", __assign({}, tagProps, { ref: ref }), react_1.default.Children.map(children, function (child, index) {
        var childProps = Object.keys(child.props).reduce(function (result, key) {
            if (ReactSwing.EVENTS.indexOf(key) === -1) {
                result[key] = child.props[key];
            }
            return result;
        }, {});
        childProps.ref = childElements[index];
        return react_1.default.createElement(child.type, childProps);
    })));
});
ReactSwing.EVENTS = [
    'throwout',
    'throwoutend',
    'throwoutleft',
    'throwoutright',
    'throwin',
    'throwinend',
    'dragstart',
    'dragmove',
    'dragend',
];
ReactSwing.DIRECTION = swing.Direction;
exports.default = ReactSwing;
//# sourceMappingURL=react-swing.js.map