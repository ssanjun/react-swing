# React Swing Component

react-swing is a React component for implementing [swing](https://github.com/gajus/swing) easily with React.

![Card stack example.](https://github.com/gajus/swing/blob/master/.README/card-stack.gif)

## Contents
* [Usage Examples](./Examples)
* [Component Props](#component-props)
* [Component Event Props](#component-event-props)


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

## Thankyou for
[gajus](https://github.com/gajus)