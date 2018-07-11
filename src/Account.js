import React, { Component } from 'react';
import { auth } from './firebase/firebase';
import Loader from './Loader';
//import  firebase from './firebase/firebase';
import { auth as au} from './firebase';
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import './Account.css';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: "",
      confirmPassword: "",
      show: false,
      showNameForm: false,
      showPasswordForm: false
    }
    this.toggleShow = this.toggleShow.bind(this);
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
    this.toggleShowName = this.toggleShowName.bind(this);
    this.editName = this.editName.bind(this);
    this.editPassword = this.editPassword.bind(this);
  }
  validateForm() {
    return (
      this.state.name.length > 0
    );
  }
  validatePasswordForm() {
    return (
      this.state.password === this.state.confirmPassword && this.state.password.length > 5
    );
  }
  toggleShow() {
    this.setState({
        show: !this.state.show
      });
  }
  toggleShowName() {
    this.setState({
        showNameForm: !this.state.showNameForm
      });
      this.toggleShow();
  }
  toggleShowPassword() {
    this.setState({
        showPasswordForm: !this.state.showPasswordForm
      });
      this.toggleShow();
  }
  editPassword() {
    au.doPasswordUpdate(this.state.password)
    .then(() => {
      this.setState({
          password: null,
          confirmPassword: null
      });
    })
    .catch(error => {
        console.log(error);
    });
      this.toggleShowPassword();
  }
  editName() {
    auth.onAuthStateChanged(authUser => {
        if (authUser){
            auth.currentUser.updateProfile({
                displayName: this.state.name
              }).then(function() {
                // Update successful.
                console.log('name');
              }).catch(function(error) {
                // An error happened.
                console.log('error', error);
              });
        }
        else if(!authUser){
          //this.setState(this.state);
          //console.log('no user');
          this.props.history.push("/login");
        }
      });
      this.toggleShowName();

  }
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  componentWillMount(){
    auth.onAuthStateChanged(authUser => {
      if (authUser && this.state.name==null){
        this.setState({ name: authUser.displayName, email: authUser.email});
      }
      else if(!authUser){
        this.props.history.push("/login");
      }
    });
  }
  render() {
    if(this.state.name !=null) {
      return (
        <div className="Account">
            {!this.state.show &&
                <table align="center">
                <thead>
                    <tr align="center">
                        <td colSpan="2"><p>Profile</p></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td align="left"><p>Name</p></td>
                        <td align="right">
                            <div className="btn-group">
                                <p>{this.state.name}</p>
                                <sup onClick={this.toggleShowName}>&nbsp;&nbsp;&nbsp;<strong>Change</strong></sup>  
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="left"><p>Password</p></td>
                        <td align="right">
                            <div className="btn-group">
                                <p>*%$#(@%)</p>
                                <sup onClick={this.toggleShowPassword}>&nbsp;&nbsp;&nbsp;<strong>Change</strong></sup>  
                            </div>
                        </td>
                    </tr>
                    
                    
                </tbody>
                </table>
            }
          { this.state.showNameForm && <form>
            <FormGroup controlId="name" bsSize="large">
                <ControlLabel>Change Name</ControlLabel>
                <FormControl autoFocus type="name" value={this.state.name} onChange={this.handleChange} />
            </FormGroup>
            <Button block bsStyle="primary" bsSize="small" disabled={!this.validateForm()} onClick={this.editName}>Confirm</Button>
            </form>
          }
          { this.state.showPasswordForm && <form>
            <FormGroup controlId="password" bsSize="large">
                <ControlLabel>New Password</ControlLabel>
                <FormControl value={this.state.password} onChange={this.handleChange} type="password" />
            </FormGroup>
            <FormGroup controlId="confirmPassword" bsSize="large">
                <ControlLabel>Confirm New Password</ControlLabel>
                <FormControl value={this.state.confirmPassword} onChange={this.handleChange} type="password" />
            </FormGroup>
            <Button block bsStyle="primary" bsSize="small" disabled={!this.validatePasswordForm()} onClick={this.editPassword}>Confirm</Button>
            <Button block bsStyle="danger" bsSize="small" onClick={this.toggleShowPassword}>Go Back</Button>
            </form>
          }
        </div>
      );
    }
    return <Loader/>;
  }
}

export default Account;