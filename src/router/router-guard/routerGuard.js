//routerGuard.js
import React, { Component } from 'react'
import { Route, Redirect } from "react-router-dom";

class RouterGuard extends Component {
    constructor(props) {
        super(props)
        this.state = {
          isLogin: false
        }
    }
    componentWillMount() {

        // let { history: { replace }, authorization, location } = this.props
        // if (authorization) replace('./login')
        // if (location.pathname === '/') replace('./asd')
        // console.log('路由跳转前的拦截', this.props)
    }
    render() {
      let route = this.props.route
      console.log('route', route)
      const isLogin =  sessionStorage.getItem('uId') || route.path.indexOf('login') > 0 
        return isLogin ? <route.component {...route}/> : <Redirect to='/login' />
    }
}

export default RouterGuard
