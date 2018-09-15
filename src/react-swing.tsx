/// <reference path="../src/types/swing.d.ts" />

/**
 * @project react-swing
 * Created by ssanjun on 2018. 7. 08..
 */

import * as React from 'react';
import * as swing from 'swing';

interface IReactSwingProps {
  children: React.ReactChildren;

  setStack: (stack: swing.Stack) => void;
  config: any;
}

interface IReactSwingState {
  stack: swing.Stack;
  cardList: swing.Card[];
}

class ReactSwing extends React.Component<IReactSwingProps, IReactSwingState> {
  static EVENTS: swing.Event[] = [
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

  static DIRECTION: swing.Direction = swing.Direction as any;

  private childElements: React.RefObject<any>[] = [];
  constructor(props: IReactSwingProps) {
    super(props);

    const stack = swing.Stack(props.config || {});

    React.Children.forEach(props.children, (_, index) => {
      this.childElements[index] = React.createRef();
    });

    this.state = {
      stack,
      cardList: [],
    };
  }

  componentDidMount() {
    const { children } = this.props;
    const { stack } = this.state;

    ReactSwing.EVENTS.forEach(eventName => {
      if (this.props[eventName]) {
        stack.on(eventName, this.props[eventName]);
      }
    });

    React.Children.forEach(children, (child: React.ReactChild, index) => {
      const element = this.childElements[index];

      if (element && element.current) {
        const card = stack.createCard(element.current);

        ReactSwing.EVENTS.forEach(eventName => {
          if ((child as React.ReactElement<any>).props[eventName]) {
            card.on(eventName, (child as React.ReactElement<any>).props[eventName]);
          }
        });
      }
    });

    this.setState({
      stack,
    });

    if (this.props.setStack) {
      this.props.setStack(stack);
    }
  }

  componentDidUpdate(prevProps) {
    const { children } = this.props;

    const currentChildrenCount = React.Children.count(children);
    if (currentChildrenCount > prevProps.children.length) {
      const stack = swing.Stack(this.props.config || {});
      ReactSwing.EVENTS.forEach(eventName => {
        if (this.props[eventName]) {
          stack.on(eventName, this.props[eventName]);
        }
      });

      React.Children.forEach(children, (child: React.ReactChild, index) => {
        const element = this.childElements[index];

        if (element && element.current) {
          const card = stack.createCard(element.current);
          const result = prevProps.children.find(c => {
            return c.key === (child as React.ReactElement<any>).key;
          });

          if (!result) {
            ReactSwing.EVENTS.forEach(eventName => {
              if ((child as React.ReactElement<any>).props[eventName]) {
                card.on(eventName, (child as React.ReactElement<any>).props[eventName]);
              }
            });
          }
        }
      });
      this.setState({
        stack,
      });

      if (this.props.setStack) {
        this.props.setStack(stack);
      }
    }
  }

  render() {
    const { children } = this.props;

    const tagProps = Object.keys(this.props).reduce((result, key) => {
      if (ReactSwing.EVENTS.indexOf(key as swing.Event) === -1) {
        result[key] = this.props[key];
      }
      return result;
    }, {});

    return (
      <div {...tagProps}>
        {React.Children.map(children, (child: React.ReactChild, index) => {
          const childProps = Object.keys((child as React.ReactElement<any>).props).reduce((result, key) => {
            if (ReactSwing.EVENTS.indexOf(key as swing.Event) === -1) {
              result[key] = (child as React.ReactElement<any>).props[key];
            }
            return result;
          }, {});
          (childProps as any).ref = this.childElements[index];
          return React.createElement((child as React.ReactElement<any>).type, childProps);
        })}
      </div>
    );
  }
}

export default ReactSwing;
