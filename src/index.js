import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './css/index.scss'
import App from './App'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Practice from './components/practice/practice'
import Home from './components/home/home'
import Nothing from './components/404/404'

/**
 * Route 是渲染节点，必须包裹在Router里面
 */

const routes = [
  {
    path: '/',
    exact: true,
    component: App
  },
  {
    path: '/home',
    exact: true,
    component: Home
  },
  {
    path: '/home/:id',
    component: Home
  },
  {
    path: '/practice',
    component: Practice
  },
  {
    path: '*',
    component: Nothing
  }
]

ReactDOM.render(
  <Router basename="/xx">
    <ul>
      <li>
        <Link to="/">App</Link>
      </li>
      <li>
        <Link to="/practice">Practice</Link>
      </li>
      <li>
        <Link to="/home">Home</Link>
      </li>
      <li>
        <Link to="/home/1234">home + ID</Link>
      </li>
      <li>
        <Link to="/404">404</Link>
      </li>
    </ul>
    <hr/>
    {/* switch的作用跟js的switch类似，但只会选择一个，这里使用switch之后，
    排在前面的优先级会高于后面，不使用switch的时候*会一直匹配导致404组件一直存在 */}
    <Switch>
      {/* <Route exact path="/" component={App}></Route>
      <Route exact path="/home/:id" component={Home}></Route>
      <Route exact path="/home" component={Home}></Route>
      <Route path="/practice" component={Practice}></Route>
      <Route strict path="*" component={Nothing}></Route> */}
      {
        routes.map((route, i) => (
            <Route key={i} path={route.path} exact={route.exact} 
            render={props => (<route.component {...props} routes={route.routes} />)} />
        ))
      }
    </Switch>
    
  </Router>,
  document.getElementById('root')
);
