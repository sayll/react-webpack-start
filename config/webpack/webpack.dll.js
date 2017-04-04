const base       = require('./base/base.js'),
      files      = require('./base/files'),
      path       = require('path'),
      webpack    = require('webpack'),
      Visualizer = require('webpack-visualizer-plugin');
const vendors = [
  // 'react-hot-loader/patch',
  'react-hot-loader',
  /**
   * babel-polyfill 支持到es5
   * */
  'babel-polyfill',

  // 其他依赖
  'immutable',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
  'redux-immutablejs',
  'redux-logger',
  'redux-observable',
  'rxjs',
];

let config = {
  output: {
    path: files.dllPath,
    filename: '[name].js',
    library: '[name]',
  },
  entry: {
    vendor: vendors,
  },
  plugins: [
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

if(process.env.NODE_ENV === 'production'){
  config.plugins.unshift(new webpack.optimize.UglifyJsPlugin());
}

module.exports = config;
