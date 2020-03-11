import React, { useEffect } from 'react'
import { MailOutlined, SettingOutlined, SolutionOutlined, AppstoreOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootState } from 'store/index'
import Message from 'component/Message'
import NavPage from 'component/NavPage'
import {
  OrderList,
  Password,
  UserInfo,
  CartList
} from './component'

const userList = [
  {
    name: '个人信息',
    href: '/user/info',
    component: UserInfo,
    icon: <MailOutlined />
  }, {
    name: '我的购物车',
    href: '/user/cartlist',
    component: CartList,
    icon: <AppstoreOutlined />
  },
  {
    name: '我的订单',
    href: '/user/orderlist',
    component: OrderList,
    icon: <SolutionOutlined />
  },
  {
    name: '修改密码',
    href: '/user/change-password',
    component: Password,
    icon: <SettingOutlined />
  }
]

const User = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo
  })
  const history = useHistory()
  useEffect(() => {
    if (!userInfo.id || !userInfo.username || userInfo.isAdmin) {
      Message({
        msg: '您还没有登录, 请先登录!'
      })
      history.push('/')
    }
  }, [])
  return (<>
    {
      userInfo.id && userInfo.username && !userInfo.isAdmin
        ? <NavPage navList={userList} />
        : null
    }
  </>
  )
}
export default User