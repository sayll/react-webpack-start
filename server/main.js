const base = require('../config/webpack/base/base');

const files = require('../config/webpack/base/files');

const webpackConfig = require('../config/webpack/webpack.dev');

const webpack = require('webpack');

const express = require('express');

const app = express();


/**
 * Apply Webpack HMR Middleware
 * */

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: files.cdnPath,
    quiet: true,
    stats: { colors: true }
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.use('/', express.static(files.buildPath));
  app.listen(base.devPort, () => {
    console.log(`open localhost:${base.devPort}`);
  });
}
else {
  console.log(
    `Server not being run of live development mode,
      Please use the NODE_ENV=development mode to run`
  );
}

module.exports = app;
