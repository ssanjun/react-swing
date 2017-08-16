/**
 * @project react-swing
 * Created by ssanjun on 2016. 7. 12..
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Swing, { Stack, Card, Direction } from '../dist/Swing.js';

class App extends Component {

    constructor(props, context) {
        super(props, context);

        // An instance of the Stack
        this.state = {
            stack: null
        };
    }

    // throwOut Method
    throwCard() {
        // Swing Card Directions
        console.log('Swing.DIRECTION', Swing.DIRECTION);

        // Swing Component Childrens refs
        const target = this.refs.stack.refs.card2;

        // get Target Dom Element
        const el = ReactDOM.findDOMNode(target);

        // stack.getCard
        const card = this.state.stack.getCard(el);

        // throwOut method call
        card.throwOut(100, 200, Swing.DIRECTION.RIGHT);
    }
    
    render() {
        return (
            <div>
                <div id="viewport">
                    {/*
                        Swing Element
                    */}
                    <Swing
                        className="stack"
                        tagName="div"
                        setStack={(stack)=> this.setState({stack:stack})}
                        ref="stack"
                        throwout={(e)=>console.log('throwout',e)}
                    >
                        {/*
                            children elements is will be Card
                        */}
                        <div className="card clubs" ref="card1" throwout={(e)=>console.log('card throwout',e)}>♣</div>
                        <div className="card diamonds" ref="card2">♦</div>
                        <div className="card hearts" ref="card3">♥</div>
                        <div className="card spades" ref="card4">♠</div>
                    </Swing>
                </div>
                <div className="control">
                    <button type="button" onClick={this.throwCard.bind(this)}>
                        throw Card
                    </button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));