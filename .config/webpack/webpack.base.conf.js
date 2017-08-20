const webpack = require('webpack')
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

const cfg = require('../index')
const utils = require('./utils')
const isProduction = utils.isProduction

module.exports = {
  entry: Object.assign(
    utils.getEntries(utils.resolve(cfg.path.views), `**/*.${cfg.JsType}`), {
      main: [
        utils.resolve(cfg.path.app, `index.${cfg.JsType}`),
        utils.resolve(cfg.path.assets, `css/index.${cfg.CssType}`),
        utils.resolve(cfg.path.assets, `js/index.${cfg.JsType}`)
      ]
    }),
  output: {
    path: cfg.build.assetsRoot,
    filename: isProduction ?
      '[name].[chunkhash:8].js' : '[name].[hash:8].js',
    publicPath: isProduction
      ? cfg.build.assetsPublicPath
      : cfg.dev.assetsPublicPath,
    chunkFilename: isProduction ?
      'async/[name].[chunkhash:8].js' : 'async/[name].[hash:8].js'
  },
  resolve: {
    alias: {
      '@': utils.resolve(cfg.path.app),
      '@utils': utils.resolve(cfg.path.utils),
      '@assets': utils.resolve(cfg.path.assets),
      '@index': utils.resolve(cfg.path.views, 'index'),
      '@components': utils.resolve(cfg.path.components)
    },
    extensions: ['.js', '.jsx', '.json']
    // modules: [utils.resolve('../node_modules'), 'node_modules'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 5, // 必须大于或等于 1
      minChunkSize: 1000
    }),
    new webpack.ProvidePlugin({
      //_map: ['lodash', 'map']
    }),
    //new webpack.optimize.ModuleConcatenationPlugin(),
    utils.cHappyPack('ESLint', ['eslint-loader']),
    utils.cHappyPack('Js', ['babel-loader'])
  ],
  module: {
    noParse: /jquery/,
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['happypack/loader?id=ESLint'],
        include: [utils.resolve(cfg.path.app)],
        exclude: file => !!file.match(/node_modules/),
        enforce: 'pre'
      },
      {
        test: /\.(js|jsx)$/,
        include: [utils.resolve(cfg.path.app)],
        exclude: file => !!file.match(/node_modules/),
        use: ['happypack/loader?id=Js']
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          query: {
            limit: 10240,
            name: utils.assetsPath('images/[name].[hash:8].[ext]')
          }
        }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          query: {
            limit: 10240,
            name: utils.assetsPath('fonts/[name].[hash:8].[ext]')
          }
        }
      }
    ]
  }
}

// 不是测试环境，则添加依赖
if (process.env.BABEL_ENV !== 'test') {
  const pages = utils.getEntries(utils.resolve(cfg.path.views), '**/*.html')
  utils.createPages(module.exports.plugins, pages)
  module.exports.plugins.push(
    new webpack.DllReferencePlugin({
      context: '/',
      manifest: require(utils.resolve(cfg.path.dll, `vendors.json`))
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: [`${cfg.path.dll.replace(`${cfg.path.dist}/`, '')}/vendors.js`],
      append: false,
      hash: true
    })
  )
}
