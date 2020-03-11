import React from 'react'
import { Modal, Form, Input, Button } from 'antd'

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
interface ISelfModalProps {
  title?: string
  visible: boolean
  form: any
  formName: string
  formItemList: any[]
  optionalItemList?: string[] // 可选的 dataIndex 集合
  onModalCancel: () => void
  onModalClick: () => void
  ModalClickText?: string
}

const SelfModal = ({
  title = '',
  visible,
  form,
  formName,
  formItemList,
  optionalItemList,
  onModalCancel,
  onModalClick,
  ModalClickText = '提交'
}: ISelfModalProps) => {
  return (<Modal
    forceRender
    title={title}
    visible={visible}
    footer={null}
    onCancel={onModalCancel}
  >
    <Form
      {...formItemLayout}
      name={formName}
      form={form}
    >
      {
        formItemList.map(({ title, dataIndex, editInput, shouldInputNumber }) => {
          let lable = `请输入${title}`
          lable = shouldInputNumber ? `${lable}（只能输入数字）` : lable
          let messageObj = editInput ? {
            message: `请选择${title}`,
          } : {
            message: lable,
            pattern: shouldInputNumber ? new RegExp(/^\d+(\.\d+)?$/) : undefined
          }
          return (<Form.Item
            key={dataIndex}
            label={title}
            name={dataIndex}
            rules={[
              {
                required: optionalItemList ? !optionalItemList.includes(dataIndex) : true,
                ...messageObj,
              }
            ]}
          >
            {editInput
              ? editInput
              : (dataIndex.startsWith('password')
                ? <Input.Password placeholder={lable} />
                : <Input placeholder={lable} />)}
          </Form.Item>)
        })
      }
      <div className='btn'>
        <Button type="primary"
          onClick={onModalClick}>
          {ModalClickText}
        </Button>
      </div>
    </Form>
  </Modal>)
}

export default SelfModal