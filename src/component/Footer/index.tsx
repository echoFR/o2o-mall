import * as React from 'react'
import { Link } from 'react-router-dom'
import footerData from './data'
import logo from 'static/logo.svg'
const Footer = () => <div className="footer">
  <div className="footer-content">
    {
      footerData.map((item: any,index) => {
        return(
          <div key={index} className="footer-content-item">
            <ul>
              <li className="title">
              { item.title.name }
              </li>
              {
                item.list ? item.list.map((_item: any) => (
                  <li key={_item.name}>
                    { _item.name }
                  </li>
                )) : ''
              }
            </ul>
          </div>
        )
      })
    }
    <div>
      <Link to="/" ><img src={logo} alt="logo" className="logo"/></Link> 
    </div>
  </div>
</div>

export default Footer