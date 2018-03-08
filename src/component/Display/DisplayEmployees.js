// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, createEmployees } from '../../ducks/reducer';
import { Loading, Link } from '../../imports';

class DisplayEmlpoyees extends Component {
    componentWillMount() {
        this.props.getEmployees();
    }
    
    render() {
        return (
            <div>
                {!this.props.employeesLoading && this.props.employees.length ? (
                    <div>
                        <h1>Employees Page</h1>
                        {this.props.employees.map((x,y) => (
                            <div key={y}>
                                <h1>{x.username}</h1>
                                <Link to={`/employee/edit/${x.id}`}>
                                    <button>Edit User</button> 
                                </Link>
                            </div>
                        ))}
                        <Link to='/employee/create'>
                            <button>Create User</button>
                        </Link>
                    </div>
                ) : <Loading />}
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { getEmployees, createEmployees })(DisplayEmlpoyees);