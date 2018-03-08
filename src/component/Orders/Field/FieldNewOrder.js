// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNewOrderProducts } from '../../../ducks/reducer';

class FieldNewOrder extends Component {
    render() {
        return (
            <div>
                <h1>Create New Order</h1>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getNewOrderProducts })(FieldNewOrder);