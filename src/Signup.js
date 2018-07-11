import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel, Alert, Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import LoaderButton from "./LoaderButton.js";
import "./Signup.css";
import { auth } from './firebase';
import  firebase, {auth as au} from './firebase/firebase.js';


class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmationCode: "",
      error: null
    };
    this.handleError = this.handleError.bind(this);
  }
  componentWillMount(){
    //console.log(this.props.childProps.isAuthenticated);
    au.onAuthStateChanged(authUser => {
      if(authUser){this.props.history.push("/home");}
    });
  }

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  handleError() {
    this.setState({ 
        isLoading: false,
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
        error: null });
  }

  handleSubmit = async event => {
    event.preventDefault();
    const usersRef = firebase.database().ref('users');
    const user = { email: this.state.email, name: this.state.name}
    auth.doCreateUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(authUser => {
            if (authUser){
              au.currentUser.updateProfile({
                displayName: this.state.name
              }).then(function() {
                // Update successful.
                console.log('name');
              }).catch(function(error) {
                // An error happened.
                console.log('error', error);
              });
            }
            else {
              //this.setState(this.state);
            }
            usersRef.child(au.currentUser.uid).set(user);
            this.handleError();
            this.props.history.push("/login");
            
        }).catch(err => {
            console.log('error', err);
            this.setState({ 
                isLoading: false,
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                confirmationCode: "",
                error: err.message 
            });
      });
      

  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl autoFocus type="name" value={this.state.name} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl type="email" value={this.state.email} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl value={this.state.confirmPassword} onChange={this.handleChange} type="password" />
        </FormGroup>
        <LoaderButton block bsSize="large" disabled={!this.validateForm()} type="submit" isLoading={this.state.isLoading} text="Signup" loadingText="Signing up…" />
        <p style={{textAlign:"center"}}><br/>Have an account? <Link to="/login"><strong>Login</strong></Link><br/><Link to="/resetpassword"><strong>Forgot Password?</strong></Link></p>
      </form>
    );
  }

  render() {
    if(this.state.error === null)
    {
        return (
          <div className="Signup">
            {this.renderForm()}
          </div>
        );

    }
    return (
        <Alert bsStyle="danger" style={{textAlign:"center"}}>
          <h4>Signup error!</h4>
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

export default Signup;