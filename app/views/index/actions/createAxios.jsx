import ajax from 'axios'
import { createAction } from 'redux-actions'

const layer = window.layer

function createAxios(action, url, options, changeUrl, type) {
  if (
    typeof url !== 'string' ||
    typeof action !== 'string' ||
    typeof type !== 'string'
  ) {
    console.info(`Action: ${action}`)
    throw new Error('参数必须字符串！')
  }

  function initData(data) {
    const dataJSON = options ? Object.assign({}, options, data) : data
    return type.toLowerCase() === 'get' ? { params: dataJSON } : dataJSON
  }

  return createAction(action, data => (
    ajax[type](changeUrl ? changeUrl(data) : url, initData(data))
      .then(res => res.data)
      .catch(err => {
        layer.open({
          content: err.toString().replace('Error:', '').replace('Network Error', '网络错误，请稍后重试'),
          skin: 'msg',
          time: 2
        })
      })
  ), req => req)
}

/**
 * 接口方法说明
 * @param action: action
 * @param url: 请求地址：当为null,false时调用changeUrl的返回地址
 * @param options: 基础参数合并
 * @param changeUrl(data) 可以拿到传参，进行url的操作，最后到输出接口地址
 * */
export const getAxios = (action, url, options, changeUrl) => createAxios(action, url, options, changeUrl, 'get')

export const postAxios = (action, url, options, changeUrl) => createAxios(action, url, options, changeUrl, 'post')

export const axios = ajax
