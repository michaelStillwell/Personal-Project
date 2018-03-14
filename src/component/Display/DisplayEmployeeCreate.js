// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUsernameCreate, updatePasswordCreate, updateTypeCreate, createEmployees } from '../../ducks/reducer';
import { Link } from '../../imports';

class DisplayEmployeeCreate extends Component {
    render() {
        let send = {username: this.props.employeesCreateUsername, password: this.props.employeesCreatePassword, emp_type: this.props.employeesCreateType};
        return (
            <div className='employee-create'>
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
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { updateUsernameCreate, updatePasswordCreate, updateTypeCreate, createEmployees })(DisplayEmployeeCreate);