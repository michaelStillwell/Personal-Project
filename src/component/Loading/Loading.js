// React Imports
import React, { Component } from 'react';
import logo from '../../Assets/giphy.gif';

class Loading extends Component {
    render() {
        return (
            <div className='loading'>
                <img src={logo} alt="loading"/>
            </div>
        )
    }
}

export default Loading;