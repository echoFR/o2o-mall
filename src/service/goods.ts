import axios from 'lib/axios'
const getGoodsById = (params: {
  id: number
}) => {
  return axios({
    url: '/goods/id',
    params
  })
}
const getGoodsByName = (params: {
  name: string
}) => {
  return axios({
    url: '/goods/name',
    params
  })
}
const getGoodsByClassify = (params: {
  classifyName: string
}) => {
  return axios({
    url: '/goods/classify',
    params
  })
}
// 查询库存大于0的商品
const getGoodsByStock = () => {
  return axios({
    url: '/goods/stock',
  })
}

const getGoodsAll = ()=>{
  return axios({
    url: '/goods/all',
  })
}
const addGoods = (data: {
  shopsId?: number,
  name: string,
  photo?: string,
  stock: number,
  description: string,
  salesVolume: number,
  unit: number,
  price: number,
  classifyId: number
})=>{
  return axios({
    method: 'post',
    url: '/goods/add',
    data
  })
}
const deleteGoods = (params: {
  id: number
})=>{
  return axios({
    method: 'post',
    url: '/goods/delete',
    params
  })
}
const updateGoods = (data: {
  id: number,
  shopsId: number,
  name: string,
  photo?: string,
  stock: number,
  description: string,
  salesVolume: number,
  unit: number,
  price: number,
})=>{
  return axios({
    method: 'post',
    url: '/goods/update',
    data
  })
}
export {
  getGoodsById,
  getGoodsByName,
  getGoodsByClassify,
  getGoodsByStock,
  getGoodsAll,
  addGoods,
  deleteGoods,
  updateGoods
}