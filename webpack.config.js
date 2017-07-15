var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './stripe/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'stripe.bundle.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
}
