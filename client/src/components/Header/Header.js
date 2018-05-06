// React Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import '../../Assets/css/Header.min.css';

class Header extends Component {
    render() {
        return localStorage.getObject('auth-token') ? (
            <div className="header">
                <h1>{localStorage.getObject('auth-token').emp_type}</h1>
                <div className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/browse">Browse</Link>
                    <Link to="/orders">Orders</Link>
                </div>
            </div>
        ) : (
            <div className="header">
                <h1>Welcome</h1>
            </div>
        )
    }
};

export default Header;