// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WarehouseHome extends Component {
    render() {
        return (
            <div className='home-container'>
                <h1>Warehouse Home Page for {this.props.user}</h1>
                <div className='block-test'></div>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(WarehouseHome);