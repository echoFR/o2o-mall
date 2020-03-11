import axios from 'lib/axios'
// 根据用户名获取 user
const getUserByUsername = (params: {
  username: string
}) => {
  return axios({
    url: '/user/username',
    params
  })
}

// 获取所有用户
const getUserAll = (params?: {
  pageNum?: number, // 页数
  pageSize?: number // 每页数量
}) => {
  return axios({
    url: '/user/all',
    params
  })
}
// 获取用户基本信息
const getUserInfo = (params: {
  username: string
}) => {
  return axios({
    url: '/info/username',
    params
  })
}

// 修改密码
const changePwd = (data: {
  id: number,
  username?: string,
  password?: string
}) => {
  return axios({
    method: 'post',
    url: '/user/update',
    data,
  })
}
// 更新用户信息
const updateUserInfo = (data: {
  id: number,
  username: string,
  name: string,
  sex: 0 | 1,
  birthday: string,
  phone: string,
  address: string
}) => {
  return axios({
    method: 'post',
    url: '/info/update',
    data
  })
}
// 注册
const userRegister = (data: {
  username: string,
  password: string
}) => {
  return axios({
    method: 'post',
    url: '/auth/register',
    data,
  })
}
// 登录
const userLogin = (data: {
  username: string,
  password: string
}) => {
  return axios({
    method: 'post',
    url: '/auth/login',
    data,
  })
}

export {
  getUserByUsername,
  getUserAll,
  getUserInfo,
  changePwd,
  updateUserInfo,
  userRegister,
  userLogin
}