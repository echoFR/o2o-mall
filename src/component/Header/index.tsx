import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import SelfModal from 'component/SelfModal'
import { userRegister, userLogin, getUserInfo } from 'service/user'
import { RootState } from 'store/index'
import { updateUserInfo, deleteUserInfo } from 'store/userInfo/actions'
import './index.less'
import userImg from 'static/user.svg'
import logoImg from 'static/logo.svg'
import data from './data'

const Header = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo
  })
  const history = useHistory()
  const dispath = useDispatch()
  const [visible, setVisible] = useState(false)
  const [loginForm] = Form.useForm()
  const [registeVisible, setRegisteVisible] = useState(false)
  const [registeForm] = Form.useForm()
  const [isLogin, setIsLogin] = useState(false)
  useEffect(() => {
    const { username } = userInfo
    if (username) {
      setIsLogin(true)
    }
  }, [])
  const goLogin = () => {
    loginForm.validateFields().then(async (values) => {
      const { username, password } = values
      try {
        const data = await userLogin({
          username, password
        }) as any
        if (data) {
          const { username } = data
          dispath(updateUserInfo({
            ...data
          }))
          const info = await getUserInfo({ username })
          dispath(updateUserInfo({
            ...info,
            ...data
          }))
          setIsLogin(true)
        }
        setVisible(false)
      } catch (error) {

      }
    })
  }
  const getFormItems = (itemData: any) => {
    return Object.keys(itemData).map(key => ({
      title: itemData[key],
      dataIndex: key
    }))
  }
  const getLoginModal = () => {
    const userData: any = {
      username: '用户名',
      password: '密码'
    }
    const formItemList = getFormItems(userData)
    return (
      <SelfModal
        title='登录'
        visible={visible}
        form={loginForm}
        formName='user-login'
        formItemList={formItemList}
        onModalCancel={() => setVisible(false)}
        onModalClick={goLogin}
        ModalClickText='登录'
      />
    )
  }

  const goRegiste = () => {
    registeForm.validateFields().then(async (values) => {
      const { username, password } = values
      try {
        await userRegister({
          username, password
        })
      } catch (error) {

      }
    })
  }
  const getRegisteModal = () => {
    const optional = ['address']
    const userData: any = {
      username: '用户名',
      password: '密码',
    }
    const formItemList = getFormItems(userData)
    return (
      <SelfModal
        title='注册'
        visible={registeVisible}
        form={registeForm}
        formName='user-registe'
        formItemList={formItemList}
        optionalItemList={optional}
        onModalCancel={() => setRegisteVisible(false)}
        onModalClick={goRegiste}
        ModalClickText='注册'
      />
    )
  }
  const getMenu = (isAdmin: boolean) => {
    const userlist = [{
      name: '个人信息',
      href: '/user/info'
    }, {
      name: '我的订单',
      href: '/user/orderlist'
    }]
    const list = isAdmin ? [] : userlist
    const menu = (
      <Menu>
        {
          list.map(({ name = '', href = '' }) => (
            <Menu.Item key={name}>
              <Link to={href}>
                {name}
              </Link>
            </Menu.Item>
          ))
        }
        <Menu.Item onClick={() => {
          dispath(deleteUserInfo())
          setIsLogin(false)
          history.push('/')
        }}>
          退出
        </Menu.Item>
      </Menu>
    )
    return menu
  }
  const { isAdmin = false, username } = userInfo
  return (
    <header className='header'>
      <div className='header-logo'>
        <Link to="/" replace className="link">
          <img alt="logo" src={logoImg} className='img' />
        </Link>
        <span>o2o 电子商城</span>
      </div>
      <div className='header-list'>
        <ul>
          <li key='home'>
            <Link to={'/'} replace >首页</Link>
          </li>
          {
            data.map(item => (
              <li key={item.name}>
                <Link to={item.to}  >{item.name}</Link>
              </li>
            ))
          }
        </ul>
        <span className='gutter'></span>
        {
          isLogin ? (<ul>
            {
              isAdmin ? '' : (<>
                <li>
                  <Link to='/user/orderlist'>
                    我的订单
                  </Link>
                </li>
                <li>
                  <Link to='/user/cartlist'>
                    我的购物车
                  </Link>
                </li>
              </>)
            }
            <li>
              <Dropdown overlay={getMenu(isAdmin)}>
                <Link className='userinfo' to={isAdmin ? '/admin' : '/user'}>
                  <img alt="logo" src={userImg} className='img' />
                  {isAdmin ? `管理员：` : `用户：`}
                  {username} <DownOutlined style={{ marginLeft: '5px' }} />
                </Link>
              </Dropdown>
            </li>
          </ul>)
            : (<ul>
              {
                ['登录', '注册'].map((name: any) => {
                  return (<li key={name} onClick={() => {
                    if (name === '登录') setVisible(true)
                    else setRegisteVisible(true)
                  }}>{name}</li>)
                })
              }
            </ul>)
        }
        {getLoginModal()}
        {getRegisteModal()}
      </div>
    </header>
  )
}
export default Header