// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FieldOrders from './Field/FieldOrders';
import WarehouseOrders from './Warehouse/WarehouseOrders';
import OwnerOrders from './Owner/OwnerOrders';

class Orders extends Component {
    render() {
        switch(this.props.emp_type) {
            case 'Owner':
                return <OwnerOrders />
            
            case 'Warehouse':
                return <WarehouseOrders />

            case 'Field':
                return <FieldOrders />

            default:
                return <h1>Failed From Orders</h1>
        }
    }
}

const mapStateToProps = state => state.reducer_login;

export default connect(mapStateToProps)(Orders);