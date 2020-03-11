import React, { useState, useEffect } from 'react'
import SelectSearch from 'component/SelectSearch'
import EdiTable from 'component/EdiTable'
import { getOrderAll, getOrderById, getOrderByUser, changeOrderStatus } from 'service/order'
import SelfSelect from 'component/SelfSelect'
import './index.less'

import { orderColumns } from './columns'
const typeList = [{
  name: '订单编号',
  value: 'id',
}, {
  name: '用户 ID',
  value: 'userId',
  shouldInputNumber: true
}, {
  name: '全部',
  value: 'all',
}]

const statusObj: any = {
  '-1': '已取消',
  '0': '已下单',
  '1': '配送中',
  '2': '配送完成'
}
const statusList = Object.keys(statusObj).map(key => ({
  name: statusObj[key]
}))
const columns = orderColumns.concat([{
  title: '订单状态',
  dataIndex: 'status',
  editable: true,
  editInput: SelfSelect({
    optionList: statusList,
    hideValue: true
  })
}])
const onChangeOrder = async (data: any) => {
  const status = Object.keys(statusObj).find((key) => statusObj[key] === data.status)
  await changeOrderStatus({
    ...data,
    status
  })
}
const MOrder = () => {
  const [data, setData] = useState<any[]>([])
  const [allData, setAllData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const getList = (list: any[]) => {
    return list.map(item => ({
      ...item,
      status: isNaN(item.status) ? item.status : statusObj[item.status]
    }))
  }
  useEffect(() => {
    const getOrderAllData = async () => {
      setLoading(true)
      const data = await getOrderAll()
      let { list }: { list: any[] } = data as any
      list = getList(list)
      setData(list)
      setAllData(list)
      setLoading(false)
    }
    getOrderAllData()
  }, [])
  const onSearch = async (type: string, input: string) => {
    setLoading(true)
    let data: any
    switch (type) {
      case 'all':
        data = allData
        break
      case 'id':
        data = await getOrderById({
          id: input
        })
        break
      case 'userId':
        data = await getOrderByUser({
          userId: Number(input)
        })
        break
      default:
        break
    }
    if (data) {
      if (Array.isArray(data)) {
        setData(getList(data))
      } else {
        setData(getList([data]))
      }
    } else {
      setData([])
    }
    setLoading(false)
  }
  return (<div className='m-order'>
    <div className='search'>
      <SelectSearch typeList={typeList} onSearchFather={onSearch} />
    </div>
    <EdiTable
      pColumns={columns}
      dataSource={data}
      loading={loading}
      tableTitle='订单信息'
      needMdify
      onSaveService={onChangeOrder}
    />
  </div>)
}

export default MOrder