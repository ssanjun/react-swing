'use strict';

/**
 * @project react-swing
 * Created by ssanjun on 2016. 7. 12..
 */

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Stack, Card } from 'swing';


class Swing extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        setStack: PropTypes.func.isRequired,
        tagName: PropTypes.string,
        config: PropTypes.object
    };

    static defaultProps = {
        tagName: 'div'
    };

    constructor(props, context) {
        super(props, context);

        const stack = Stack(props.config);
        this.state = {
            stack: stack,
            cardList: []
        };
    }

    componentDidMount() {
        const events = ['throwout','throwoutend', 'throwoutleft', 'throwoutright', 'throwin', 'throwinend', 'dragstart', 'dragmove','dragend'];
        const stack = this.state.stack;

        events.map((event) => {
            if (this.props[event]) {
                stack.on(event, this.props[event]);
            }
        });

        React.Children.forEach(this.props.children, (child, key) => {
            const ref = child.ref || key;
            const element = ReactDOM.findDOMNode(this.refs[`${ref}`]);
            const card = stack.createCard(element);

            events.map((event) => {
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
        const events = ['throwout','throwoutend', 'throwoutleft', 'throwoutright', 'throwin', 'throwinend', 'dragstart', 'dragmove','dragend'];
        const stack = this.state.stack;
        events.map((event) => {
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
            })

            if(!result){
              events.map((event) => {
                  if (child.props[event]) {
                      console.log("9 fois ?")
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
        const { children, setStack, tagName, config, ...others } = this.props;
        const Tag = tagName;

        return (
            <Tag {...others}>
                {React.Children.map(children, (child, key) => {
                    const ref = child.ref || key;
                    return React.cloneElement(child, {
                        ref: `${ref}`
                    });
                })}
            </Tag>
        )
    }
}

export default Swing;
export { Stack, Card };
