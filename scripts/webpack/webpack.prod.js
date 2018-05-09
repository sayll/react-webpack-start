const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const help = require('./help')
const core = require('../core')
const webpackBase = require('./webpack.base')

help.removeFiles([core.files.dist])

module.exports = webpackMerge(webpackBase, {
  mode: 'production',
  output: {
    filename: help.assetsPath('js/[name].js?[chunkhash:8]'),
    chunkFilename: help.assetsPath('js/[name].js?[chunkhash:8]'),
    publicPath: core.build.publicPath
  },
  plugins: [
    // 提升作用域
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 修复文件修改后的模块索引id使hash缓存失效
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'md5',
      hashDigest: 'base64',
      hashDigestLength: 4
    })
  ],
  module: {
    rules: []
  },
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        parallel: true,
        uglifyOptions: {
          output: {
            comments: false
          },
          compress: {
            dead_code: true
          }
        }
      })
    ],
    runtimeChunk: true
  }
})