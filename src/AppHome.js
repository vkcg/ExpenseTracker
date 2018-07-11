import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import "./AppHome.css";
import { firebase } from './firebase';

class AppHome extends Component {
  constructor(props) {
    super(props);
    this.toLogin = this.toLogin.bind(this);
    this.toSignup = this.toSignup.bind(this);
  }

  componentWillMount() {
    //console.log(this.props.childProps.isAuthenticated);
    firebase.auth.onAuthStateChanged(authUser => {
      if (authUser) { this.props.history.push("/home"); }
    });
  }

  handleSubmit = event => {
    event.preventDefault();
  }

  toLogin() {
    this.props.history.push("/login");
  }

  toSignup() {
    this.props.history.push("/signup");
  }
  render() {
    return (
      <div className="homebuttons">
        <section className="jumbotron text-center">
          <div className="container-fluid">
            <h1 className="jumbotron-heading">Expense Tracker</h1>
            <p className="lead text-muted">Track, Manage and Plan your expenses at one place!</p>
          </div>
        </section>
        <form>
          <div className="row">
            <Button block bsStyle="primary" bsSize="large" onClick={this.toLogin} >
              Login
          </Button>
            <Button block bsStyle="primary" bsSize="large" onClick={this.toSignup} >
              Signup
          </Button>

          </div>
        </form>
      </div>
    );
  }
}

export default AppHome;