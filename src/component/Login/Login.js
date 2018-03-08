// React Imports
import React, { Component } from 'react';
import { updateUsername, updatePassword, authUser } from '../../ducks/reducer';
import { connect } from 'react-redux';
import './Login.css';

class Login extends Component {
    handleUsernameInput(val) {
        this.props.updateUsername(val);
    }

    handlePasswordInput(val) {
        this.props.updatePassword(val);
    }

    login() {
        if ( this.props.usernameInput !== '' && this.props.passwordInput !== '') {
            this.props.authUser({username: this.props.usernameInput});
        } else {
            alert('Please Enter Your Info');
        }
    }

    render() {
        return (
            <div className='login-container'>
                <h1 className='title'>Login</h1>
                <div>
                    <input type="text" placeholder='Username' onChange={e => this.handleUsernameInput(e.target.value)} />
                    <input type="password" placeholder='Password' onChange={e => this.handlePasswordInput(e.target.value)} />
                </div>
                <button onClick={() => this.login()}>Login</button>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { updateUsername, updatePassword, authUser })(Login);