/**
 * @project react-swing
 * Created by ssanjun on 2016. 7. 16..
 */

module.exports = function(markup) {
  if (typeof document !== 'undefined') return;

  var JSDOM = require('jsdom').JSDOM;

  global.DOM = new JSDOM(markup || '', { url: 'http://localhost' });
  global.window = global.DOM.window;
  global.document = global.DOM.window.document;
  global.navigator = {
    userAgent: 'node.js',
  };
};
