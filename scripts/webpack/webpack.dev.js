const help = require('./help')
const core = require('../core')
const pck = require('../../package')
const webpackMerge = require('webpack-merge')
const webpackBase = require('./webpack.base')

const _ = require('lodash')
const AutoDllPlugin = require('autodll-webpack-plugin')

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  output: {
    filename: help.assetsPath('[name].js'),
    chunkFilename: help.assetsPath('[name].js'),
    publicPath: core.dev.publicPath
  },
  plugins: [
    new AutoDllPlugin({
      inject: true,
      filename: '[name]_[hash].js',
      entry: {
        vendor: Object.keys(pck.dependencies)
          .filter(name => !~_.indexOf(pck.excludeDependencies, name))
      }
    })
  ],
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