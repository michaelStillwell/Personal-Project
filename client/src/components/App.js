// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees } from '../ducks/reducer';

class App extends Component {
    componentDidMount() {
        this.props.getEmployees();
    }

    render() {
        return (
            <div>
                {!this.props.employeeListBool ? <h1>aa</h1> : <h1>loading...</h1>}
            </div>
        )
    }
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getEmployees })(App);