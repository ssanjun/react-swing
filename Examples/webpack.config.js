/**
 * @project react-swing
 * Created by ssanjun on 2016. 7. 12..
 */

var webpack = require('webpack');
var path = require('path');

module.exports = {
  mode: 'development',
  devtool: '#inline-source-map',
  entry: {
    'bundle.js': ['./index.js'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [new webpack.NoEmitOnErrorsPlugin()],
};
