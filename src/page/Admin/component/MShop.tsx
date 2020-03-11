import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'antd'
import SelectSearch from 'component/SelectSearch'
import EdiTable from 'component/EdiTable'
import SelfModal from 'component/SelfModal'
import './index.less'
import {
  getShopAll,
  getShopById,
  addShop,
  deleteShop,
} from 'service/shops'
import { addGoods } from 'service/goods'
import { getClassifyAll } from 'service/classify'
import { shopColumns, goodsColumns } from './columns'
import SelfSelect from 'component/SelfSelect'

const typeList = [{
  name: '店铺编号',
  value: 'id',
  shouldInputNumber: true
}, {
  name: '全部',
  value: 'all',
},]

const MShop = () => {
  const [data, setData] = useState<any[]>([])
  const [allData, setAllData] = useState<any[]>([])
  const history = useHistory()
  const [form] = Form.useForm()
  const [goodsForm] = Form.useForm()
  const [shopVisible, setShopVisible] = useState(false)
  const [goodsVisible, setGoodsVisible] = useState(false)
  const [curShopId, setCurShopId] = useState()
  const [classifies, setClassifies] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getShopAllData = async () => {
      setLoading(true)
      const data = await getShopAll()
      let { list }: { list: any[] } = data as any
      setData(list)
      setAllData(list)
      setLoading(false)
    }
    getShopAllData()

    const getClassifyAllData = async () => {
      const data = await getClassifyAll()
      let { list }: { list: any[] } = data as any
      setClassifies(list)
    }
    getClassifyAllData()
  }, [])
  // 添加店铺
  const onAddShop = () => {
    form.validateFields().then(async (values) => {
      const { name, description } = values
      await addShop({
        name,
        description
      })
      const data = await getShopAll()
      let { list }: { list: any[] } = data as any
      setData(list)
      setAllData(list)
      setShopVisible(false)
    })
  }
  // 删除店铺
  const onDeleteShop = async ({ id }: { id: number }) => {
    await deleteShop({ id })
  }
  // 店铺添加商品
  const onAddGoods = () => {
    goodsForm.validateFields().then(async (values) => {
      const { name, photo, stock, description, salesVolume, unit, price, classifyId } = values
      await addGoods({
        shopsId: curShopId,
        name,
        photo,
        stock,
        description,
        salesVolume,
        unit,
        price,
        classifyId
      })
      setGoodsVisible(false)
    })
  }
  const columns = shopColumns.concat([{
    title: '操作店铺商品',
    dataIndex: 'add-goods',
    render: (text: string, record: any) => {
      return (<div>
        <Button type='primary'
          className='add-btn'
          onClick={() => {
            setCurShopId(record.id)
            setGoodsVisible(true)
          }}
        >增加商品
        </Button>
        <Button className='add-btn'
          onClick={() => {
            history.push({
              pathname: `/admin/goods`,
              search: `shopId=${record.id}&shopName=${record.name}`
            })
          }}
        >查看店铺商品
        </Button>
      </div>)
    },
  }])
  const getAddShopModal = () => {
    return (
      <SelfModal
        title='添加店铺'
        visible={shopVisible}
        form={form}
        formName='add-shop'
        formItemList={shopColumns.filter(({ dataIndex }) => dataIndex !== 'id')}
        onModalCancel={() => setShopVisible(false)}
        onModalClick={onAddShop}
        ModalClickText='添加'
      />)
  }
  const getAddGoodsModal = () => {
    let optionList: any[] = []
    if (classifies.length) {
      optionList = classifies.map(({ id, name }) => ({
        name,
        value: id
      }))
    }
    return (
      <SelfModal
        title='添加商品'
        visible={goodsVisible}
        form={goodsForm}
        formName='add-goods'
        formItemList={goodsColumns.filter(({ dataIndex }) => dataIndex !== 'id')
          .map((item) => {
            if (item.dataIndex === 'classifyId') {
              return {
                ...item,
                editInput: SelfSelect({
                  optionList
                })
              }
            }
            return item
          })}
        onModalCancel={() => setGoodsVisible(false)}
        onModalClick={onAddGoods}
        optionalItemList={['photo']}
        ModalClickText='添加'
      />)
  }
  const onSearch = async (type: string, input: string) => {
    setLoading(true)
    let data: any
    switch (type) {
      case 'all':
        data = allData
        break
      case 'id':
        data = await getShopById({
          id: Number(input)
        })
        break
      default:
        break
    }
    if (data) {
      if (Array.isArray(data)) {
        setData(data)
      } else {
        setData([data])
      }
    } else {
      setData([])
    }
    setLoading(false)
  }
  return (<div className='m-shop'>
    {getAddShopModal()}
    {getAddGoodsModal()}
    <div className='search'>
      <SelectSearch typeList={typeList} onSearchFather={onSearch} />
    </div>
    <div className='add-btn add-shop'>
      <Button type='primary' onClick={() => setShopVisible(true)}>
        添加店铺
      </Button>
    </div>
    <EdiTable
      pColumns={columns}
      dataSource={data}
      loading={loading}
      tableTitle='店铺信息'
      needDelete
      onDeleteService={onDeleteShop}
    />
  </div>)
}

export default MShop