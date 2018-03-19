// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUsernameCreate, updatePasswordCreate, updateTypeCreate, createEmployees } from '../../ducks/reducer_employee';
import { Link } from '../../imports';

class DisplayEmployeeCreate extends Component {
    render() {
        let send = {username: this.props.employeesCreateUsername, password: this.props.employeesCreatePassword, emp_type: this.props.employeesCreateType};
        let win = window.innerWidth > 1024;
        return (
            <div className='employee-create'>
                {win ? (
                    <div>
                        <h1>Create Page</h1>
                        <input 
                            type="text" 
                            placeholder='Username' 
                            onChange={e => this.props.updateUsernameCreate(e.target.value)} 
                        />
                        <input 
                            type="password" 
                            placeholder='Password' 
                            onChange={e => this.props.updatePasswordCreate(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder='Employee Type' 
                            onChange={e => this.props.updateTypeCreate(e.target.value)} 
                        />
                        <Link to='/employees'>
                            <button onClick={() => {
                                this.props.createEmployees(send);
                                window.location.reload();
                            }}>Create Employee</button>
                        </Link>
                    </div>
                ) : (
                    <div className='employee-mobile'>
                        <input 
                            autoFocus
                            className='input'
                            type="text" 
                            placeholder='Username' 
                            onChange={e => this.props.updateUsernameCreate(e.target.value)} 
                        />
                        <input 
                            className='input'
                            type="password" 
                            placeholder='Password' 
                            onChange={e => this.props.updatePasswordCreate(e.target.value)} 
                        />
                        <input 
                            className='input'
                            type="text" 
                            placeholder='Employee Type' 
                            onChange={e => this.props.updateTypeCreate(e.target.value)} 
                        />
                        <Link to='/employees'>
                            <button onClick={() => {
                                this.props.createEmployees(send);
                                window.location.reload();
                            }}>Create</button>
                        </Link>
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => state.reducer_employee;

export default connect(mapStateToProps, { updateUsernameCreate, updatePasswordCreate, updateTypeCreate, createEmployees })(DisplayEmployeeCreate);