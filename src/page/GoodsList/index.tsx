import React, { useState, useEffect } from 'react'
import { Card, Typography, InputNumber, Drawer, Button, Spin } from 'antd'
import Masonry from 'react-masonry-component'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'store/index'
import cartImg from 'static/cart.svg'
import { getGoodsAll } from 'service/goods'
import MapGoodsList from 'component/MapGoodsList'
import Message from 'component/Message'
import { addUserCart, getUserCart } from 'service/cart'
import { LoadingOutlined } from '@ant-design/icons'
import defaultImg from 'static/goods_default.jpeg'
import './index.less'
const { Paragraph, Text } = Typography
export interface IGoods {
  id: number
  name: string
  photo?: string
  stock: number,
  description?: string
  salesVolume?: number
  unit?: string
  price?: number
  classify?: any
  shop?: any
  num: number
  inputNumber: number
  cartId?: number
  orderInfo?: {
    status: any,
    money: number,
    date: string,
    orderId: string
  }
}

export interface ICartNum {
  number: number // 种类
  count: number // 总数
  money: number // 总金额
}

const GoodsList = () => {
  const userInfo = useSelector((state: RootState) => (state.userInfo))
  const history = useHistory()
  const [visible, setVisible] = useState(false)
  const [goodsList, setGoodsList] = useState<IGoods[]>([])
  const [loading, setLoading] = useState(false)
  const [changeCartLoading, setChangeCartLoading] = useState(false)
  // 当前加购商品集 
  const [cartGoods, setCartGoods] = useState<IGoods[]>([])
  // 当前加购商品数量信息
  const [cartNum, setCartNum] = useState<ICartNum>({
    number: 0,
    count: 0,
    money: 0
  })
  useEffect(() => {
    const getGoodsList = async () => {
      // 获取商品
      await getGoodsAllData()
      // 获取用户购物车
      await getUserCartData()
    }
    getGoodsList()
  }, [])
  const getGoodsAllData = async () => {
    setLoading(true)
    const data = await getGoodsAll()
    let { list }: { list: any[] } = data as any
    list = list.map((item, index) => ({
      ...item,
      num: 0,
      inputNumber: 1,
    }))
    setGoodsList(list)
    setLoading(false)
  }
  const getUserCartData = async () => {
    const { id } = userInfo
    if (id) {
      setLoading(true)
      const data = await getUserCart({
        userId: id
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
  useEffect(() => {
    if (!cartGoods.length) {
      getUserCartData()
    }
  }, [userInfo])

  // 购物车列表发生变化时，设置购物车数量、当前商品列表选中商品
  useEffect(() => {
    setChangeCartLoading(true)
    // 改变当前搜索商品列表中购物车选中的商品
    let list = []
    list = goodsList.map((goods) => {
      const cartInfo = cartGoods.find((item) => (item.id === goods.id))
      const num = cartInfo && cartInfo.num ? cartInfo.num : 0
      return {
        ...goods,
        num
      }
    })
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
    setGoodsList(list)
    setChangeCartLoading(false)
  }, [cartGoods])
  const toAddCart = async (goods: IGoods) => {
    const { id, inputNumber } = goods
    const { id: userId, username } = userInfo
    if (userId && username) {
      if (inputNumber) {
        setChangeCartLoading(true)
        await addUserCart({
          userId: userId,
          goodsId: id,
          num: inputNumber
        })
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
        setChangeCartLoading(false)
      }
    } else {
      Message({
        msg: '您还没有登录, 请先登录!'
      })
    }
  }
  // 去结算 跳转到 CheckOrder 页面
  const toCheckoutCart = () => {
    history.push({
      pathname: `/check-order`,
    })
  }
  return (<div className='goods-list'>
    {
      loading ? <div style={{
        textAlign: 'center'
      }}><Spin
          tip="正在加载"
          className='spin' /></div> : (
          <><Masonry
            className={'my-gallery-class'}
            options={{
              transitionDuration: 4,
              gutter: 24,
            }}
          >
            {goodsList.map((goods: any, index: number) => {
              const {
                name,
                photo = '',
                stock,
                description,
                salesVolume,
                unit,
                price,
                classify,
                shop,
                num,
                inputNumber
              } = goods
              const goodsPhoto = photo ? photo : defaultImg
              return (
                <Card key={index} className='goods-item'>
                  <div className='goods-item-content'>
                    <img className='photo' src={goodsPhoto} alt='' />
                    <div className='goods-info'>
                      <div className='title'>
                        {name}  {shop && shop.name}
                        <div className='money'>
                          ￥{price}/{unit}
                        </div>
                      </div>
                      <Paragraph
                        ellipsis={{
                          rows: 2,
                        }}
                        style={{
                          marginBottom: '5px'
                        }}
                      >
                        {
                          classify && classify.name ? <>【{classify.name}】</> : null
                        }
                        {description}
                      </Paragraph>

                      <div className='number'>
                        <Text type="warning">月销量 {salesVolume}</Text>
                        <Text disabled> / 库存 {stock}</Text>
                      </div>

                      <div className='line'>
                        <div className='cart'>
                          <InputNumber
                            min={1}
                            max={stock}
                            defaultValue={Math.min(stock, inputNumber)}
                            onChange={(value) => {
                              goods.inputNumber = value
                            }}
                          />
                          <Button className='add' danger onClick={() => { toAddCart(goods) }}>
                            <img src={cartImg} alt='' className='cart-img' />
                            <span>加购</span>
                          </Button>
                          {
                            num ? (
                              <span className='cart-num'>
                                <span className='inner'>{num}</span>
                              </span>
                            ) : null
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>)
            })}
          </Masonry>
            {
              cartNum.number ?
                (<div className='cart-footer'>
                  <div className='title'
                    onClick={() => setVisible(true)}
                  >
                    <img src={cartImg} alt='' className='cart-img' />
                    <span>
                      当前加购 {cartNum.number} 种商品，共 {cartNum.count} 件，总金额 {cartNum.money} ￥
              </span>
                  </div>
                  <div onClick={() => toCheckoutCart()} className='checkout-btn'>
                    <Button type='primary'>去结算</Button>
                  </div>
                </div>)
                : null
            }
          </>
        )
    }
    <Drawer
      title='我的购物车'
      width={400}
      placement={'left'}
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
    >
      <MapGoodsList
        goodsList={cartGoods}
        setCartGoods={setCartGoods}
        setChangeCartLoading={setChangeCartLoading}
        userInfo={userInfo}
      />
    </Drawer>
    <div className='cart-change-loading'>
      {
        changeCartLoading ? (
          <Spin
            tip="正在加载"
            indicator={<LoadingOutlined
              style={{ fontSize: 20 }} spin />} />
        ) : null
      }
    </div>

  </div>)
}

export default GoodsList