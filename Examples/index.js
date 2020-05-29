/**
 * @project react-ReactSwing
 * Created by ssanjun on 2016. 7. 12..
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ReactSwing from '../dist/react-swing.js';

class App extends Component {
  stackEl = React.createRef();

  constructor(props, context) {
    super(props, context);

    // An instance of the Stack
    this.state = {
      stack: null,
    };
  }

  // throwOut Method
  throwCard() {
    // ReactSwing Card Directions
    console.log('ReactSwing.DIRECTION', ReactSwing.DIRECTION);

    console.log('this.state.stack', this.state.stack);
    console.log('this.state.stack.getConfig', this.state.stack.getConfig());
    console.log('this.stackEl', this.stackEl);

    // ReactSwing Component Childrens
    const targetEl = this.stackEl.current.childElements[1];
    console.log('targetEl', targetEl);

    if (targetEl && targetEl.current) {
      // stack.getCard
      const card = this.state.stack.getCard(targetEl.current);

      console.log('card', card);

      // throwOut method call
      card.throwOut(100, 200, ReactSwing.DIRECTION.RIGHT);
    }
  }

  render() {
    return (
      <div>
        <div id="viewport">
          {/*
            ReactSwing Element
          */}
          <ReactSwing
            className="stack"
            tagName="div"
            setStack={(stack) => this.setState({ stack })}
            ref={this.stackEl}
            throwout={(e) => console.log('throwout', e)}
          >
            {/*
                children elements is will be Card
            */}
            <div className="card clubs" ref="card1" throwout={(e) => console.log('card throwout', e)}>
              ♣
            </div>
            <div className="card diamonds" ref="card2">
              ♦
            </div>
            <div className="card hearts" ref="card3">
              ♥
            </div>
            <div className="card spades" ref="card4">
              ♠
            </div>
          </ReactSwing>
        </div>
        <div className="control">
          <button type="button" onClick={this.throwCard.bind(this)}>
            throw Card
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
