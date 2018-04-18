// React Imports
import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import { connect } from 'react-redux';

import { getEmployees } from '../../ducks/reducer';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameInput: '',
            passwordInput: ''
        }
    }

    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <input type="text" onChange={e => this.setState({ usernameInput: e.target.value})} />
                <input type="text" onChange={e => this.setState({ passwordInput: e.target.value})} />
                <button type="submit" onClick={() => 'hi'} >Login</button>
            </div>
        )
    }

    _confirm = async () => {

    }

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    }
}

const LOGIN_MUTATION = gql`
    mutation($username: String, $password: String) {
        login(username: $username, password: $password) {
            token
        }
    }
`;
export default graphql(LOGIN_MUTATION, { name: 'loginMutation' })(LandingPage);