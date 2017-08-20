import * as common from './common'
import * as imageBase64 from './imageBase64'
import * as imageFormat from './imageFormat'
import * as getQuery from './getQuery'
import * as md5 from './md5'
import * as uploadImages from './uploadImages'
import * as replaceEmoji from './replaceEmoji'

// 导出所有方法
export default (arr => {
  function copyFunc(arr) {
    const result = {}
    arr.forEach(obj => {
      const keys = Object.keys(obj)
      keys.forEach(key => {
        if (key !== 'default') {
          result[key] = obj[key]
        }
      })
    })
    return result
  }

  return copyFunc(arr)
})([
  getQuery,
  common,
  md5,
  imageBase64,
  imageFormat,
  uploadImages,
  replaceEmoji
])

// 局部导出
export * from './common'
export * from './imageBase64'
export * from './imageFormat'
export * from './getQuery'
export * from './md5'
export * from './uploadImages'
export * from './replaceEmoji'
