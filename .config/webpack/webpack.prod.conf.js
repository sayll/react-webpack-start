const rm = require('rimraf')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const cfg = require('../index')
const utils = require('./utils')
const isProduction = utils.isProduction
const baseWebpackConfig = require('./webpack.base.conf')

const webpackConfig = merge(baseWebpackConfig, {
  devtool: utils.isProduction ? false : '#source-map',
  // 性能提示
  performance: {
    hints: 'warning'
  },
  output: {
    path: cfg.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    new ExtractTextPlugin({
      filename: utils.assetsPath('../[name].[contenthash].css')
    }),
    new CopyWebpackPlugin([
      {
        from: utils.resolve(cfg.path.static),
        to: cfg.path.static,
        ignore: ['.*']
      }
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(css|pcss)$/,
        exclude: [utils.resolve(cfg.path.views)],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            query: {
              modules: false,
              outputStyle: 'expanded',
              sourceMap: isProduction
                ? cfg.build.sourceMap
                : cfg.dev.sourceMap,
              sourceMapContents: isProduction
            }
          }, 'postcss-loader']
        })
      },
      {
        test: /\.(css|pcss)$/,
        include: [utils.resolve(cfg.path.views)],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            query: {
              modules: {
                importLoaders: 1,
                localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
              },
              outputStyle: 'expanded',
              sourceMap: isProduction
                ? cfg.build.sourceMap
                : cfg.dev.sourceMap,
              sourceMapContents: isProduction
            }
          }, 'postcss-loader']
        })
      }
    ]
  }
})

// 清除上版本代码
rm(utils.resolve(cfg.path.dist, cfg.build.assetsSubDirectory, '**'), err => {
  if (err) throw err
  rm(utils.resolve(cfg.path.dist, '*.css'), () => {
    // 生产环境
    if (utils.isProduction) {
      webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          },
          sourceMap: cfg.build.sourceMap ? '#source-map' : false
        }),
        new OptimizeCSSPlugin({
          cssProcessorOptions: {
            safe: true
          }
        })
      )
      if (cfg.build.productionGzip) {
        const CompressionWebpackPlugin = require('compression-webpack-plugin')

        webpackConfig.plugins.push(
          new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
              '\\.(' +
              cfg.build.productionGzipExtensions.join('|') +
              ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
          })
        )
      }
      if (cfg.build.bundleAnalyzerReport) {
        const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
        webpackConfig.plugins.push(new BundleAnalyzerPlugin())
      }
    }
    webpack(webpackConfig, function (err, stats) {
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }))
    })
  })
})
