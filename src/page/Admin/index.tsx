import React, { useEffect } from 'react'
import { AppstoreOutlined, MailOutlined, SolutionOutlined, UserOutlined, BookOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Message from 'component/Message'
import { RootState } from 'store/index'
import NavPage from 'component/NavPage'
import {
  MGoods,
  MOrder,
  MShop,
  MUserInfo,
  MClassify
} from './component'

const userList = [
  {
    name: '用户信息管理',
    href: '/admin/userinfo',
    component: MUserInfo,
    icon: <UserOutlined />
  },
  {
    name: '订单管理',
    href: '/admin/order',
    component: MOrder,
    icon: <SolutionOutlined />
  },
  {
    name: '店铺管理',
    href: '/admin/shop',
    component: MShop,
    icon: <MailOutlined />
  },
  {
    name: '商品管理',
    href: '/admin/goods',
    component: MGoods,
    icon: <AppstoreOutlined />
  },
  {
    name: '分类管理',
    href: '/admin/classify',
    component: MClassify,
    icon: <BookOutlined />
  }
]

const Admin = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo
  })
  const history = useHistory()

  useEffect(() => {
    if (!userInfo.id || !userInfo.username || !userInfo.isAdmin) {
      Message({
        msg: '您还没有登录, 请先登录!'
      })
      history.push('/')
    }
  }, [])
  return (<>
    {
      userInfo.id && userInfo.username && userInfo.isAdmin
        ? <NavPage navList={userList} />
        : null
    }
  </>
  )
}
export default Admin