// React Imports
import React, { Component } from 'react';
import { Home, Login, Loading } from '../../imports';
import { connect } from 'react-redux';

class LandingPage extends Component {
    render() {
        if ( this.props.isLoading === false ) {
            if (this.props.user === '') {
                return <Login />
            } else if ( this.props.user !== '' ) {
                return <Home />
            }
        } else {
            return <Loading />
        }
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(LandingPage);