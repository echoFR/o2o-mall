import React from 'react'
import { Select } from 'antd'

interface IOption {
  name: string
  value?: string | number
}
interface ISelfSelectProps {
  optionList: IOption[]
  hideValue?: boolean
  onSelectChange?: (value: string) => void
}
const SelfSelect = ({ optionList, hideValue = false, onSelectChange }: ISelfSelectProps) => {
  return (
    <Select
      onChange={onSelectChange}
      placeholder='请选择'
    >
      {
        optionList.map((option: IOption, index: number) => (
          <Select.Option
            value={hideValue ? option.name : option.value || ''}
            key={index}
          >
            {option.name}
          </Select.Option>
        ))
      }
    </Select>
  )
}

export default SelfSelect

