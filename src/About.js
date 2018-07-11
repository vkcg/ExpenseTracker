import React, { Component } from 'react';
import { auth } from './firebase/firebase';
import Loader from './Loader';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null
    }
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
        <div>
          <p>About!</p>
        </div>
      );
    }
    return <Loader/>;
  }
}

export default About;