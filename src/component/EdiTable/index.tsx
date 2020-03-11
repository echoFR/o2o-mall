import React, { useState, useEffect } from 'react';
import { Table, Input, Form, Button, Popconfirm } from 'antd'
import './index.less'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  col,
  ...restProps
}: any) => {
  let lable = `请输入${title}`
  let messageObj = {}
  if (col) {
    lable = col.shouldInputNumber ? `${lable}（只能输入数字）` : lable
    messageObj = col.editInput ? {
      message: `请选择${title}`,
    } : {
        message: lable,
        // 非负浮点数
        pattern: col.shouldInputNumber ? new RegExp(/^\d+(\.\d+)?$/) : undefined
      }
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: col.optional ? false : true,
              ...messageObj
            },
          ]}
        >
          {
            col.editInput ? col.editInput : <Input placeholder={lable} />
          }
        </Form.Item>
      ) : (<>
        {children}
      </>)}
    </td>
  );
}

interface IEditableTableProps {
  dataSource: any[]
  pColumns: any[]
  loading?: boolean
  tableTitle?: string
  needMdify?: boolean  // 是否需要修改行
  onSaveService?: (data: any) => void //修改保存 prop function
  needDelete?: boolean// 是否需要删除行
  onDeleteService?: (data: any) => void //修改保存 prop function
}
const EditableTable = ({
  dataSource = [],
  pColumns = [],
  loading = false,
  tableTitle = '',
  needMdify = false,
  onSaveService,
  needDelete = false,
  onDeleteService
}: IEditableTableProps) => {

  const [form] = Form.useForm()
  const retdataSource = dataSource.map((item, index: number) => ({
    ...item,
    key: index
  }))
  const [data, setData] = useState(retdataSource)
  const [editingKey, setEditingKey] = useState('')

  useEffect(() => {
    setData(retdataSource)
  }, [dataSource])

  const isEditing = (record: any) => record.key === editingKey

  const editData = (record: any) => {
    form.setFieldsValue({ ...record })
    setEditingKey(record.key)
  }

  const saveData = async (key: any) => {
    try {
      const row: any = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex(item => key === item.key)
      if (index > -1) {
        const item = newData[index]
        // 保存修改 prop function
        onSaveService && onSaveService({ ...item, ...row })
        newData.splice(index, 1, { ...item, ...row })
        setData(newData)
        setEditingKey('')
      } else {
        newData.push(row)
        setData(newData)
        setEditingKey('')
      }
    } catch (errInfo) {
    }
  }
  const deleteData = (key: any) => {
    const newData = [...data]
    const cur = newData.find(item => key === item.key)
    const index = newData.findIndex(item => key === item.key)
    if (index > -1) {
      // 删除操作
      onDeleteService && onDeleteService({ ...cur })
      newData.splice(index, 1)
      setData(newData)
      setEditingKey('')
    }
  }

  const operation = {
    title: '操作',
    dataIndex: 'operation',
    render: (text: string, record: any) => {
      const editable = isEditing(record);
      return (<div className='operation'>
        {
          needMdify ? (editable ? (
            <div className='operation-save'>
              <Button type='primary' onClick={() => saveData(record.key)}>
                保存
              </Button>
              <Button onClick={() => setEditingKey('')}>取消</Button>
            </div>
          ) : (<div>
            <Button type='primary'
              disabled={editingKey !== ''}
              onClick={() => editData(record)}>
              修改
            </Button>
          </div>
            )) : null
        }
        {
          needDelete ? (<Popconfirm
            title='确认删除吗？'
            cancelText='取消'
            okText='确认'
            onConfirm={() => deleteData(record.key)}>
            <Button >删除</Button>
          </Popconfirm>) : null
        }
      </div>)
    },
  }
  // 字段需要修改时增加 editable 为 true
  const pColumns_e = pColumns.map((item, index: number) => ({
    ...item
  }))
  const columns = (needMdify || needDelete) ? pColumns_e.concat(operation) : pColumns_e

  const components: any = {
    body: {
      cell: EditableCell,
    },
  };
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record: any) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        col // 列信息
      })
    }
  })
  return (
    <div className='editable'>
      <Form form={form} component={false}>
        <Table
          title={() => tableTitle}
          components={components}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            defaultPageSize: 30,
            hideOnSinglePage: true
          }}
          loading={loading}
        />
      </Form>
    </div>
  );
}

export default EditableTable