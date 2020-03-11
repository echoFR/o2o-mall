import * as React from 'react'
import { Parallax } from 'rc-scroll-anim'
const Contribute = () => {
  const contributers = [
    { name: 'xiaoqiang', role: '' },
    { name: 'xiaofeng', role: '' },
    { name: 'zhen', role: '' },
    { name: 'yao', role: '' },
    { name: 'xiaopang', role: '' },
    { name: 'wang', role: '' },
  ]
  return (
    <div className="home-contribute">
      <Parallax
        className="home-contribute-content"
        animation={{ y: 0, opacity: 1 }}
        style={{ transform: 'translateY(30px)', opacity: 0 }}
      >
        <div className="page-title"
          key="title"
        >
          <h2 key="h2">项目贡献者</h2>
          <i key="i" className="line" />
          <div className="subtitle">
            该项目为团队开发，感谢每一位参与者！
          </div>
        </div>
        <div
          className="home-contribute-content-main"
        >
          {
            contributers.length ?
              contributers.map((item) => {
                return (
                  <div key={item.name} className="contributor">
                    <span className="name">{item.name}</span>
                  </div>
                )
              }) : null
          }
        </div>
      </Parallax>
    </div>
  )
}

export default Contribute
