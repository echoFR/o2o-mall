const userInfoColumns = [
  {
    title: '姓名',
    dataIndex: 'username',
  },
  {
    title: '密码',
    dataIndex: 'password',
  },
  {
    title: '角色',
    dataIndex: 'roles',
  },
  {
    title: '性别',
    dataIndex: 'sex',
    render: (text: string, record: any) =>{
      return text ? '女' : '男'
    }
  },
  {
    title: '生日',
    dataIndex: 'birthday',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '地址',
    dataIndex: 'address',
  }
]

const orderColumns: any[] = [
  {
    title: '订单编号',
    dataIndex: 'id',
  },
  {
    title: '用户 ID',
    dataIndex: 'userId',
  },
  {
    title: '订单金额',
    dataIndex: 'money',
  },
  {
    title: '订单生成日期',
    dataIndex: 'date',
  },
  {
    title: '运费',
    dataIndex: 'freight',
  }
]

const shopColumns: any[] = [
  {
    title: '店铺编号',
    dataIndex: 'id',
  },
  {
    title: '店铺名',
    dataIndex: 'name',
  },
  {
    title: '店铺描述',
    dataIndex: 'description',
  },
]

const goodsColumns = [
  {
    title: '商品编号',
    dataIndex: 'id',
  },
  {
    title: '商品名',
    dataIndex: 'name',
    editable: true
  },
  {
    title: '照片',
    dataIndex: 'photo',
    editable: true,
    optional: true
  },
  {
    title: '描述',
    dataIndex: 'description',
    editable: true
  },
  {
    title: '单位',
    dataIndex: 'unit',
    editable: true
  },
  {
    title: '单价',
    dataIndex: 'price',
    editable: true,
    shouldInputNumber: true
  },
  {
    title: '库存',
    dataIndex: 'stock',
    editable: true,
    shouldInputNumber: true
  },
  {
    title: '月销售量',
    dataIndex: 'salesVolume',
    editable: true,
    shouldInputNumber: true
  },
  {
    title: '分类 ID',
    dataIndex: 'classifyId',
  }, {
    title: '店铺 ID',
    dataIndex: 'shopsId'
  }
]
const classifyColumns= [
  {
    title: '分类编号',
    dataIndex: 'id',
  },
  {
    title: '分类名称',
    dataIndex: 'name',
  },
  {
    title: '描述',
    dataIndex: 'description',
    optional: true,
    editable: true,
  },
]

export {
  userInfoColumns,
  orderColumns,
  shopColumns,
  goodsColumns,
  classifyColumns
}