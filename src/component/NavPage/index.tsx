import * as React from 'react'
import { Route, Link, useHistory } from 'react-router-dom'
import { Menu } from 'antd'
import './index.less'

const NavPage = ({ navList }: { navList: any[] }) => {
  const history = useHistory()
  const MenuContent = (
    <Menu
      style={{ width: '150px', height: '100%', marginRight: '20px' }}
      selectedKeys={[history.location.pathname]}
    > {
        navList.map(({ name, href, icon }) => {
          return (
            <Menu.Item key={href}>
              <Link to={href}>
                {icon}
                {name}
              </Link>
            </Menu.Item>
          )
        })
      }
    </Menu>
  )
  return (
    <div className='navpage'>
      <div className='menu'>
        {MenuContent}
      </div>
      <div className='content'>
        {
          navList.map(({ component, href }, index) => (
            <Route key={index} path={href} component={component} />
          ))
        }
      </div>
    </div>
  )

}

export default NavPage