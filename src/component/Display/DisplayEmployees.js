// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getEmployees, createEmployees } from '../../ducks/reducer_employee';
import { Loading, Link } from '../../imports';

class DisplayEmlpoyees extends Component {
    componentWillMount() {
        this.props.getEmployees();
    }
    
    render() {
        let win = window.innerWidth > 1024;
        return (
            <div className='employee-container'>
                {win ? (
                    !this.props.employeesLoading && this.props.employees.length ? (
                        <div>
                            <h1>Employees Page</h1>
                            {this.props.employees.map((x,y) => (
                                <div key={y} className='employee'>
                                    <h2>{x.username}</h2>
                                    <Link to={`/employee/edit/${x.id}`}>
                                        Edit User
                                    </Link>
                                </div>
                            ))}
                            <Link to='/employee/create' className='create'>
                                Create User
                            </Link>
                        </div>
                    ) : <Loading />
                ) : (
                    !this.props.employeesLoading && this.props.employees.length ? (
                        <div className='employee-mobile'>
                            <h1>Employees</h1>
                            {this.props.employees.map((x,y) => (
                                <div key={y}>
                                    <h2>{x.username}</h2>
                                    <Link to={`/employee/edit/${x.id}`}>
                                        Edit
                                    </Link>
                                </div>
                            ))}
                            <Link to='/employee/create' className='create'>
                                Create
                            </Link>
                        </div>
                    ) : <Loading />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => state.reducer_employee;

export default connect(mapStateToProps, { getEmployees, createEmployees })(DisplayEmlpoyees);