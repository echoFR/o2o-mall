import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import querystring from 'querystring'
import { Form, Button } from 'antd'
import SelectSearch from 'component/SelectSearch'
import EdiTable from 'component/EdiTable'
import SelfModal from 'component/SelfModal'
import {
  getGoodsAll,
  getGoodsByName,
  getGoodsById,
  getGoodsByClassify,
  getGoodsByStock,
  addGoods,
  deleteGoods,
  updateGoods
} from 'service/goods'
import { getClassifyAll } from 'service/classify'
import SelfSelect from 'component/SelfSelect'
import { goodsColumns } from './columns'

const typeList = [{
  name: '商品名',
  value: 'name',
}, {
  name: '商品 ID',
  value: 'id',
  shouldInputNumber: true
}, {
  name: '分类名称',
  value: 'classify',
}, {
  name: '库存大于0的商品',
  value: 'stock',
  shouldInputNumber: true
}, {
  name: '全部',
  value: 'all',
}]

const MGoods = () => {
  const [data, setData] = useState<any[]>([])
  const [allData, setAllData] = useState<any[]>([])
  const location = useLocation()
  const { search } = location
  const query = search.startsWith('?') ? search.slice(1) : search
  const { shopId } = querystring.parse(query)
  const [loading, setLoading] = useState(false)
  const [goodsForm] = Form.useForm()
  const [goodsVisible, setGoodsVisible] = useState(false)
  const [classifies, setClassifies] = useState<any[]>([])

  useEffect(() => {
    const getGoodsAllData = async () => {
      setLoading(true)
      if (shopId) {
        // todo 根据 shopId 查找 goods
      } else {
        const data = await getGoodsAll()
        let { list }: { list: any[] } = data as any
        setData(list)
        setAllData(list)
      }
      setLoading(false)
    }
    getGoodsAllData()
    const getClassifyAllData = async () => {
      const data = await getClassifyAll()
      let { list }: { list: any[] } = data as any
      setClassifies(list)
    }
    getClassifyAllData()
  }, [])
  const onAddGoods = () => {
    goodsForm.validateFields().then(async (values) => {
      const { name, photo, stock, description, salesVolume, unit, price, classifyId } = values
      await addGoods({
        name,
        photo,
        stock,
        description,
        salesVolume,
        unit,
        price,
        classifyId
      })
      const data = await getGoodsAll()
      let { list }: { list: any[] } = data as any
      setData(list)
      setAllData(list)
      setGoodsVisible(false)
    })
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
        data = await getGoodsById({
          id: Number(input)
        })
        break
      case 'name':
        data = await getGoodsByName({
          name: input
        })
        break
      case 'classify':
        data = await getGoodsByClassify({
          classifyName: input
        })
        break
      case 'stock':
        data = await getGoodsByStock()
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

  const onUpdateGoods = async (data: any) => {
    const { id, shopsId, name, photo, stock, description, salesVolume, unit, price, } = data
    await updateGoods({ id, shopsId, name, photo, stock, description, salesVolume, unit, price })
  }
  const onDeleteGoods = async ({ id }: { id: number }) => {
    await deleteGoods({ id })
  }
  return (<div className='m-goods'>
    {getAddGoodsModal()}
    <div className='search'>
      <SelectSearch typeList={typeList} onSearchFather={onSearch} />
    </div>
    <div className='add-btn add-goods'>
      <Button type='primary' onClick={() => setGoodsVisible(true)}>
        添加商品
      </Button>
    </div>
    <EdiTable
      pColumns={goodsColumns}
      dataSource={data}
      loading={loading}
      tableTitle='商品信息'
      needMdify
      onSaveService={onUpdateGoods}
      needDelete
      onDeleteService={onDeleteGoods}
    />
  </div>)
}

export default MGoods