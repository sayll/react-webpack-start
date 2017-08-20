import axios from 'axios'

// 初始化 axios
const origin = window.location.origin
window.env = (/127.0.0.1/).test(origin) || !(false) ? 'development' : 'production'

// const isDev = window.env === 'development'

// 配置接口地址
axios.api = {}

// 本地调试添加 json 后缀,统一get 与 post请求方式
if (axios.defaults.baseURL === `${origin}/static/mocks`) {
  const keys = Object.keys(axios.api)
  axios.post = axios.get
  for (let i = 0, len = keys.length; i < len; i++) {
    axios.api[keys[i]] += '.json'
  }
}

// 配置通用项
axios.defaults.timeout = 5000
axios.defaults.headers['Content-Type'] = 'application/json'

// 异常处理
axios.defaults.transformResponse = function transformResponse(response) {
  const res = JSON.parse(response)

  if (res.status) {
    // 接口错误 status 404，500情况
    throw new Error('网络连接超时，请稍后重试')
  }
  return res
}

// 拦截器
/*axios.interceptors.request.use(request => {
  const header = JSON.parse(sessionStorage.getItem('getHeader'))
  if (header) {
    request.headers = header
    request.headers['Content-Type'] = 'application/json'
  }
  return request
}, error => Promise.reject(error))*/
