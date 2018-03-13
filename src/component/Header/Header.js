// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FieldHeader from './Field/FieldHeader';
import WarehouseHeader from './Warehouse/WarehouseHeader';
import OwnerHeader from './Owner/OwnerHeader';

class Header extends Component {
    render() {
        switch(this.props.emp_type) {
            case 'Owner':
                return <OwnerHeader />
            
            case 'Warehouse':
                return <WarehouseHeader />
            
            case 'Field':
                return <FieldHeader />

            default:
                return <h1>Welcome</h1>;
        }
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Header);