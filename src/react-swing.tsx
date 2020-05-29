/// <reference path="../src/types/swing.d.ts" />

/**
 * @project react-swing
 * Created by ssanjun on 2018. 7. 08..
 */

import React, { useRef, useEffect, forwardRef } from 'react';
import * as swing from 'swing';

interface IReactSwingProps {
  setStack: (stack: swing.Stack) => void;
  config: any;
}

type TReactSwing = React.ForwardRefExoticComponent<IReactSwingProps> & {
  EVENTS: swing.Event[];
  DIRECTION: typeof swing.Direction;
};

const ReactSwing = forwardRef<HTMLDivElement, IReactSwingProps>(({ children, config, setStack, ...restProps }, ref) => {
  const stack = useRef(swing.Stack(config || {})).current;
  const childElements = useRef<React.RefObject<HTMLElement>[]>([]).current;

  React.Children.forEach(children, (_, index) => {
    childElements[index] = React.createRef();
  });

  useEffect(() => {
    // bind events
    ReactSwing.EVENTS.forEach((eventName) => {
      if (typeof restProps[eventName] === 'function') {
        stack.on(eventName, restProps[eventName]);
      }
    });
  }, []);

  useEffect(() => {
    // create card
    React.Children.forEach(children, (child, index) => {
      const element = childElements[index];

      if (element && element.current) {
        const existCard = stack.getCard(element.current);
        if (existCard) {
          existCard.destroy();
        }

        const card = stack.createCard(element.current);

        ReactSwing.EVENTS.forEach((eventName) => {
          if ((child as React.ReactElement<any>).props[eventName]) {
            card.on(eventName, (child as React.ReactElement<any>).props[eventName]);
          }
        });
      }
    });

    if (typeof setStack === 'function') {
      (stack as any).childElements = childElements;
      setStack(stack);
    }
  }, [React.Children.count(children)]);

  const tagProps = Object.keys(restProps).reduce((result, key) => {
    if (ReactSwing.EVENTS.indexOf(key as swing.Event) === -1) {
      result[key] = restProps[key];
    }
    return result;
  }, {});

  return (
    <div {...tagProps} ref={ref}>
      {React.Children.map(children, (child, index) => {
        const childProps = Object.keys((child as React.ReactElement<any>).props).reduce((result, key) => {
          if (ReactSwing.EVENTS.indexOf(key as swing.Event) === -1) {
            result[key] = (child as React.ReactElement<any>).props[key];
          }
          return result;
        }, {});
        (childProps as any).ref = childElements[index];
        return React.createElement((child as React.ReactElement<any>).type, childProps);
      })}
    </div>
  );
}) as TReactSwing;

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

export default ReactSwing;
