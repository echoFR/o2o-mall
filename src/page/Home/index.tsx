import * as React from 'react'
import Banner from './Banner'
import Contribute from './Contribute'
import './index.less'
const Home = () => {
  return (
    <div className='home'>
      <Banner />
      <Contribute />
    </div>
  )
}

export default Home