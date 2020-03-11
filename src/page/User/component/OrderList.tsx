import React, { useState, useEffect, ReactNode } from 'react'
import MapGoodsList from 'component/MapGoodsList'
import CartCheckPage from 'component/CartCheckPage'
import { getOrderByUser } from 'service/order'
import { useSelector } from 'react-redux'
import { RootState } from 'store/index'
import './index.less'
const OrderList = () => {
  const [loading, setLoading] = useState(false)
  const [orderList, setOrderList] = useState<any[]>([])
  const userInfo = useSelector((state: RootState) => {
    return state.userInfo
  })
  // 获取用户订单
  useEffect(() => {
    if (userInfo) {
      const statusObj: any = {
        '-1': '已取消',
        '0': '已下单',
        '1': '配送中',
        '2': '配送完成'
      }
      const getOrderByUserData = async () => {
        setLoading(true)
        const data = await getOrderByUser({
          userId: 9
        }) as any
        let list = data.map((order: any) => {
          const { status, money, date, goodSetList, id: orderId } = order
          return goodSetList.map((goodSet: any) => {
            const { goods, num, id } = goodSet
            return {
              orderInfo: {
                status: statusObj[status],
                money,
                date,
                orderId
              },
              cartId: id,
              ...goods,
              num,
              inputNumber: 1,
            }
          })
        })
        list = list.reduce((pre: any[], cur: any[]) => (pre.concat(cur)))
        setOrderList(list)
        setLoading(false)
      }
      getOrderByUserData()
    }
  }, [userInfo])
  const getOrderContent = (): ReactNode => {
    return (
      <MapGoodsList
        goodsList={orderList}
        userInfo={userInfo}
        isOrder={true}
      />
    )
  }
  return (
    <div className='order-list'
      style={{
        padding: '10px 40px'
      }}
    >
      <CartCheckPage
        pageLoading={loading}
        component={getOrderContent()}
      />
    </div>
  )
}

export default OrderList