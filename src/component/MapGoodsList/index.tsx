import React from 'react'
import { IGoods } from 'page/GoodsList'
import { InputNumber, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { deleteUserCart, updateUserCart } from 'service/cart'
import defaultImg from 'static/goods_default.jpeg'
import './index.less'
const { Paragraph } = Typography
const MapCartGoodsList = ({
  goodsList,
  setCartGoods, // 购物车
  setChangeCartLoading,
  isOrder = false,
  userInfo
}: {
  goodsList: IGoods[],
  setCartGoods?: (list: IGoods[]) => void
  setChangeCartLoading?: (loading: boolean) => void,
  isOrder?: boolean,
  userInfo: any
}) => {
  // 删除
  const toDeleteCart = async (goods: IGoods) => {
    const { cartId, id } = goods
    setChangeCartLoading!(true)
    try {
      await deleteUserCart([
        {
          id: cartId!
        }
      ])
      // 设置购物车列表
      const list = goodsList.filter((item) => (item.id !== id))
      setCartGoods!(list)
    } catch (error) {
    }
    setChangeCartLoading!(false)
  }
  // 购物车列表 num 改变
  const toChangeCart = async (value: any, goods: IGoods) => {
    setChangeCartLoading!(true)
    const { cartId, id: goodsId } = goods
    await updateUserCart({
      id: cartId!,
      userId: userInfo.id,
      goodsId,
      num: value
    })
    // 设置购物车列表
    const list = goodsList.map((goods: IGoods) => {
      if (goodsId === goods.id) {
        return {
          ...goods,
          num: value
        }
      }
      return goods
    })
    setCartGoods!(list)
    setChangeCartLoading!(false)
  }
  return (
    <div className='map-goodslist'>
      {
        goodsList.length 
        ? goodsList.map((goods: IGoods, index: number) => {
          const {
            name,
            photo,
            stock,
            description,
            unit,
            price,
            shop,
            num,
            orderInfo
          } = goods
          let status, date
          if (orderInfo) {
            status = orderInfo.status
            date = orderInfo.date
          }
          const goodsPhoto = photo ? photo : defaultImg
          return (<div key={index}>
            <div className='goods-item'>
              {
                setCartGoods ? (<DeleteOutlined
                  onClick={() => { toDeleteCart(goods) }}
                  className='remove-btn'
                />) : null
              }
              <div className='info'>
                <div className='photo'>
                  <img className='photo' src={goodsPhoto} alt='' />
                </div>
                <div className='msg'>
                  <div className='title'>
                    <Paragraph
                      ellipsis={{
                        rows: 2,
                      }}
                    >
                      {name} - {shop.name}； {description}
                    </Paragraph>
                  </div>
                  <div className='money-input'>
                    <span>
                      <span className='money'>￥{price}/{unit}</span>
                      <span>
                        当前库存:{stock}
                      </span>
                    </span>
                    {
                      setCartGoods ? (<InputNumber
                        min={1}
                        max={stock}
                        defaultValue={num}
                        onChange={(value) => { toChangeCart(value, goods) }}
                      />) : <div> × {num} 件 </div>
                    }
                  </div>
                </div>
              </div>
            </div>
            {
              isOrder ? (
                <div className='order-btn'>
                  <span>
                    下单时间: {date}
                  </span>
                  <span style={{
                    marginLeft: 20
                  }}>
                    当前状态: {status}
                  </span>
                </div>) : null
            }
          </div>)
        })
      : '暂无数据'
      }
    </div>
  )
}

export default MapCartGoodsList