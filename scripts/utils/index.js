const fs = require('fs')
const path = require('path')
const glob = require('glob')

/**
 * 路径内资源解析
 * @param _path {string} - 路径
 * @param type {string} - 文件类型
 * */
const getEntries = (_path, type = '*') => {
  let pathDir = _path
  let baseName // 文件名
  let entry // 文件完整路径
  let extName // 文件格式
  let dirName // 传入的文件夹路径
  let pathName // 文件夹路劲

  const files = glob.sync(`${_path}/${type}`)
  const entries = {}
  for (const i in files) {
    entry = files[i]
    extName = path.extname(entry)
    dirName = path.dirname(entry)
    baseName = path.basename(entry, extName)
    pathName = path.normalize(path.join(dirName, baseName))
    pathDir = path.normalize(pathDir)

    entries[pathName] = {
      entry,
      extName,
      dirName,
      baseName,
      pathDir,
      pathName
    }
  }
  return entries
}

/**
 * 删除文件目录
 * @param path {string} - 文件路径
 * */
const removeFiles = (path) => {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)

    files.forEach(function (file) {
      const curPath = path + '/' + file

      if (fs.statSync(curPath).isDirectory()) {
        removeFiles(curPath)
      }
      else {
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

module.exports = {
  getEntries,
  removeFiles
}