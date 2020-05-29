/// <reference path="../src/types/swing.d.ts" />
/**
 * @project react-swing
 * Created by ssanjun on 2018. 7. 08..
 */
import React from 'react';
import * as swing from 'swing';
interface IReactSwingProps {
    setStack: (stack: swing.Stack) => void;
    config: any;
}
declare type TReactSwing = React.ForwardRefExoticComponent<IReactSwingProps> & {
    EVENTS: swing.Event[];
    DIRECTION: typeof swing.Direction;
};
declare const ReactSwing: TReactSwing;
export default ReactSwing;
