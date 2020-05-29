# React Swing Component

[![Travis build status](http://img.shields.io/travis/ssanjun/react-swing/master.svg?style=flat-square)](https://travis-ci.org/ssanjun/react-swing)
[![NPM version](http://img.shields.io/npm/v/react-swing.svg?style=flat-square)](https://www.npmjs.org/package/react-swing)

react-swing is a React component for implementing [swing](https://github.com/gajus/swing) easily with React. (Examples: [http://ssanjun.github.io/examples/react-swing](http://ssanjun.github.io/examples/react-swing))

![Card stack example.](https://github.com/gajus/swing/blob/master/.README/card-stack.gif)

## Contents

- [Usage Examples](./Examples)
- [Component Props](#component-props)
- [Component Event Props](#component-event-props)
  - [Component Event Props Example](#component-event-props-example)
- [Troubleshooting](#troubleshooting)

## React Version Compatibility

### >= 16.8 React with hook

This package is compatible with **React 16.8** and higher.

```
npm install --save react-swing@^3.0.0
```

### >= 16.3 React

This package is compatible with **React 16.3.0** and higher.

```
npm install --save react-swing@^2.0.0
```

### >= 15.3 React < 16.0

This package is compatible with **React 15.3.0** up to **React 16.0.0**.

```
npm install --save react-swing@^1.0.0
```

### < 15.3 React

This package is compatible with **React 15.3.0** and lower.

```
npm install --save react-swing@0.0.9
```

## Component Props

| Name          | Description                                                                                        | type       | Default | isRequired | support          |
| ------------- | :------------------------------------------------------------------------------------------------- | ---------- | ------- | ---------- | ---------------- |
| ~~`tagName`~~ | ~~Create tag element for stack.~~                                                                  | ~~String~~ | ~~div~~ | ~~false~~  | deprecated 3.0.0 |
| `config`      | Swing.Stack configuration object. [more information](https://github.com/gajus/swing#configuration) | Object     | null    | false      |
| `setStack`    | Bind Swing.Stack instance to object.                                                               | function   | -       | true       |

## Component Event Props

| Name            | Description                                                             |
| --------------- | :---------------------------------------------------------------------- |
| `throwout`      | When card has been thrown out of the stack.                             |
| `throwoutend`   | When card has been thrown out of the stack and the animation has ended. |
| `throwoutleft`  | Shorthand for `throwout` event in the `Card.DIRECTION_LEFT` direction.  |
| `throwoutright` | Shorthand for `throwout` event in the `Card.DIRECTION_RIGHT` direction. |
| `throwin`       | When card has been thrown into the stack.                               |
| `throwinend`    | When card has been thrown into the stack and the animation has ended.   |
| `dragstart`     | Hammer [panstart](http://hammerjs.github.io/recognizer-pan/).           |
| `dragmove`      | Hammer [panmove](http://hammerjs.github.io/recognizer-pan/).            |
| `dragend`       | Hammer [panend](http://hammerjs.github.io/recognizer-pan/).             |

[more information](https://github.com/gajus/swing#events)

### Component Event Props Example

Using 'event name' set Swing Props and passing parameter as function
more details

- [react functional component example (v.3.0.0 higher)](https://github.com/ssanjun/react-swing/blob/master/Examples/index-hook.js)
- [react class component example (v. 2.0.1)](https://github.com/ssanjun/react-swing/blob/master/Examples/index.js)

```javascript
<Swing
  className="stack"
  tagName="div"
  setStack={(stack) => this.setState({ stack: stack })}
  ref="stack"
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
</Swing>
```

## Troubleshooting

### project/node_modules/hammerjs/hammer.js:2643 })(window, document, 'Hammer');

```
    /project/node_modules/hammerjs/hammer.js:2643
    })(window, document, 'Hammer');
       ^

    ReferenceError: window is not defined
        at Object.<anonymous> (/Users/ssanjun/Documents/project/quizz/node_modules/hammerjs/hammer.js:2643:4)
        at Module._compile (module.js:541:32)
        at Module._extensions..js (module.js:550:10)
        at Object.require.extensions.(anonymous function) [as .js] (/Users/ssanjun/Documents/project/quizz/node_modules/babel-register/lib/node.js:166:7)
        at Module.load (module.js:458:32)
        at tryModuleLoad (module.js:417:12)
        at Function.Module._load (module.js:409:3)
        at Module.require (module.js:468:17)
        at require (internal/module.js:20:19)
        at Object.<anonymous> (/Users/ssanjun/Documents/project/quizz/node_modules/swing/dist/card.js:19:17)
```

it is react Server Side Rendering Problem of hammer.js in swing.
check the [this issue](https://github.com/hammerjs/hammer.js/pull/973). it will be update.

### Solved

```javascript
    ...
    // component Mounted
    componentDidMount() {
        this.setState({
            mounted: true
        });
    }

    ...

    // render
    render() {
        return (
            { data && (() => {
                    if (this.state.mounted) {
                        const Swing = require('react-swing').default;
                        return (
                            <Swing setStack={(stack)=>this.stack = stack}>
                                { data.list.map((l) => <div>{l.a}</div>) }
                            </Swing>
                        );
                    }
                })()
            }
        )
    }
```

lazy-loading 'react-swing' component.
it will be work.

## Thank you for

[https://github.com/gajus](https://github.com/gajus) / [https://github.com/gajus/swing](https://github.com/gajus/swing)
