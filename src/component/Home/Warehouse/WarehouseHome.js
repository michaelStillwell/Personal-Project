// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WarehouseHome extends Component {
    render() {
        let win = window.innerWidth > 1024;
        return (
            <div className='home-container'>
                {win ? (
                    <h1>Welcome back {this.props.user}!</h1>
                ) : (
                    <h1>Welcome {this.props.user}</h1>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(WarehouseHome);