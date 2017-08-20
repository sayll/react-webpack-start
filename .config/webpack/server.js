const opn = require('opn')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')

const cfg = require('../index')
const utils = require('./utils')
const webpackConfig = require('./webpack.dev.conf')

const app = express()
const port = process.env.PORT || cfg.dev.port
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = cfg.dev.proxyTable
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
/*compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})*/

// proxy api requests
Object.keys(proxyTable).forEach(context => {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// 实现单页应用 404 问题
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error displayxx
app.use(hotMiddleware)

// serve pure static assets
app.use('/static', express.static(utils.resolve(cfg.path.static)))
app.use('/', express.static(utils.resolve(cfg.path.dist)))

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log(`http://127.0.0.1:${port}\n`)
  if (process.argv.includes('open') || cfg.dev.autoOpenBrowser) {
    opn(`http://127.0.0.1:${port}`)
  }
  _resolve()
})

const server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
