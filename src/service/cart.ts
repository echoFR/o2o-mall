import axios from 'lib/axios'
// 获取用户购物车
const getUserCart = (params: {
  userId: number
}) => {
  return axios({
    url: '/cart/all',
    params
  })
}
// 加入购物车
const addUserCart = (data: {
  userId: number,
  goodsId: number,
  num?: number
}) => {
  return axios({
    method: 'post',
    url: '/cart/add',
    data
  })
}

interface deleteUserID {
  id: number
}
// 删除购物车商品
const deleteUserCart = (data: deleteUserID[]) => {
  return axios({
    method: 'post',
    url: '/cart/delete',
    data
  })
}

// 修改商品数量
const updateUserCart = (data: {
  id: number,
  userId: number,
  goodsId: number,
  num: number
}) => {
  return axios({
    method: 'post',
    url: '/cart/update',
    data
  })
}

export {
  getUserCart,
  addUserCart,
  deleteUserCart,
  updateUserCart
}