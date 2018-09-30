"use strict";
/// <reference path="../src/types/swing.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @project react-swing
 * Created by ssanjun on 2018. 7. 08..
 */
var React = require("react");
var swing = require("swing");
var ReactSwing = /** @class */ (function (_super) {
    __extends(ReactSwing, _super);
    function ReactSwing(props) {
        var _this = _super.call(this, props) || this;
        _this.childElements = [];
        var stack = swing.Stack(props.config || {});
        React.Children.forEach(props.children, function (_, index) {
            _this.childElements[index] = React.createRef();
        });
        _this.state = {
            stack: stack,
            cardList: [],
        };
        return _this;
    }
    ReactSwing.prototype.componentDidMount = function () {
        var _this = this;
        var children = this.props.children;
        var stack = this.state.stack;
        ReactSwing.EVENTS.forEach(function (eventName) {
            if (_this.props[eventName]) {
                stack.on(eventName, _this.props[eventName]);
            }
        });
        React.Children.forEach(children, function (child, index) {
            var element = _this.childElements[index];
            if (element && element.current) {
                var card_1 = stack.createCard(element.current);
                ReactSwing.EVENTS.forEach(function (eventName) {
                    if (child.props[eventName]) {
                        card_1.on(eventName, child.props[eventName]);
                    }
                });
            }
        });
        this.setState({
            stack: stack,
        });
        if (this.props.setStack) {
            this.props.setStack(stack);
        }
    };
    ReactSwing.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var children = this.props.children;
        var currentChildrenCount = React.Children.count(children);
        if (currentChildrenCount > prevProps.children.length) {
            var stack_1 = swing.Stack(this.props.config || {});
            ReactSwing.EVENTS.forEach(function (eventName) {
                if (_this.props[eventName]) {
                    stack_1.on(eventName, _this.props[eventName]);
                }
            });
            React.Children.forEach(children, function (child, index) {
                var element = _this.childElements[index];
                if (element && element.current) {
                    var card_2 = stack_1.createCard(element.current);
                    var result = prevProps.children.find(function (c) {
                        return c.key === child.key;
                    });
                    if (!result) {
                        ReactSwing.EVENTS.forEach(function (eventName) {
                            if (child.props[eventName]) {
                                card_2.on(eventName, child.props[eventName]);
                            }
                        });
                    }
                }
            });
            this.setState({
                stack: stack_1,
            });
            if (this.props.setStack) {
                this.props.setStack(stack_1);
            }
        }
    };
    ReactSwing.prototype.render = function () {
        var _this = this;
        // tslint:disable-next-line
        var _a = this.props, children = _a.children, setStack = _a.setStack, config = _a.config, restProps = __rest(_a, ["children", "setStack", "config"]);
        var tagProps = Object.keys(restProps).reduce(function (result, key) {
            if (ReactSwing.EVENTS.indexOf(key) === -1) {
                result[key] = restProps[key];
            }
            return result;
        }, {});
        return (React.createElement("div", __assign({}, tagProps), React.Children.map(children, function (child, index) {
            var childProps = Object.keys(child.props).reduce(function (result, key) {
                if (ReactSwing.EVENTS.indexOf(key) === -1) {
                    result[key] = child.props[key];
                }
                return result;
            }, {});
            childProps.ref = _this.childElements[index];
            return React.createElement(child.type, childProps);
        })));
    };
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
    return ReactSwing;
}(React.Component));
exports.default = ReactSwing;
//# sourceMappingURL=react-swing.js.map