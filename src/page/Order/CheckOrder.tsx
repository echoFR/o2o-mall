import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { EnvironmentOutlined, LeftOutlined } from '@ant-design/icons'
import moment from 'moment'
import { addOrder } from 'service/order'
import { deleteUserCart, getUserCart } from 'service/cart'
import { IGoods, ICartNum } from 'page/GoodsList'
import MapGoodsList from 'component/MapGoodsList'
import CartCheckPage from 'component/CartCheckPage'
import { useSelector } from 'react-redux'
import { RootState } from 'store/index'
import './index.less'
import Message from 'component/Message'
const CheckOrder = () => {
  const history = useHistory()
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo
  })
  const [loading, setLoading] = useState(false)
  const [cartGoods, setCartGoods] = useState<IGoods[]>([])
  const [changeCartLoading, setChangeCartLoading] = useState(false)
  // 当前加购商品数量信息
  const [cartNum, setCartNum] = useState<ICartNum>({
    number: 0,
    count: 0,
    money: 0
  })
  useEffect(() => {
    if (!userInfo.username || userInfo.isAdmin) {
      Message({
        msg: '您还没有登录, 请先登录!'
      })
      history.push('/')
    }
    // 获取用户购物车
    const getUserCartData = async () => {
      const { id: userId } = userInfo
      if (userId) {
        setLoading(true)
        const data = await getUserCart({
          userId
        }) as any
        let list = data.map((item: any) => {
          const { goods, num, id } = item
          return {
            cartId: id,
            ...goods,
            num,
            inputNumber: 1,
          }
        })
        setCartGoods(list)
        setLoading(false)
      }
    }
    getUserCartData()
  }, [])
  // 购物车列表发生变化时，设置购物车数量
  useEffect(() => {
    setLoading(true)
    // 设置购物车数量
    let count = 0
    let money = 0
    cartGoods.forEach(({
      num = 0,
      price = 0
    }: any) => {
      count += num
      money += num * price
    })
    setCartNum({
      number: cartGoods.length,
      count: count,
      money: money
    })
    setLoading(false)
  }, [cartGoods])

  const getCheckOrderContent = () => {
    return (
      <div>
        {
          userInfo ? (<div className='user-info'>
            <EnvironmentOutlined />
            <div className='user-info-content'>

              <div className='name'>
                {userInfo.name} | {userInfo.phone}
              </div>
              <div className='address'>
                {userInfo.address}
              </div>
            </div>
          </div>) : null
        }
        <MapGoodsList
          goodsList={cartGoods}
          setCartGoods={setCartGoods}
          setChangeCartLoading={setChangeCartLoading}
          userInfo={userInfo}
        />
      </div>
    )
  }
  const onSubmitOrder = async () => {
    const date = new Date()
    const dataString = moment(date).format('YYYYMMDDhhmmss')
    const { id: userId } = userInfo
    const orderId = `${userId}-${dataString}`
    if (userId) {
      const goodSetList = cartGoods.map((goods: IGoods) => {
        return {
          orderId,
          goodsId: goods.id,
          num: goods.num
        }
      })
      setChangeCartLoading(true)
      try {
        await addOrder({
          id: orderId,
          userId,
          money: cartNum.money,
          date: moment(date).format('YYYY-MM-DD hh:mm:ss'),
          freight: 8,
          goodSetList
        })
        // 删除购物车
        const deleteID = cartGoods.map(item => ({ id: item.cartId! }))
        await deleteUserCart(deleteID)
        history.push({
          pathname: `/user/orderlist`,
        })
      } catch (error) {
      }
      setChangeCartLoading(false)
    }
  }
  return (
    <div className='check-order'>
      <div style={{
        cursor: 'pointer'
      }} onClick={() => history.go(-1)}>
        <LeftOutlined /> 返回
      </div>
      <CartCheckPage
        pageLoading={loading}
        component={getCheckOrderContent()}
        cartNum={cartNum}
        changeCartLoading={changeCartLoading}
        isOrderCheck={true}
        onSubmitOrder={() => { onSubmitOrder() }}
      />
    </div>
  )
}

export default CheckOrder