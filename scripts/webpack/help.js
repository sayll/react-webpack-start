const path = require('path')
const HappyPack = require('happypack')

const core = require('../core')
const utils = require('../utils')
const happyThreadPool = HappyPack.ThreadPool({ size: 6 })

module.exports = {
  /**
   * 删除文件夹
   * */
  removeFiles: files => files.forEach(file => utils.removeFiles(file)),

  /**
   * 文件打包路径
   * @param {string} name: 相对路径
   * */
  assetsPath: name => path.posix.join(core.build.assetsPath, name),

  /**
   * 绝对路径
   * @param {string} localPath: 相对路径
   * @param {string} dir: 其他相对路径
   * */
  resolve: (localPath, ...dir) => path.join(process.cwd(), localPath, ...dir),

  /**
   * HappyPack生成器
   * @param {string} id: 线程名
   * @param {string[]|object[]} loads: 线程组
   * */
  HappyPack: (id, loads) => new HappyPack({
    id,
    loaders: loads,
    debug: false,
    verbose: false,
    threadPool: happyThreadPool // 自动分配线程池
  })
}