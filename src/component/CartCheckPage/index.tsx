import React from 'react'
import { useHistory } from 'react-router-dom'
import { Spin, Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import cartImg from 'static/cart.svg'
import { ICartNum } from 'page/GoodsList'
import './index.less'
const CartCheckPage = ({
  pageLoading = false,
  changeCartLoading = false,
  component = null,
  needCartNum = true,
  cartNum = null,
  isOrderCheck = false,
  onSubmitOrder
}: {
  pageLoading: boolean,
  changeCartLoading?: boolean,
  component: React.ReactNode,
  needCartNum?: boolean,
  cartNum?: ICartNum | null,
  isOrderCheck?: boolean
  onSubmitOrder?: any
}) => {
  const history = useHistory()
  const onClickBtn = () => {
    if (!isOrderCheck) {
      // 去结算 跳转到 CheckOrder 页面
      history.push({
        pathname: `/check-order`,
      })
    } else {
      onSubmitOrder!()
    }
  }
  return (
    <div className='cart-checkpage'>
      {
        pageLoading ? (
          <div className='cart-checkpage-loading'>
            <Spin tip="正在加载" className='spin' />
          </div>
        ) : <div className='cart-checkpage-content'>
            {component}
            {
              needCartNum && cartNum && cartNum.number
                ? (
                  <div className='cart-footer'>
                    <div className='cart-footer-title'>
                      <img src={cartImg} alt='' className='cart-icon' />
                      <span>
                        当前加购 {cartNum.number} 种商品，共 {cartNum.count} 件，总金额 {cartNum.money} ￥
                      </span>
                    </div>
                    <div onClick={onClickBtn} className='cart-footer-btn'>
                      <Button type='primary'>
                        {
                          isOrderCheck ? '提交订单' : '去结算'
                        }
                      </Button>
                    </div>
                  </div>)
                : null
            }
            {
              changeCartLoading ? (
                <div className='cart-change-loading'>
                  <Spin
                    tip="正在加载"
                    indicator={
                      <LoadingOutlined style={{ fontSize: 20 }} spin />
                    } />
                </div>
              ) : null
            }
          </div>
      }
    </div>
  )
}
export default CartCheckPage