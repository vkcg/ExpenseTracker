import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import AppHome from './AppHome.js';
import Home from './Home.js';
import Account from './Account.js';
import Bills from './Bills.js';
import PageNotFound from "./PageNotFound";
import Login from './Login.js';
import Signup from './Signup.js';
import ForgotPassword from './ForgotPassword.js';
import './App.css';

class Main extends Component {
  componentWillMount(){
    //console.log(this.props.childProps);
  }
  render() {
    return (
        <div>
          <Switch>
            <Route path="/" exact render={(props) => <AppHome {...props} childProps={this.props.childProps} />}/>  
            <Route path="/home" render={(props) => <Home {...props} childProps={this.props.childProps} />}/>
            <Route path="/account" render={(props) => <Account {...props} childProps={this.props.childProps} />}/>
            <Route path="/bills" render={(props) => <Bills {...props} childProps={this.props.childProps} />}/>
            <Route path="/login" render={(props) => <Login {...props} childProps={this.props.childProps} />}/>
            <Route path="/signup" render={(props) => <Signup {...props} childProps={this.props.childProps} />}/>
            <Route path="/resetpassword" render={(props) => <ForgotPassword {...props} childProps={this.props.childProps} />}/>
            <Route path='*' exact component={PageNotFound} />
          </Switch>
        </div>
    );
  }
}

export default Main;