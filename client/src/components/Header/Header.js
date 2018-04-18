// React Imports
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="header">
                {localStorage.getObject('auth-token') ? <h1>{localStorage.getObject('auth-token').emp_type}</h1> : false}
                <Link to="/">Home</Link>
                <Link to="/browse">Browse</Link>
                <Link to="/orders">Orders</Link>
            </div>
        )
    }
};

export default Header;