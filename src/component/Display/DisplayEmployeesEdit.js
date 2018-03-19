// React Imports
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
            updateUsernameEdit, 
            updatePasswordEdit,
            updateTypeEdit, 
            deleteEmployees,
            editEmployees
        } from '../../ducks/reducer_employee';
import { Link, Loading } from '../../imports';

class DisplayEmployeeEdit extends Component {
    render() {
        let employee = this.props.employees.filter(x => x.id === Number(this.props.match.params.id));
        let send = {
                user: this.props.employeesEditUsername, 
                password: this.props.employeesEditPassword, 
                emp_type: this.props.employeesEditType
            }
        let win = window.innerWidth > 1024;
        return (
            <div className='employee-edit-container'>
                {win ? (
                    <div>
                        <h1>Edit Page</h1>
                        {this.props.employees.length ? (
                            <div>
                                <h1>Employee</h1>
                                <h2>Previous Username: {employee[0].username}</h2>
                                <input type="text" placeholder='Update Username' 
                                    onChange={e => this.props.updateUsernameEdit(e.target.value)}
                                    defaultValue={employee[0].username}
                                />
                                <input type="text" placeholder='Update Password' 
                                    onChange={e => this.props.updatePasswordEdit(e.target.value)}
                                    defaultValue={employee[0].password}
                                />
                                <h3>Previous Type: {employee[0].emp_type}</h3>
                                <input type="text" placeholder='Update Type' 
                                    onChange={e => this.props.updateTypeEdit(e.target.value)}
                                    defaultValue={employee[0].emp_type}
                                />
                                <Link to='/employees'
                                        onClick={() => {
                                            this.props.editEmployees(this.props.match.params.id, send);
                                            window.location.reload();
                                        }}
                                        >Update
                                </Link>
                                <Link to='/employees'
                                        onClick={() => {
                                            this.props.deleteEmployees(this.props.match.params.id);
                                            window.location.reload();
                                        }}
                                        >Delete
                                </Link>
                            </div>
                        ) : <Loading />}
                    </div>
                ) : (
                    <div>
                        <h1>Edit</h1>
                            {this.props.employees.length ? (
                                <div>
                                    <h1>Employee</h1>
                                    <h1>{employee[0].username}</h1>
                                    <input type="text" placeholder='Update Username' 
                                        onChange={e => this.props.updateUsernameEdit(e.target.value)}
                                        defaultValue={employee[0].username}
                                    />
                                    <input type="text" placeholder='Update Password' 
                                        onChange={e => this.props.updatePasswordEdit(e.target.value)}
                                        defaultValue={employee[0].password}
                                    />
                                    <h2>{employee[0].emp_type}</h2>
                                    <input type="text" placeholder='Update Type' 
                                        onChange={e => this.props.updateTypeEdit(e.target.value)}
                                        defaultValue={employee[0].emp_type}
                                    />
                                    <Link to='/employees'
                                            onClick={() => {
                                                this.props.editEmployees(this.props.match.params.id, send);
                                                window.location.reload();
                                            }}
                                            >Update
                                    </Link>
                                    <Link to='/employees'
                                            onClick={() => {
                                                this.props.deleteEmployees(this.props.match.params.id);
                                                window.location.reload();
                                            }}
                                            >Delete
                                    </Link>
                                </div>
                            ) : <Loading />}
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = state => state.reducer_employee;

export default connect(mapStateToProps, { 
                                            updateUsernameEdit, 
                                            updatePasswordEdit, 
                                            updateTypeEdit, 
                                            deleteEmployees,
                                            editEmployees
                                        })(DisplayEmployeeEdit);