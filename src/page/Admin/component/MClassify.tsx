import React, { useState, useEffect } from 'react'
import { Form, Button } from 'antd'
import EdiTable from 'component/EdiTable'
import SelfModal from 'component/SelfModal'
import { getClassifyAll, addClassify, deleteClassify, updateClassify } from 'service/classify'
import { classifyColumns } from './columns'

const MClassify = () => {
  const [data, setData] = useState<any[]>([])
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getClassifyAllData = async () => {
      setLoading(true)
      const data = await getClassifyAll()
      let { list }: { list: any[] } = data as any
      setData(list)
      setLoading(false)
    }
    getClassifyAllData()
  }, [])
  // 添加分类
  const onAddClassify = () => {
    form.validateFields().then(async (values) => {
      const { name, description } = values
      await addClassify({
        name,
        description
      })
      const data = await getClassifyAll()
      let { list }: { list: any[] } = data as any
      setData(list)
      setVisible(false)
    })
  }
  const onDeleteClassify = async ({ id }: { id: number }) => {
    await deleteClassify({ id })
  }
  const onUpdateClassify = async (data: any) => {
    const { id, description } = data
    await updateClassify({
      id,
      description
    })
  }
  const getAddClassifyModal = () => {
    return (
      <SelfModal
        title='添加商品'
        visible={visible}
        form={form}
        formName='add-goods'
        formItemList={classifyColumns.filter(({ dataIndex }) => dataIndex !== 'id')}
        onModalCancel={() => setVisible(false)}
        onModalClick={onAddClassify}
        ModalClickText='添加'
      />)
  }
  return (<div>
    {getAddClassifyModal()}
    <div className='add-btn add-goods'>
      <Button type='primary' onClick={() => setVisible(true)}>
        添加分类
      </Button>
    </div>
    <EdiTable
      pColumns={classifyColumns}
      dataSource={data}
      loading={loading}
      tableTitle='分类信息'
      needMdify
      onSaveService={onUpdateClassify}
      needDelete
      onDeleteService={onDeleteClassify}
    />
  </div>)
}

export default MClassify