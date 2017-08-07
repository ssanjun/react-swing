'use strict';

/**
 * @project react-swing
 * Created by ssanjun on 2016. 7. 12..
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = exports.Stack = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _swing = require('swing');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Swing = function (_Component) {
  _inherits(Swing, _Component);

  function Swing(props, context) {
    _classCallCheck(this, Swing);

    var _this = _possibleConstructorReturn(this, (Swing.__proto__ || Object.getPrototypeOf(Swing)).call(this, props, context));

    var stack = (0, _swing.Stack)(props.config);
    _this.state = {
      stack: stack,
      cardList: []
    };
    return _this;
  }

  _createClass(Swing, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var stack = this.state.stack;

      Swing.EVENTS.map(function (event) {
        if (_this2.props[event]) {
          stack.on(event, _this2.props[event]);
        }
      });

      _react2.default.Children.forEach(this.props.children, function (child, key) {
        var ref = child.ref || key;
        var element = _reactDom2.default.findDOMNode(_this2.refs['' + ref]);
        var card = stack.createCard(element);

        Swing.EVENTS.map(function (event) {
          if (child.props[event]) {
            card.on(event, child.props[event]);
          }
        });
      });

      this.setState({
        stack: stack
      });
      this.props.setStack(stack);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var _this3 = this;

      if (this.props.children.length > prevProps.children.length) {
        var stack = this.state.stack;
        Swing.EVENTS.map(function (event) {
          if (_this3.props[event]) {
            stack.on(event, _this3.props[event]);
          }
        });

        _react2.default.Children.forEach(this.props.children, function (child, key) {
          var ref = child.ref || key;
          var element = _reactDom2.default.findDOMNode(_this3.refs['' + ref]);
          var card = stack.createCard(element);
          var result = prevProps.children.find(function (c) {
            return c.key === child.key;
          });

          if (!result) {
            Swing.EVENTS.map(function (event) {
              if (child.props[event]) {
                card.on(event, child.props[event]);
              }
            });
          }
        });
        this.setState({
          stack: stack
        });
        this.props.setStack(stack);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          setStack = _props.setStack,
          tagName = _props.tagName,
          config = _props.config,
          otherProps = _objectWithoutProperties(_props, ['children', 'setStack', 'tagName', 'config']);

      var Tag = tagName;

      var tagProps = Object.keys(otherProps).reduce(function (result, key, index) {
        if (Swing.EVENTS.indexOf(key) === -1) {
          result[key] = otherProps[key];
        }
        return result;
      }, {});

      return _react2.default.createElement(
        Tag,
        tagProps,
        _react2.default.Children.map(children, function (child, key) {
          var ref = child.ref || key;
          var childProps = Object.keys(child.props).reduce(function (result, key, index) {
            if (Swing.EVENTS.indexOf(key) === -1) {
              result[key] = child.props[key];
            }
            return result;
          }, {});
          childProps.ref = ref;
          return _react2.default.createElement(child.type, childProps);
        })
      );
    }
  }]);

  return Swing;
}(_react.Component);

Swing.propTypes = {
  children: _react.PropTypes.node.isRequired,
  setStack: _react.PropTypes.func.isRequired,
  tagName: _react.PropTypes.string,
  config: _react.PropTypes.object,
  throwout: _react.PropTypes.func,
  throwoutend: _react.PropTypes.func,
  throwoutleft: _react.PropTypes.func,
  throwoutright: _react.PropTypes.func,
  throwin: _react.PropTypes.func,
  throwinend: _react.PropTypes.func,
  dragstart: _react.PropTypes.func,
  dragmove: _react.PropTypes.func,
  dragend: _react.PropTypes.func
};
Swing.defaultProps = {
  tagName: 'div'
};
Swing.EVENTS = ['throwout', 'throwoutend', 'throwoutleft', 'throwoutright', 'throwin', 'throwinend', 'dragstart', 'dragmove', 'dragend'];
exports.default = Swing;
exports.Stack = _swing.Stack;
exports.Card = _swing.Card;
