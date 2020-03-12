import React, { useState, useEffect } from 'react'
import { Form, Input, Radio, Button, DatePicker } from 'antd'
import moment from 'moment'
import Message from 'component/Message'
import { updateUserInfo } from 'service/user'
import './index.less'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/index'
import { updateUserInfo as updateUserInfoAction } from 'store/userInfo/actions'
const formItems: any = {
  username: '昵称',
  sex: '性别',
  birthday: '生日',
  phone: '手机号',
  name: '收货人',
  address: '收货地址'
}
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
}
const UserInfo = () => {
  const dispath = useDispatch()
  const [form] = Form.useForm()
  const [info, setInfo] = useState<any>({})
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo
  })
  useEffect(() => {
    setInfo(userInfo)
  }, [])

  useEffect(() => {
    const { birthday = '' } = info
    form.setFieldsValue({
      ...info,
      birthday: birthday ? moment(birthday, 'YYYY-MM-DD') : birthday
    })
  }, [info])
  const getInfoItem = () => {
    const { birthday = '' } = info
    return (<Form
      {...formItemLayout}
      className='info-form'
      form={form}
      name='user-info-set'
      initialValues={{
        ...info,
        birthday: birthday ? moment(birthday, 'YYYY-MM-DD') : birthday
      }}
    >
      {
        Object.keys(formItems).map((key: string) => {
          const label = formItems[key]
          const placeholder = `请输入${label}`
          let Item = <Input placeholder={placeholder} />
          if (key === 'sex') {
            const sexObj: any = { '女': 1, '男': 0 }
            Item = (<Radio.Group buttonStyle='solid'>
              {
                Object.keys(sexObj).map((key: string) => (
                  <Radio key={key} value={sexObj[key]}>{key}</Radio>
                ))
              }
            </Radio.Group>)
          } else if (key === 'birthday') {
            Item = <DatePicker placeholder={`请选择${label}`} />
          }
          return (<Form.Item
            key={key}
            label={label}
            name={key}
          >
            {Item}
          </Form.Item>)
        })
      }
    </Form>)
  }
  // 修改信息
  const saveInfo = () => {
    form.validateFields().then(async (values) => {
      const { infoId } = info
      const { birthday, username, sex, phone, name, address } = values
      if (!username) {
        Message({
          msg: `请输入${formItems['username']}`
        })
      }
      const formatDate = birthday
        ? moment(birthday).format('YYYY-MM-DD')
        : birthday
      const newInfo = {
        id: infoId,
        username,
        name,
        sex,
        birthday: formatDate,
        phone,
        address
      }
      await updateUserInfo(newInfo)
      dispath(updateUserInfoAction({
        ...newInfo,
        id: info.id,
        infoId: info.infoId
      }))
    })
  }

  return (<div className='user-info'>
    {getInfoItem()}
    <div className='btn'>
      <Button onClick={saveInfo} danger type="primary">保存</Button>
    </div>
  </div>)
}

export default UserInfo