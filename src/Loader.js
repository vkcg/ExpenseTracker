import React, { Component } from 'react';
import './Loader.css';

class Loader extends Component {
    render() {
        return (
            <div>
                <div className = "spinner"></div>
                <h3 className = "center"><strong>Loading....</strong></h3>
            </div>

            
        );
    }
}

export default Loader;