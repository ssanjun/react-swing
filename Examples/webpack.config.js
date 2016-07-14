/**
 * @project react-swing
 * Created by ssanjun on 2016. 7. 12..
 */

var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: '#inline-source-map',
    entry: {
        'bundle.js' : [
            './index.js'
        ]
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name]'
    },
    module: {
        loaders: [
            {
                test: /\.js$/, loaders: ['babel'], exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.js']
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};