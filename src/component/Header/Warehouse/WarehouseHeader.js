// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../ducks/reducer';
import { Link } from '../../../imports';

class WarehouseHeader extends Component {
    render() {
        return (
            <div className='header-container'>
                <h1>Header for Warehouse</h1>
                <nav>
                    <Link to='/'>
                        <button>Home</button>
                    </Link>
                    <Link to='/browse'>
                        <button>Browse</button>
                    </Link>
                    <Link to='/orders'>
                        <button>Orders</button>
                    </Link>
                    <button className='logout' onClick={() => this.props.logoutUser()}>Logout</button>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser })(WarehouseHeader);