require('./setup')('<html><body></body></html>');

var assert = require('assert');
var React = require('react');
var TestUtils = require('react-dom/test-utils');

describe('Testing Swing Component', function() {
  it('should be rendered', function() {
    var ReactSwing = require('../dist/react-swing').default;
    var component = TestUtils.renderIntoDocument(
      <ReactSwing>
        <div>♠</div>
      </ReactSwing>,
    );

    expect(TestUtils.isCompositeComponent(component)).toBeTruthy();
  });
});
