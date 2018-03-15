// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getProducts } from '../../ducks/reducer_product';
import FieldBrowse from './Field/FieldBrowse';
import WarehouseBrowse from './Warehouse/WarehouseBrowse';
import OwnerBrowse from './Owner/OwnerBrowse';

class Browse extends Component {
    componentWillMount() {
        this.props.getProducts();
    }

    render() {
        switch(this.props.emp_type) {
            case 'Owner': 
                return <OwnerBrowse />
            
            case 'Warehouse': 
                return <WarehouseBrowse />

            case 'Field':
                return <FieldBrowse />
            
            default:
                return <h1>Failed From Browse</h1>
        }
    }
}

const mapStateToProps = state => state.reducer_login;

export default connect(mapStateToProps, { getProducts })(Browse);