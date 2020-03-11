import axios from 'lib/axios'
const getShopById = (params: {
  id: number
}) => {
  return axios({
    url: '/shops/id',
    params
  })
}
const getShopAll = () => {
  return axios({
    url: '/shops/all'
  })
}
const addShop = (data: {
  name: string,
  description: string
}) => {
  return axios({
    method: 'post',
    url: '/shops/add',
    data
  })
}
const deleteShop = (params: {
  id: number
}) => {
  return axios({
    method: 'post',
    url: '/shops/delete',
    params
  })
}
const updateShop = (data: {
  id: number,
  name: string,
  description: string
}) => {
  return axios({
    method: 'post',
    url: '/shops/update',
    data
  })
}
export {
  getShopById,
  getShopAll,
  addShop,
  deleteShop,
  updateShop
}