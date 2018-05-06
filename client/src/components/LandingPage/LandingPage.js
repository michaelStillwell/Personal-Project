// React Imports
import React, { Component } from 'react';
import { AUTH_TOKEN } from '../../constants';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LOGIN_MUTATION = gql`
    mutation($username: String, $password: String) {
        login(username: $username, password: $password) {
            id
            username
            emp_type
        }
    }
`;

class LandingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usernameInput: '',
            passwordInput: ''
        }
        this._confirm = this._confirm.bind(this);
    }

    _confirm = async () => {
        const { usernameInput, passwordInput } = this.state;
        
        const result = await this.props.loginMutation({
            variables: {
                username: usernameInput,
                password: passwordInput
            }
        });
        const token = result.data.login[0];
        this._saveUserData(token);
        window.location.reload();
    }

    _saveUserData = token => {
        localStorage.setObject(AUTH_TOKEN, token);
    }

    render() {
        return (
            <div>
                <h1>Login:</h1>
                <input type="text" onChange={e => this.setState({ usernameInput: e.target.value})} />
                <input type="text" onChange={e => this.setState({ passwordInput: e.target.value})} />
                <button type="submit" onClick={() => this._confirm()} >Login</button>
            </div>
        )
    }
}

export default graphql(LOGIN_MUTATION, { name: 'loginMutation' })(LandingPage);