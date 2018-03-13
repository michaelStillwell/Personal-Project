// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../ducks/reducer';
import { Link } from '../../../imports';

class WarehouseHeader extends Component {
    render() {
        let win = window.innerWidth > 1024;
        return (
            <div className='header-container'>
                {win ? (
                    <div>
                        <h1 className='title'>Warehouse</h1>
                        <nav className='menu-items'>
                            <a href='#/'>Home</a>
                            <a href='#/browse'>Browse</a>
                            <a href='#/orders'>Orders</a> 
                            <a href='#/' onClick={() => this.props.logoutUser()}>Logout</a>
                        </nav>
                    </div>
                ) : (
                    <div className='hamburger-container'>
                        <h1>Warehouse</h1>
                        <nav>
                            <div id='menuToggle'>
                                <input type='checkbox'/>
                                <span></span>
                                <span></span>
                                <span></span>

                                <ul id='menu'>
                                    <a href="#"><li>Home</li></a>
                                    <a href="#/browse"><li>Browse</li></a>
                                    <a href="#/orders"><li>Orders</li></a>
                                    <a href="#"><li>Logout</li></a>
                                </ul>
                            </div>
                        </nav>
                    </div>
                )}  
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser })(WarehouseHeader);