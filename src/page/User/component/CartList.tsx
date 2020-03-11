import React, { useState, useEffect } from 'react'
import MapGoodsList from 'component/MapGoodsList'
import CartCheckPage from 'component/CartCheckPage'
import { getUserCart } from 'service/cart'
import { IGoods, ICartNum } from 'page/GoodsList'
import { useSelector } from 'react-redux'
import { RootState } from 'store/index'
import './index.less'
const GoodsList = () => {
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo
  })
  const [loading, setLoading] = useState(false)
  const [cartGoods, setCartGoods] = useState<IGoods[]>([])
  const [changeCartLoading, setChangeCartLoading] = useState(false)
  const [cartNum, setCartNum] = useState<ICartNum>({
    number: 0,
    count: 0,
    money: 0
  })
  useEffect(() => {
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
  // 购物车列表发生变化时
  useEffect(() => {
    setChangeCartLoading(true)
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
    setChangeCartLoading(false)
  }, [cartGoods])

  const getCartContent = () => {
    return (
      <MapGoodsList
        goodsList={cartGoods}
        setCartGoods={setCartGoods}
        setChangeCartLoading={setChangeCartLoading}
        userInfo={userInfo}
      />
    )
  }
  return (
    <div className='cart-list'
      style={{
        padding: '10px 40px'
      }}
    >
      <CartCheckPage
        pageLoading={loading}
        component={getCartContent()}
        cartNum={cartNum}
        changeCartLoading={changeCartLoading}
      />
    </div>)
}

export default GoodsList