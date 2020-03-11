import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.less';
import Header from 'component/Header';
import Footer from 'component/Footer'
import Home from 'page/Home'
import User from 'page/User'
import Admin from 'page/Admin'
import GoodsList from 'page/GoodsList'
import CheckOrder from 'page/Order/CheckOrder'

const content: any = {
  '/home': Home,
  '/user': User,
  '/admin': Admin,
  '/goods-list': GoodsList,
  '/check-order': CheckOrder
}

function App() {
  return (
    <Router>
      <div className="o2o-mall">
        <Header />
        <div className="o2o-mall-content">
          <Switch>
            <Route path="/"
              exact render={() => (
                <Redirect to="/home" />
              )} />
            <Route path="/user"
              exact render={() => (
                <Redirect to="/user/info" />
              )} />
              <Route path="/admin/"
              exact render={() => (
                <Redirect to="/admin/userinfo" />
              )} />
            {
              Object.keys(content).map((key, index) => {
                const el = content[key]
                return (
                  <Route path={key} key={index} component={el} />
                )
              })
            }
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
