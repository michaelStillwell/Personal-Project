// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

class OwnerHome extends Component {
    render() {
        let win = window.innerWidth > 1024;
        return (
            <div className='home-container'>
                {win ? (
                    <div>
                        <h1>Welcome Back {this.props.user}!</h1>
                        <div>
                            <h3>This Week In News:</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                ) : (
                    <div className='home-mobile'>
                        <h1>Welcome {this.props.user}</h1>
                        <div>
                            <h3>This Week In News:</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => state.reducer_login;

export default connect(mapStateToProps)(OwnerHome);