// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../ducks/reducer';
import { Link } from '../../../imports';

class FieldHeader extends Component {
    render() {
        let win = window.innerWidth > 1024;
        return (
            <div className='header-container'>
                {
                    win ? (
                        <div>
                            <h1 className='title'>Field</h1>
                            <nav className='menu-items'>
                                <Link to='/'>
                                    Home
                                </Link>
                                <Link to='/browse'>
                                    Browse
                                </Link>
                                <Link to='/orders'>
                                    Orders
                                </Link>
                                <Link to='/' onClick={() => this.props.logoutUser()}>Logout</Link>
                            </nav>
                        </div>
                    ) : (
                        <div className='hamburger-container'>
                            <h1>Field</h1>
                            <nav>
                                <div id='menuToggle'>
                                    <input type='checkbox'/>
                                    <span></span>
                                    <span></span>
                                    <span></span>

                                    <ul id='menu'>
                                        <a href="#"><li>Home</li></a>
                                        <a href="#/browse"><li>Browse</li></a>
                                        <a href="#orders"><li>Orders</li></a>
                                        <a href="#" onClick={() => this.props.logoutUser()}><li>Logout</li></a>
                                    </ul>                                
                                </div>
                            </nav>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser })(FieldHeader);