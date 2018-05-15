const help = require('./help')
const core = require('../core')
const HTMLPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

module.exports = {
  entry: core.entry,
  devtool: core.devtool,
  externals: core.externals,
  resolve: {
    alias: core.alias,
    extensions: ['.js', '.jsx', '.json', '.css', '.scss']
  },
  plugins: [
    help.HappyPack('Babel', ['babel-loader']),
    new MiniCssExtractPlugin({
      filename: help.assetsPath('../[name].css'),
      chunkFilename: help.assetsPath('../[name].css')
    }),
    new HTMLPlugin({
      template: help.resolve(core.files.html),
      hash: false,
      inject: true
    }),
    new HardSourceWebpackPlugin({
      checkSyntacticErrors: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['happypack/loader?id=Babel']
      },
      {
        test: /\.(css|scss)$/,
        exclude: [help.resolve(core.files.view)],
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(css|scss)$/,
        include: [help.resolve(core.files.view)],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]_[hash:base64:6]',
              minimize: false
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 4096,
            name: help.assetsPath('images/[name].[hash:8].[ext]')
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: help.assetsPath('files/[name].[hash:8].[ext]')
          }
        }]
      }
    ]
  }
}