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
                            <Link to='/'>Home</Link>
                            <Link to='/browse'>Browse</Link>
                            <Link to='/orders'>Orders</Link> 
                            <Link to='/' onClick={() => this.props.logoutUser()}>Logout</Link>
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
                                    <Link to="/"><li>Home</li></Link>
                                    <Link to="/browse"><li>Browse</li></Link>
                                    <Link to="/orders"><li>Orders</li></Link>
                                    <Link to="/"><li>Logout</li></Link>
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