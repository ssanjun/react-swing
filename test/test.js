require('./setup')('<html><body></body></html>');

var jsdom = require('mocha-jsdom');
var assert = require('assert');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe('Testing Swing Component', function() {
    jsdom({ skipWindowCheck: true });

    it('should be rendered', function() {
        var Swing = require('../src/Swing.js').default;
        var component = TestUtils.renderIntoDocument(
            <Swing setStack={()=>{}}>
                <div>♠</div>
            </Swing>
        );

        assert.equal(!!component, true);
    });
});