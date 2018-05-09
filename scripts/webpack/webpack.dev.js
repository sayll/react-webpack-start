const help = require('./help')
const core = require('../core')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.base')

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  output: {
    filename: help.assetsPath('[name].js'),
    chunkFilename: help.assetsPath('[name].js'),
    publicPath: core.dev.publicPath
  },
  plugins: [],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: help.resolve(core.files.app),
        use: ['eslint-loader']
      }
    ]
  }
})