const path = require('path')

const filesPath = {
  app: 'app', // 资源根目录
  dist: 'dist', // 打包文件
  dll: 'dist/vendors', // dll打包文件
  static: 'static', // 静态文件目录
  views: 'app/views', // 视图目录
  assets: 'app/assets', // 资源目录
  utils: 'app/utils', // 资源目录
  components: 'app/components' // 组件目录
}

module.exports = {
  path: filesPath,
  JsType: 'jsx',
  CssType: 'pcss',
  vendors: [ // 添加依赖
    'react-hot-loader',
    'axios',
    'classnames',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'react-router-dom',
    'redux',
    'redux-actions',
    'redux-promise'
  ],
  build: {
    // 服务根目录
    assetsRoot: path.resolve(process.cwd(), filesPath.dist),
    // 指向静态资源
    assetsSubDirectory: 'src',
    assetsPublicPath: './',
    // 是否生成用于生产构建的源映射
    sourceMap: false,
    // Gzip 默认关闭如需开启请安装下列依赖
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // `npm run report ： 查看捆绑分析器报表
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.argv.includes('report')
  },
  dev: {
    port: 3000,
    autoOpenBrowser: false,
    assetsSubDirectory: 'src',
    assetsPublicPath: process.env.NODE_ENV === 'production' ||
    process.argv.includes('debug') ? './' : '/',
    // see https://github.com/chimurai/http-proxy-middleware
    proxyTable: {
      /*'/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }*/
    },
    sourceMap: false
  }
}
