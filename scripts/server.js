const core = require('./core')
const convert = require('koa-connect')
const webpackServe = require('webpack-serve')
const history = require('connect-history-api-fallback')
const webpackConfig = require('./webpack/webpack.dev')

webpackServe({
  add: app => {
    app.use(convert(history({}))) // 避免路由点击 404
  },
  config: webpackConfig,
  content: core.roots,
  dev: {
    publicPath: core.dev.publicPath, // 服务器根路径
    logTime: true,
    stats: 'minimal' // 只在发生错误 或是 新的编译时输出
  },
  host: '0.0.0.0',
  hot: {
    logLevel: 'warn'
  },
  port: core.dev.port,
  open: process.argv.includes('open') && { path: '/' }
})
