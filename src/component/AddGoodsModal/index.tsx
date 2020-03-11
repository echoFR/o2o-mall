import React, { useState } from 'react'
import { Form } from 'antd'
import SelfModal from 'component/SelfModal'

interface IAddGoodsModalProps {
  onAddGoods: ()=>void
  formItemList: any[]
}

const AddGoodsModal = ({onAddGoods, formItemList}: IAddGoodsModalProps)=>{
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  return(
    <SelfModal
        title='添加商品'
        visible={visible}
        form={form}
        formName='add-goods'
        formItemList={formItemList}
        onModalCancel={() => setVisible(false)}
        onModalClick={onAddGoods}
        ModalClickText='添加'
      />
  )
}

export default AddGoodsModal