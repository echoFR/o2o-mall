## O2O 电子商城
因课设而生的项目，和同组的一个 JAVA 后台小伙伴合作完成的一款前后端分离 O2O 电子商城。如果有不足的地方，欢迎还请不吝赐教。

课设大概都是这种项目吧? 前人栽树后人乘凉, 我好好补充一下 README 吧 ~

前端是 create-react-app 构架，项目基本目录都是一样的，
技术栈是基于 **React Hooks + Redux + Typescript** 实现，利用了 Ant-Design 的部分组件。

### 安装 & 运行
- 首先你需要安装 node，装好之后 node 自带 npm
- 装好之后终端进入项目主目录，然后执行下面的两个步骤：
```
npm install // 安装依赖
npm run start // run
```
- 另外项目也可以使用 yarn 来跑（推荐）

```
yarn
yarn start
```
1. 客户端登录：
用户名：fengrong；密码：123456

2. 管理端登录：
用户名：xiaofeng；密码：123456

### 主要功能
未登录状态可查看：
- 首页
- 登录 & 注册

根据登录用户角色分为客户端和管理端：
1. 客户端：
- 商品列表
- 用户信息
- 修改密码
- 我的购物车
- 我的订单
2. 管理端
- 用户管理
- 店铺管理
- 订单管理
- 商品管理
- 商品分类管理