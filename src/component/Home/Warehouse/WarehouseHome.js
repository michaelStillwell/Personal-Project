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
                    <div className='home-mobile'>
                        <h1>Welcome {this.props.user}</h1>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => state.reducer_login;

export default connect(mapStateToProps)(WarehouseHome);