// url参数查询（支持search，hash双模式）
function querySearch(key, url) {
  const query = {}
  const search = url || window.location.search

  if (search.indexOf('?') === 0) {
    const parameters = search.slice(1).split('&')
    for (let i = 0; i < parameters.length; i++) {
      const p = parameters[i]
      const kv = p.split('=')
      if (kv.length === 2) {
        const k = kv[0]
        const v = kv[1]
        if (k) {
          query[k] = decodeURIComponent(v)
        }
      }
    }
  }

  return key ? query[key] : query
}

function queryHash(key, url) {
  const query = {}
  const search = url || window.location.hash

  if (search.indexOf('?')) {
    const str = search.substr(search.indexOf('?') + 1)
    const strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      query[strs[i].split('=')[0]] = decodeURI(strs[i].split('=')[1])
    }
  }
  return key ? query[key] : query
}

/**
 * 获取当前页面的查询参数。
 * @param {String} key 要获取的查询字符串名，无参数或为null,false,0等无效参数则返回所有参数对象
 * @param {String} url 要获取的查询地址，当为'hash'时，取代第三个参数，进入hash模式。默认为当前地址
 * @param {String} type 为'hash'时进入hash模式，否则为正常的search模式；默认地址存在search时为search模式，否则为hash模式
 * @returns {String} 返回查询参数值。如果获取不到则返回 对象集合{}。
 * @example1 getQuery("a") or getQuery() 查询某一参数或全部参数
 * @example2 getQuery("a", 'hash') or getQuery(null, 'hash') 主动切换到hash模式查询
 * @example3 getQuery("a", 'https://github.com') or getQuery(null, 'https://github.com') 查询其他地址
 * @example4 getQuery("a", 'https://github.com', 'hash') or getQuery(null, 'https://github.com', 'hash') hash模式查询其他地址
 */

export function getQuery(key, url, type) {
  const isHash = url === 'hash'
  if (!window.location.search || isHash || type === 'hash') {
    return queryHash(key, !isHash ? url : false)
  }
  return querySearch(key, url)
}

export default getQuery
