import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Practice from './components/practice/practice'
import Home from './components/home/home'

/**
 * 傻逼文档 要安装也不写
 */
function App() {
  return (
    <>
      
      <Router>
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
      </ul>
        {/* <Route exact path="/" component={App}> */}
          <Route path="/home" component={Home}></Route>
          <Route path="/practice" component={Practice}></Route>
        {/* </Route> */}
      </Router>
      {/* {this.props.children} */}
    </>
  );
}

export default App
