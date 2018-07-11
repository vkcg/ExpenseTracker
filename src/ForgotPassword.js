import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./ForgotPassword.css";

import * as au from './firebase/auth.js';


class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      error: null
    };
  }
  
  componentWillMount(){
    //console.log(this.props.childProps.isAuthenticated);
  }
  validateForm() {
    return this.state.email.length > 0;
  }

  handleChange = event => {
      //console.log(event.target.id);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    au.doPasswordReset(this.state.email)
    .then(() => {
      this.setState(() => ({ 
        email: "",
        error: null
    }));
    this.props.history.push("/login");
    })
    .catch(err => {
        console.log('error', err);
        this.setState({ 
            email: "",
            error: err.message });
    });
  }

  render() {
    return (
      <div className="ResetPassword">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl autoFocus type="email" value={this.state.email} onChange={this.handleChange}/>
          </FormGroup>
          <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
            Reset
          </Button>
        </form>
        <br />
        <p style={{textAlign:"center"}}>Have an account? <Link to="/login"><strong>Login</strong></Link><br/>Don't have an account? <Link to="/signup"><strong>Signup</strong></Link><br/></p>
      </div>
    );
  }
}

export default ForgotPassword;