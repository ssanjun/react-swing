require('./setup')('<html><body></body></html>');

var assert = require('assert');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-dom/test-utils');

describe('Testing Swing Component', function () {
  it('should be rendered', function () {
    var ReactSwing = require('../dist/react-swing').default;
    var component = TestUtils.renderIntoDocument(
      <div>
        <ReactSwing className="react-swing">
          <div>♠</div>
        </ReactSwing>
      </div>,
    );

    const reactSwingNode = ReactDOM.findDOMNode(component.childNodes[0]);
    expect(reactSwingNode.className).toBe('react-swing');
  });
});
