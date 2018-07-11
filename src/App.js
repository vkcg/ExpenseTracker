import React, { Component } from 'react';
import './App.css';
//import { Route, Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import { firebase } from './firebase';

class App extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      isAuthenticated: false
    };
  }

  componentWillMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser ? this.setState({ isAuthenticated: true }) : this.setState({ isAuthenticated: false });
    });
  }
  userHasAuthenticated = authenticated => {
    console.log('user has authenticated');
    this.setState({ 
      isAuthenticated: authenticated 
    });
    console.log(this.state.isAuthenticated);
  }
  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    }
    return (
      <Router>
        <div>
          <Header childProps={childProps}/>
          <Main childProps={childProps}/>
        </div>
      </Router>
    );
  }
}

export default App;
