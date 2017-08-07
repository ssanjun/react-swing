'use strict';

/**
 * @project react-swing
 * Created by ssanjun on 2016. 7. 12..
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Stack, Card } from 'swing';


class Swing extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    setStack: PropTypes.func.isRequired,
    tagName: PropTypes.string,
    config: PropTypes.object,
    throwout: PropTypes.func,
    throwoutend: PropTypes.func,
    throwoutleft: PropTypes.func,
    throwoutright: PropTypes.func,
    throwin: PropTypes.func,
    throwinend: PropTypes.func,
    dragstart: PropTypes.func,
    dragmove: PropTypes.func,
    dragend: PropTypes.func
  };

  static defaultProps = {
      tagName: 'div'
  };

  static EVENTS = ['throwout','throwoutend', 'throwoutleft', 'throwoutright', 'throwin', 'throwinend', 'dragstart', 'dragmove','dragend'];

  constructor(props, context) {
    super(props, context);

    const stack = Stack(props.config);
    this.state = {
      stack: stack,
      cardList: []
    };
  }

  componentDidMount() {
    const stack = this.state.stack;

    Swing.EVENTS.map((event) => {
      if (this.props[event]) {
        stack.on(event, this.props[event]);
      }
    });

    React.Children.forEach(this.props.children, (child, key) => {
      const ref = child.ref || key;
      const element = ReactDOM.findDOMNode(this.refs[`${ref}`]);
      const card = stack.createCard(element);

      Swing.EVENTS.map((event) => {
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

  componentDidUpdate(prevProps, prevState){
    if(this.props.children.length > prevProps.children.length){
      const stack = this.state.stack;
        Swing.EVENTS.map((event) => {
          if (this.props[event]) {
            stack.on(event, this.props[event]);
          }
      });

      React.Children.forEach(this.props.children, (child, key) => {
        const ref = child.ref || key;
        const element = ReactDOM.findDOMNode(this.refs[`${ref}`]);
        const card = stack.createCard(element);
        let result = prevProps.children.find((c) => {
          return c.key === child.key
        });

        if(!result){
          Swing.EVENTS.map((event) => {
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

  render() {
    const { children, setStack, tagName, config, ...otherProps } = this.props;
    const Tag = tagName;

    const tagProps = Object.keys(otherProps).reduce((result, key, index) => {
      if (Swing.EVENTS.indexOf(key) === -1) {
        result[key] = otherProps[key];
      }
      return result;
    }, {});

    return (
      <Tag {...tagProps}>
        {React.Children.map(children, (child, key) => {
          const ref = child.ref || key;
          const childProps = Object.keys(child.props).reduce((result, key, index) => {
            if (Swing.EVENTS.indexOf(key) === -1) {
              result[key] = child.props[key];
            }
            return result;
          }, {});
          childProps.ref = ref;
          return React.createElement(child.type, childProps);
        })}
      </Tag>
    );
  }
}

export default Swing;
export { Stack, Card };
