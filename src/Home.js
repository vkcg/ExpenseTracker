import React, { Component } from 'react';
import './Home.css';
import Loader from './Loader';
import profilepic from "./images/et.jpg";
import { auth } from './firebase/firebase';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null
    }
  }
  componentWillMount() {
    //console.log(this.props.childProps.isAuthenticated);
    auth.onAuthStateChanged(authUser => {
      if (authUser && this.state.name == null) {
        this.setState({ name: authUser.displayName, email: authUser.email });
      }
      else if (!authUser) {
        //this.setState(this.state);
        //console.log('no user');
        this.props.history.push("/login");
      }
    });
  }
  componentWillUnmount() {
    //console.log(this.props.childProps.isAuthenticated);
  }
  render() {
    if (this.state.name != null) {
      return (
        <div>
          <br />
          <div className="container">
            <div className="row">
              <div className="col-md-4 homeLeft">
                <img src={profilepic} alt="Profile pic" className="pic" />
              </div>
              <div className="col-md-8 homeRight">
                <div className="raisedbox">
                  <h1 className="greet">Welcome</h1>
                  <p className="username">{this.state.name}</p>
                  {/*<p className = "greetdesc">Track your expenses</p>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (<Loader />);
  }
}

export default Home;