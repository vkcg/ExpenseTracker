import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import "./Login.css";

import * as au from './firebase/auth.js';
import { firebase } from './firebase';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: null
    };
    this.handleError = this.handleError.bind(this);
  }
  
  componentWillMount(){
    //console.log(this.props.childProps.isAuthenticated);
    firebase.auth.onAuthStateChanged(authUser => {
      if(authUser){this.props.history.push("/home");}
    });
  }
  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }
  handleError() {
    this.setState({ 
        email: "",
        password: "",
        error: null });
  }
  handleChange = event => {
      //console.log(event.target.id);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    //console.log('trying to login...');
    au.doSignInWithEmailAndPassword(this.state.email, this.state.password)
    .then(() => {
      this.setState({ 
        email: "",
        password: "",
        error: null
      });
      this.props.childProps.userHasAuthenticated(true);
      //console.log(this.props.childProps.isAuthenticated);
      this.props.history.push("/home");
    })
    .catch(err => {
        console.log('error', err);
        this.setState({ 
            email: "",
            password: "",
            error: err.message });
    });
    event.preventDefault();
  }
  renderForm() {
    return(
      <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange} />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
          </FormGroup>
          <Button block bsSize="large" disabled={!this.validateForm()} type="submit" >
            Login
          </Button>
          <br />
        <p style={{textAlign:"center"}}>Don't have an account? <Link to="/signup"><strong>Signup</strong></Link><br/><Link to="/resetpassword"><strong>Forgot Password?</strong></Link></p>
        </form>
    );        
  }

  render() {
    if(this.state.error === null)
    {
        return (
          <div className="Login">
            {this.renderForm()}
          </div>
        );

    }
    return (
      <Alert bsStyle="danger" style={{textAlign:"center"}}>
        <h4>Login error!</h4>
        <p>
          {this.state.error}
        </p>
        <p>
          <Button onClick={this.handleError} >Okay!</Button>
        </p>
      </Alert>
  );
  }
}

export default Login;