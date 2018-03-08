// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUsernameCreate, updatePasswordCreate, updateTypeCreate, createEmployees } from '../../ducks/reducer';
import { Link } from '../../imports';

class DisplayEmployeeCreate extends Component {
    render() {
        let send = {username: this.props.employeesCreateUsername, password: this.props.employeesCreatePassword, emp_type: this.props.employeesCreateType};        
        return (
            <div>
                <h1>Create Page</h1>
                <input 
                    type="text" 
                    placeholder='Username' 
                    onChange={e => this.props.updateUsernameCreate('USERNAME', e.target.value)} 
                />
                <input 
                    type="password" 
                    placeholder='Password' 
                    onChange={e => this.props.updatePasswordCreate('PASSWORD', e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder='Employee Type' 
                    onChange={e => this.props.updateTypeCreate('TPYE', e.target.value)} 
                />
                <Link to='/employees'>
                    <button onClick={() => this.props.createEmployees(send)}>Create Employee</button>
                </Link>
            </div>
        )
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { updateUsernameCreate, updatePasswordCreate, updateTypeCreate, createEmployees })(DisplayEmployeeCreate);