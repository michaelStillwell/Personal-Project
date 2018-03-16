// React Imports
import React, { Component } from 'react';
import { updateUsername, updatePassword, authUser } from '../../ducks/reducer_login';
import { connect } from 'react-redux';
import { Link } from '../../imports';

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
        let win = window.innerWidth > 1024;
        return (
            <div>
                {win ? (
                    <div className='login-container'>
                        <input type="text" placeholder='Username' onChange={e => this.handleUsernameInput(e.target.value)} />
                        <input type="password" placeholder='Password' onChange={e => this.handlePasswordInput(e.target.value)} />
                        <Link to='/' onClick={() => this.login()}>Login</Link>
                    </div>
                ) : (
                    <div className='login-mobile'>
                        <input type="text" placeholder='Username' onChange={e => this.handleUsernameInput(e.target.value)} />
                        <input type="password" placeholder='Password' onChange={e => this.handlePasswordInput(e.target.value)} />
                        <Link to='/' onClick={() => this.login()}>Login</Link>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => state.reducer_login;

export default connect(mapStateToProps, { updateUsername, updatePassword, authUser })(Login);