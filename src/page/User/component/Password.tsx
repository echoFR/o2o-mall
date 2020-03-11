import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from 'store/index'
import { changePwd } from 'service/user'
import Message from 'component/Message'
import './index.less'

const formItems: any = {
  new1Pwd: '新密码',
  new2Pwd: '再次确认密码',
}
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 },
}
const Password = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo
  })
  const [form] = Form.useForm()
  const [info, setInfo] = useState()
  useEffect(() => {
    setInfo(userInfo)
  }, [])

  // 校验新密码第二次
  const handleChecknew2Pwd = (rule: any, value: string, callback: any) => {
    const new1Pwd = form.getFieldValue('new1Pwd')
    if (value !== new1Pwd) {
      callback(new Error('新密码两次输入不相同!'))
    } else {
      callback()
    }
  }
  const getInfoItem = () => {
    return (<Form
      {...formItemLayout}
      className='change-pwd'
      form={form}
      name='change-pwd'
    >
      {
        Object.keys(formItems).map((key: string) => {
          const label = formItems[key]
          let placeholder = `请输入${label}`
          const msg = '密码必须为8-16位(字母、数字、特殊字符的组合)'
          if (key === 'new1Pwd') {
            placeholder = `请输入${label}，${msg}`
          } else if (key === 'new2Pwd') {
            placeholder = `请再次输入新密码，${msg}`
          }
          let Item = <Input placeholder={placeholder} />
          let validatorFn: any = undefined
          if (key === 'new2Pwd') {
            validatorFn = handleChecknew2Pwd
          }
          return (<Form.Item
            key={key}
            label={label}
            name={key}
            rules={[{
              validator: (rule, value, callback) => {
                validatorFn && validatorFn(rule, value, callback)
              },
            }]}
            validateTrigger='onBlur'
          >
            {Item}
          </Form.Item>)
        })
      }
    </Form>)
  }
  const saveNewPW = () => {
    form.validateFields().then(async (values) => {
      const { new1Pwd } = values
      const { id } = info
      try {
        await changePwd({
          id,
          password: new1Pwd
        })
        Message({
          type: 'success',
          msg: `密码修改成功`
        })
      } catch (error) {
      }
    })
  }
  return (<div className='change-pwd'>
    {getInfoItem()}
    <div className='btn'>
      <Button onClick={saveNewPW} danger type="primary">保存</Button>
    </div>
  </div>)
}

export default Password