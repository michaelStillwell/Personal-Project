// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getEmployees } from '../../ducks/reducer';

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
                <button type="submit" onClick={() => this.props.getEmployees(this.state.usernameInput, this.state.passwordInput)} >Login</button>
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { getEmployees })(LandingPage);