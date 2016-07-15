# React Swing Component

[![Travis build status](http://img.shields.io/travis/ssanjun/react-swing/master.svg?style=flat-square)](https://travis-ci.org/ssanjun/react-swing)
[![NPM version](http://img.shields.io/npm/v/react-swing.svg?style=flat-square)](https://www.npmjs.org/package/react-swing)

react-swing is a React component for implementing [swing](https://github.com/gajus/swing) easily with React.

![Card stack example.](https://github.com/gajus/swing/blob/master/.README/card-stack.gif)

## Contents
* [Usage Examples](./Examples)
* [Component Props](#component-props)
* [Component Event Props](#component-event-props)
    * [Component Event Props Example](#component-event-props-example)


## Component Props
| Name | Description | type | Default | isRequired |
| --- | :--- | --- | --- | --- |
| `tagName` | Create tag element for stack. | String | div | false |
| `config` | Swing.Stack configuration object. [more information](https://github.com/gajus/swing#configuration) | Object | null | false |
| `setStack` | Bind Swing.Stack instance to object. | function | - | true |

## Component Event Props
| Name | Description |
| --- | :--- |
| `throwout` | When card has been thrown out of the stack. |
| `throwoutend` | When card has been thrown out of the stack and the animation has ended. |
| `throwoutleft` | Shorthand for `throwout` event in the `Card.DIRECTION_LEFT` direction. |
| `throwoutright` | Shorthand for `throwout` event in the `Card.DIRECTION_RIGHT` direction. |
| `throwin` | When card has been thrown into the stack. |
| `throwinend` | When card has been thrown into the stack and the animation has ended. |
| `dragstart` | Hammer [panstart](http://hammerjs.github.io/recognizer-pan/). |
| `dragmove` | Hammer [panmove](http://hammerjs.github.io/recognizer-pan/). |
| `dragend` | Hammer [panend](http://hammerjs.github.io/recognizer-pan/). |
[more information](https://github.com/gajus/swing#events)

### Component Event Props Example
Using 'event name' set Swing Props and passing parameter as function 
```javascript
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
```

## Thankyou for
[https://github.com/gajus](https://github.com/gajus) / [https://github.com/gajus/swing](https://github.com/gajus/swing) 