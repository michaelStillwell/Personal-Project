// React Imports
import React, { Component } from 'react';
import { AUTH_TOKEN } from '../../constants';
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
        this._confirm = this._confirm.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                <input type="text" onChange={e => this.setState({ usernameInput: e.target.value})} />
                <input type="text" onChange={e => this.setState({ passwordInput: e.target.value})} />
                <button type="submit" onClick={() => this._confirm()} >Login</button>
            </div>
        )
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
        // console.log(token);
        this._saveUserData(token);
        this.props.history.push('/');
    }

    _saveUserData = token => {
        localStorage.setObject(AUTH_TOKEN, token);
    }
}

const LOGIN_MUTATION = gql`
    mutation($username: String, $password: String) {
        login(username: $username, password: $password) {
            id
            username
            emp_type
        }
    }
`;
export default graphql(LOGIN_MUTATION, { name: 'loginMutation' })(LandingPage);