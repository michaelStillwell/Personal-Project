// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

import FieldHome from './Field/FieldHome';
import WarehouseHome from './Warehouse/WarehouseHome';
import OwnerHome from './Owner/OwnerHome';

class Home extends Component {
    render() {
        switch(this.props.emp_type) {
            case 'Owner':
                return <OwnerHome />

            case 'Warehouse':
                return <WarehouseHome />

            case 'Field': 
                return <FieldHome />
                        
            default:
                return <h1>Failed From Home</h1>
        }
    }
}

const mapStateToProps = state => state.reducer_login;

export default connect(mapStateToProps)(Home);