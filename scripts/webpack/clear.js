const help = require('./help')
const core = require('../core')

/**
 * 清除旧文件
 * */
help.removeFiles([
  core.files.dist,
  core.files.cache
])