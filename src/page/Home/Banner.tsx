import React from 'react';
import QueueAnim from 'rc-queue-anim';
import BannerImage from './BannerImage';
const Banner = () => {
  return (
    <div>
      <div className="home-banner">
        <QueueAnim delay={300} ease="easeOutQuart">
          <h1 key="h2">
            o2o 电子商城
            </h1>
          <p key="p">为您提供专业的 o2o 电子商城，满足蔬菜销售行业的需求</p>
          <span key="button">
          </span>
        </QueueAnim>
        <div>
          <BannerImage />
        </div>
      </div>
    </div>
  )
}

export default Banner;