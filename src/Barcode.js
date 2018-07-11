import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { firebase } from './firebase';

class Barcode extends Component {
  constructor(props) {
    super(props);
    this.toLogin = this.toLogin.bind(this);
    this.toSignup = this.toSignup.bind(this);
  }
  
  componentWillMount(){
    //console.log(this.props.childProps.isAuthenticated);
    firebase.auth.onAuthStateChanged(authUser => {
      if(authUser){this.props.history.push("/home");}
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
        <div class="row">
	<div class="col-lg-6">
		<div class="input-group">
			<input id="scanner_input" class="form-control" placeholder="Click the button to scan an EAN..." type="text" /> 
			<span class="input-group-btn"> 
				<button class="btn btn-default" type="button" data-toggle="modal" data-target="#livestream_scanner">
					<i class="fa fa-barcode"></i>
				</button> 
			</span>
		</div>
	</div>
</div>
<div class="modal" id="livestream_scanner">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h4 class="modal-title">Barcode Scanner</h4>
			</div>
			<div class="modal-body" style="position: static">
				<div id="interactive" class="viewport"></div>
				<div class="error"></div>
			</div>
			<div class="modal-footer">
				<label class="btn btn-default pull-left">
					<i class="fa fa-camera"></i> Use camera app
					<input type="file" accept="image/*;capture=camera" capture="camera" class="hidden" />
				</label>
				<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>
        </div>
    );
  }
}

export default Barcode;



