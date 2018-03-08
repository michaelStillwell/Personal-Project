// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../../../ducks/reducer';
import { Link } from '../../../imports';

class FieldHeader extends Component {
    render() {
        return (
            <div>
                <h1>Header for Field</h1>
                <button onClick={() => this.props.logoutUser()}>Logout</button>
                <Link to='/'>
                    <button>Home</button>
                </Link>
                <Link to='/browse'>
                    <button>Browse</button>
                </Link>
                <Link to='/orders'>
                    <button>Orders</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser })(FieldHeader);