import axios from 'lib/axios'
// 根据编号获取
const getOrderById = (params: {
  id: string
}) => {
  return axios({
    url: '/order/id',
    params
  })
}

// 查询用户订单
const getOrderByUser = (params: {
  userId: number
}) => {
  return axios({
    url: '/order/user',
    params
  })
}

interface IGoodSetList {
  orderId: string,
  goodsId: number,
  num: number
}

// 创建订单
const addOrder = (data: {
  id: string,
  userId: number,
  money: number,
  date: string,
  freight: number,
  goodSetList: IGoodSetList[]
}) => {
  return axios({
    method: 'post',
    url: '/order/add',
    data: {
      ...data,
      status: 1
    }
  })
}
const getOrderAll = (params?: {
  pageNum?: number, // 页数
  pageSize?: number // 每页数量
}) => {
  return axios({
    url: '/order/all',
    params
  })
}
// 更新订单状态
const changeOrderStatus = (data: {
  id: string,
  status: -1 | 0 | 1 | 2 //0：已下单；1：配送中；2：配送完成
}) => {
  return axios({
    method: 'post',
    url: '/order/update',
    data
  })
}
// 取消订单
const cancelOrder = (params: {
  orderId: string
}) => {
  return axios({
    method: 'post',
    url: '/order/cancel',
    params
  })
}
export {
  getOrderById,
  getOrderByUser,
  addOrder,
  getOrderAll,
  changeOrderStatus,
  cancelOrder
}