const path = require('path')

// 资源路径
const files = {
  app: 'app', // 资源根目录
  dist: 'dist', // 打包文件
  html: 'app/index.html', // 模板
  view: 'app/pages', // 视图
  root: 'root' // 外部不走打包的依赖
}

module.exports = {
  files,
  alias: { // 索引某些依赖
    '~': path.resolve(files.app)
  },
  externals: [], // 排出的依赖
  roots: [process.cwd(), files.root], // 服务启动后的根目录
  entry: {
    index: ['./app/index.js']
  },
  dev: {
    port: 3300,
    publicPath: '/'
  },
  build: {
    assetsPath: 'assets', // 指向打包资源
    publicPath: './'
  },
  devtool: 'cheap-module-eval-source-map' // cheap-source-map
}