const rm = require('rimraf')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const cfg = require('../index')
const utils = require('./utils')
const isProduction = utils.isProduction

// 清除目录，重新生成
rm(utils.resolve(cfg.path.dist), () => {})

let webpackConfig = {
  output: {
    path: utils.resolve(cfg.path.dll),
    filename: '[name].js',
    library: '[name]'
  },
  entry: {
    vendors: cfg.vendors
  },
  plugins: [
    new webpack.DllPlugin({
      path: utils.resolve(cfg.path.dll, 'vendors.json'),
      name: '[name]',
      context: '/'
    }),
    new webpack.DefinePlugin({
      'NICE_FEATURE': JSON.stringify(isProduction),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new BundleAnalyzerPlugin({
      reportFilename: 'index.html',
      analyzerMode: 'static',
      openAnalyzer: false
    }),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}

if (isProduction) {
  webpackConfig.plugins.unshift(new webpack.optimize.UglifyJsPlugin())
}

module.exports = webpackConfig
