const base       = require('./base/base.js'),
      files      = require('./base/files'),
      path       = require('path'),
      webpack    = require('webpack'),
      Visualizer = require('webpack-visualizer-plugin');
const vendors = [
  // activate HMR for React
  'react-hot-loader/patch',
  /**
   * babel-polyfill 支持到es5
   * */
  'babel-polyfill',

  // 其他依赖
  'immutable',
  'react',
  'react-dom',
  'react-hot-loader',
  'react-redux',
  'react-router',
  'redux',
  'redux-immutablejs',
  'redux-logger',
  'redux-saga',
  'redux-thunk',
];

module.exports = {
  output: {
    path: files.dllPath,
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.DllPlugin({
      path: path.join(files.dllPath, 'vendors.json'),
      name: '[name]',
      context: '/',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      }
    }),
    new Visualizer({
      filename: './vendors.html'
    })
  ],
};
