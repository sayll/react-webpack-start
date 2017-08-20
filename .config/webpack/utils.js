const path = require('path')
const glob = require('glob')
const HappyPack = require('happypack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cfg = require('../index')

// 绝对路径生成器
exports.resolve = (localPath, ...dir) => path.join(process.cwd(), localPath, ...dir)

// 是否生产环境
const isProduction = process.env.NODE_ENV === 'production'
exports.isProduction = isProduction

// 文件打包路径
exports.assetsPath = _path => {
  const assetsSubDirectory = isProduction
    ? cfg.build.assetsSubDirectory
    : cfg.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

// HappyPack生成器
exports.cHappyPack = (id, loaders) => new HappyPack({
  id: id,
  debug: false,
  verbose: false,
  threads: 4,
  loaders: loaders
})

// 文件分离
exports.getEntries = (Path, type) => {
  let pathDir = Path,
    entry, // 文件完整路径
    dirName, // 传入的文件夹路径
    baseName, // 文件名
    pathName, // 文件夹路劲
    relativeName, // 键名所需,相对传入文件地址路径
    extName // 文件格式

  const files = glob.sync(`${Path}/${type}`)
  const entries = {}
  for (const i in files) {
    entry = files[i]
    extName = path.extname(entry)
    dirName = path.dirname(entry)
    baseName = path.basename(entry, extName)
    pathName = path.normalize(path.join(dirName, baseName))
    pathDir = path.normalize(pathDir)

    // 逻辑部分
    relativeName = path.relative(pathDir, dirName)
    pathName = path.basename(pathName)
    if (relativeName.includes('\\') || relativeName.includes('\/')) {
      continue
    }
    else {
      if (extName === '.html') {
        if (relativeName === pathName) {
          entries[relativeName] = entry
        }
      }
      else if (pathName === 'index') {
        entries[relativeName] = [entry]
      }
    }
  }
  return entries
}

// 创建多页
exports.createPages = (plugins, pages) => {
  for (const page in pages) {
    // 配置生成的html文件，定义路径等
    const conf = {
      filename: page + '.html',
      template: pages[page],
      chunks: ['main', page],
      inject: true,
      excludeChunks: Object.keys(pages).filter(item => item !== page)
    }
    if (isProduction) {
      conf.minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }
    conf.chunksSortMode = (a, b) => { // 按照配置排序
      const index = {}
      for (const i in conf.chunks) {
        index[conf.chunks[i]] = i
      }
      const aI = index[a.origins[0].name]
      const bI = index[b.origins[0].name]
      return aI && bI ? aI - bI : -1
    }
    plugins.push(new HtmlWebpackPlugin(conf))
  }
}
