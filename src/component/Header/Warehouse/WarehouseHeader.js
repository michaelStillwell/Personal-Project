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
                        <div className='title'>
                            <h1>Warehouse</h1>
                        </div>
                        <nav className='menu-items'>
                            <Link to='/'>Home</Link>
                            <Link to='/browse'>Browse</Link>
                            <Link to='/orders'>Orders</Link> 
                            <Link to='/featured'>Featured</Link> 
                            <Link to='/' onClick={() => this.props.logoutUser()}>Logout</Link>
                        </nav>
                    </div>
                ) : (
                    <div className='hamburger-container'>
                        <div className='title'>
                            <h1>Warehouse</h1>
                        </div>
                        <nav>
                            <div id='menuToggle'>
                                <input id='input' type='checkbox'/>
                                <span></span>
                                <span></span>
                                <span></span>

                                <ul id='menu'>
                                <Link to="/" onClick={() => document.getElementById('input').checked = false}><li>Home</li></Link>
                                <Link to="/browse" onClick={() => document.getElementById('input').checked = false}><li>Browse</li></Link>
                                <Link to="/orders" onClick={() => document.getElementById('input').checked = false}><li>Orders</li></Link>
                                <Link to="/featured" onClick={() => document.getElementById('input').checked = false}><li>Featured</li></Link>
                                <Link to="/" onClick={() => {
                                        document.getElementById('input').checked = false;
                                        this.props.logoutUser()
                                }}><li>Logout</li></Link>
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