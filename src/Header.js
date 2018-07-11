import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './Header.css';
import banner from "./images/hulkbanner1.jpg";
import etlogo from "./images/etlogoround.png";
import { auth } from './firebase';

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.state = {
      collapsed: true,
      userlogged: false
    };
    
  }
  componentWillMount(){
    this.setState({
      userlogged: this.props.childProps.isAuthenticated,
    });
  }
  toggleMenu() {
    this.setState({
    collapsed: !this.state.collapsed,
    });
    //console.log("value changed :" + this.state.collapsed);
  }
  /*toggleStatus() {
    if(auth.currentUser != null && this.state.userlogged){
      this.setState({
        userlogged: !this.state.userlogged,
        });
    }
      console.log("status changed :" + this.state.userlogged);
      //onClick={this.toggleStatus.bind(this)}
  }*/
  handleLogout = event => {
    this.props.childProps.userHasAuthenticated(false);
    auth.doSignOut();
  }
  render() {
    const classMenu = this.state.collapsed ? 'menu' : 'menu responsive';
    const classHide = this.props.childProps.isAuthenticated ? 'hide' : 'show';
    const classShow = !this.props.childProps.isAuthenticated ? 'hide' : 'show';
    //const classMenu = this.state.collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    return (
      /*<div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <img src="https://png.icons8.com/color/1600/hulk.png" className="logo"/>
          <button onClick={this.toggleMenu} className= "navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={classMenu} id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/"><strong>Home</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about"><strong>About</strong></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Contact"><strong>Contact Us</strong></Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>*/
      <div>
        <div className="navigation">
          <img src={etlogo} alt = "logo" className="logo"/>
          <div className={classMenu}>
            <ul>
              <li className={classShow}><Link to="/home"><strong>Home</strong></Link></li>
              <li className={classShow}><Link to="/account"><strong>Account</strong></Link></li>
              <li className={classShow}><Link to="/Bills"><strong>Bills</strong></Link></li>
              <li className={classShow}><Link to="/contact"><strong>Contact</strong></Link></li>
              <li className={classShow}><Link onClick={this.handleLogout} to="/login"><strong>Logout</strong></Link></li>
              <li className={classHide}><Link to="/login"><strong>Login</strong></Link></li>
              <li className={classHide}><Link to="/signup"><strong>Signup</strong></Link></li>
              <li className="icon1"><a onClick={this.toggleMenu}>&#9776;</a></li>
            </ul>
          </div>
        </div>
        <div>
          {/*<img src={banner} alt = "logo" className="banner"/>*/}
        </div>
      </div>
      
    );
  }
}

export default Header;