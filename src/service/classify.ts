import axios from 'lib/axios'
const getClassifyById = (params: {
  id: number
})=>{
  return axios({
    url: '/classify/id',
    params
  })
}
const getClassifyAll = (params? : {
  pageNum?: number, // 页数
  pageSize?: number // 每页数量
})=>{
  return axios({
    url: '/classify/all'
  })
}
const addClassify = (data: {
  name: string,
  description?: string
})=>{
  return axios({
    method: 'post',
    url: '/classify/add',
    data
  })
}
const deleteClassify = (params: {
  id: number
})=>{
  return axios({
    method: 'post',
    url: '/classify/delete',
    params
  })
}
// 修改描述
const updateClassify = (data: {
  id: number,
  description: string
})=>{
  return axios({
    method: 'post',
    url: '/classify/update',
    data
  })
}

export {
  getClassifyById,
  getClassifyAll,
  addClassify,
  deleteClassify,
  updateClassify
}