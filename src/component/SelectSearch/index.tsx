import React, { useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd'
import SelfSelect from 'component/SelfSelect'
import './index.less'
interface Itype {
  name: string
  value: string
  shouldInputNumber?: boolean
}
interface ISelectSearchProps {
  typeList: Itype[]
  onSearchFather: (type: string, input: string) => void
}
const SelectSearch = ({ typeList = [], onSearchFather }: ISelectSearchProps) => {
  const typeName = typeList.length && typeList[0].name
  const [form] = Form.useForm()
  const [searchType, setSearchType] = useState(typeName)
  const [isInputNumber, setIsInputNumber] = useState(false)

  useEffect(() => {
    const { shouldInputNumber } = typeList.find(item => item.name === searchType)!
    setIsInputNumber(Boolean(shouldInputNumber))
  }, [searchType])

  const onSelectChange = (typeValue: string) => {
    const cur = typeList.find(type => type.value === typeValue)
    setSearchType(cur!.name)
  }
  const onSearch = () => {
    form.validateFields().then(async (values) => {
      const { type, input } = values
      onSearchFather(type, input)
    })
  }
  let lable = `请输入${searchType}`
  lable = isInputNumber ? `${lable}（只能输入数字）` : lable
  return (<div className='select-search'>
    <Form
      className='form'
      form={form}
      initialValues={{
        type: typeList.length && typeList[0].value
      }}
    >
      <Form.Item
        name='type'
        className='select'
      >
        {
          SelfSelect({
            optionList: typeList,
            onSelectChange: onSelectChange
          })
        }
      </Form.Item>
      {
        searchType === '全部' || searchType === '库存大于0的商品'
          ? null
          : (<Form.Item name='input' className='input' rules={[{
            required: true,
            message: lable,
            pattern: isInputNumber ? new RegExp(/^\d+(\.\d+)?$/) : undefined
          }]}>
            <Input allowClear placeholder={lable} />
          </Form.Item>)
      }
      <Button type='primary' className='btn' onClick={onSearch}>查询</Button>
    </Form>
  </div>)
}

export default SelectSearch