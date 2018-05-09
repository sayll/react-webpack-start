const webpackMerge = require('webpack-merge')
const webpackProd = require('./webpack.prod')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = webpackMerge(webpackProd, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})