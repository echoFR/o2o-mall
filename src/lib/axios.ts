import axios from 'axios'
import Message from '../component/Message'

const config = {
  baseURL: process.env.REACT_APP_API_HOST || '',
  timeout: Number(process.env.REACT_APP_HTTP_TIMEOUT), // Timeout
}


const instance = axios.create(config)
instance.interceptors.request.use(config => {
  const storageUserInfo = localStorage.getItem('user_info')
  const userInfo = storageUserInfo ? JSON.parse(storageUserInfo) : {}
  const { token } = userInfo
  const { url = '' } = config
  if (url !== '/goods/all' && !url.startsWith('/auth') && token) {
    config.headers.Authorization = `Bearer ${token}`
    // instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete config.headers.Authorization
    // delete instance.defaults.headers.common['Authorization']
  }
  return config
}, err => {
  Message({
    msg: '请求超时!'
  })
  return Promise.resolve(err)
})
instance.interceptors.response.use(
  (res) => {
    const { status, data, msg } = res.data
    if (status === 'success') {
      return data
    } else {
      Message({
        msg: `${status}，${msg}`
      })
    }
  }, (err) => {
    Message({
      msg: err.message
    })
    return Promise.reject(err)
  },
)

export default instance