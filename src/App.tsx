import React, { Component } from 'react';
import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools';
import './App.css';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import store from './models/index'
import { BrowserRouter as Router, Route, Link, Switch, Redirect,withRouter} from 'react-router-dom';
import Layout from './layouts/Layout';
import { array } from 'prop-types';
// import getRouterData from './common/router';
// const routerData = getRouterData();
export default class App extends Component {
  render() {
    const userStr = localStorage.getItem('user_cloud');
    if (userStr){
      try{
        const user = JSON.parse(localStorage.getItem('user_cloud') || '{}')
        store.user.userInfo = user;
      }catch(e){
        console.error(e)
      }
    }
    return (
      <div>
        <LocaleProvider locale={zh_CN}>
          <Provider {...store} >
            <Router>
              <Switch>
                <Layout user={store.user}/>
              </Switch>
            </Router>
          </Provider>
        </LocaleProvider>
        {/* <DevTools />  */}
        {/* mobx调试工具 */} 
      </div>
    );
  }
}