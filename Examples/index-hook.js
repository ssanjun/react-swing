/**
 * @project react-swing
 * Created by ssanjun on 2016. 7. 12..
 */

import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import ReactSwing from '../dist/react-swing.js';

const App = () => {
  const [stack, setStack] = useState(null);
  const [cardCount, setCardCount] = useState(4);
  const stackEl = useRef();

  // throwOut Method
  const throwCard = () => {
    // ReactSwing Card Directions
    console.log('ReactSwing.DIRECTION', ReactSwing.DIRECTION);

    console.log('stack', stack);
    console.log('stack.getConfig', stack.getConfig());
    console.log('stackEl', stackEl);

    // ReactSwing Component Childrens
    const targetEl = stack.childElements[1];
    console.log('targetEl', targetEl);

    if (targetEl && targetEl.current) {
      // stack.getCard
      const card = stack.getCard(targetEl.current);

      console.log('card', card);

      // throwOut method call
      card.throwOut(100, 200, ReactSwing.DIRECTION.RIGHT);
    }
  };

  const addCard = () => {
    setCardCount(cardCount + 1);
  };

  const renderCards = () => {
    const cardData = [
      {
        icon: '♣',
        className: 'clubs',
      },
      {
        icon: '♦',
        className: 'diamonds',
      },
      {
        icon: '♥',
        className: 'hearts',
      },
      {
        icon: '♠',
        className: 'spades',
      },
    ];

    const cards = [];

    for (let i = 0; i < cardCount; i++) {
      const data = cardData[i % cardData.length];

      cards.push(
        <div key={i} className={`card ${data.className}`} ref={`card${i}`}>
          {data.icon}
        </div>,
      );
    }

    return cards;
  };

  return (
    <div>
      <div id="viewport">
        {/*
          ReactSwing Element
        */}
        <ReactSwing
          className="stack"
          setStack={(stack) => setStack(stack)}
          ref={stackEl}
          throwout={(e) => console.log('throwout', e)}
        >
          {/*
              children elements is will be Card
          */}
          {/** 
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
          */}
          {renderCards()}
        </ReactSwing>
      </div>
      <div className="control">
        <button type="button" onClick={throwCard.bind(this)}>
          throw Card
        </button>

        <button type="button" onClick={addCard.bind(this)}>
          add Card
        </button>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
