const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const cfg = require('../index')
const utils = require('./utils')
const webpackConfig = require('./webpack.base.conf')
// 添加热更新
Object.keys(webpackConfig.entry).forEach(name => {
  webpackConfig.entry[name].unshift(
    'webpack-hot-middleware/client?noInfo=true&reload=true'
    //'eventsource-polyfill' // 热替换兼容IE
  )
})

module.exports = merge(webpackConfig, {
  // cheap-module-eval-source-map is faster for development
  devtool: process.argv.includes('debug') ?
    'cheap-module-source-map' : 'cheap-module-eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // 变异错误不跳出程序
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.(css|pcss)$/,
        exclude: [utils.resolve(cfg.path.views)],
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            minimize: false
          }
        }, 'postcss-loader']
      },
      {
        test: /\.(css|pcss)$/,
        include: [utils.resolve(cfg.path.views)],
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]',
            minimize: false
          }
        }, 'postcss-loader']
      }
    ]
  }
})
