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
declare class ReactSwing extends React.Component<IReactSwingProps, IReactSwingState> {
    static EVENTS: swing.Event[];
    static DIRECTION: swing.Direction;
    private childElements;
    constructor(props: IReactSwingProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    render(): JSX.Element;
}
export default ReactSwing;
