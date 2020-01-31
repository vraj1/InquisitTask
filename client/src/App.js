import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import UsersMain from './components/UsersMain';
import NavigationBar from './components/NavigationBar';
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
      <div className="App Container">
          <NavigationBar />
          <div className="MainContainer">
              <Route exact path = "/" component={Home}/>
              <Route exact path = "/register" component={Register}/>
              <Route exact path = "/login" component={Login}/>
              <Route exact path = "/profile" component={UsersMain}/>
          </div>
       </div>
    </Router> 
    );
  }
}

export default App;