const baseWebpackConfig = require('./webpack.conf.base');
const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseWebpackConfig, {
  plugins: [
  	new webpack.DefinePlugin({
  	  'process.env': {
  	    NODE_ENV: JSON.stringify('production')
  	  }
  	}),
    new UglifyJsPlugin()
  ]
})
