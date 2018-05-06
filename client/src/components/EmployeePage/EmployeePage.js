// Import React
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { 
    getEmployees, postEmployee, putEmployee, deleteEmployee
} from '../../ducks/reducer';

class EmployeePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            emp_type: '',
            create: false,
            edit: false,
            delete: false,
            selected: null
        };
    }

    componentDidMount() {
        this.props.getEmployees();
    }

    render() {
        return this.props.getEmployeesBool ? (
            <h1>Loading...</h1>
        ) : (
            <div>
                <label>Employees: </label>
                <ul>
                    {this.props.getEmployeesList.map((x, y) => (
                        this.state.edit && this.state.selected === y ? (
                            <li>
                                <input type="text" onChange={e => this.setState({username: e.target.value})} placeholder="Username" defaultValue={x.username} autoFocus/> 
                                <input type="text" onChange={e => this.setState({password: e.target.value})} placeholder="Password" defaultValue={x.password} /> 
                                <select defaultValue={x.emp_type} onChange={e => this.setState({emp_type: e.target.value})}>
                                    <option value="Owner">Owner</option>
                                    <option value="Warehouse">Warehouse</option>
                                    <option value="Field">Field</option>
                                </select> 
                                <button onClick={() => {
                                    let send = {
                                        username: this.state.username || x.username,
                                        password: this.state.password || x.password,
                                        emp_type: this.state.emp_type || x.emp_type
                                    };

                                    this.props.putEmployee(x.id, send);
                                    this.setState({delete: false, edit: false});
                                }}>submit</button>
                                <button onClick={() => this.setState({delete: false, edit: false, selected: null})}>cancel</button>
                                <button onClick={() => this.setState({delete: true, edit: false, selected: y})}>delete</button>
                            </li>
                        ) : (
                            <li>
                                {x.username}
                                <button onClick={() => this.setState({edit: true, delete: false, create: false, selected: y})}>edit</button>
                                {this.state.delete &&  this.state.selected === y ? (
                                    <div>
                                        <h5>Are you sure you want to delete {x.username}?</h5>
                                        <button onClick={() => this.props.deleteEmployee(x.id).then(() => this.setState({delete: false, edit: false, selected: null}))}>Yes</button>
                                        <button onClick={() => this.setState({ delete: false, selected: null})}>No</button>
                                    </div>
                                ) : (
                                    <button onClick={() => this.setState({delete: true, edit: false, create: false, selected: y})}>delete</button>
                                )}
                            </li>
                        )
                    ))}
                </ul>
                    {this.state.create ? (
                        <div>
                            <input type="text" onChange={e => this.setState({ username: e.target.value})} placeholder="Username" />
                            <input type="text" onChange={e => this.setState({ password: e.target.value})} placeholder="Password" />
                            <select onChange={e => this.setState({emp_type: e.target.value})} defaultValue="null">
                                <option value="null">--Select a Type--</option>
                                <option value="Owner">Owner</option>
                                <option value="Warehouse">Warehouse</option>
                                <option value="Field">Field</option>
                            </select>
                            <button onClick={() => this.state.username && this.state.password && this.state.emp_type !== 'null' ?
                                this.props.postEmployee({username: this.state.username, password: this.state.password, emp_type: this.state.emp_type}).then(() => this.setState({ create: false, username: '', password: '', emp_type: '' }))
                                : alert('Fill all the fields first')
                            }>create</button>
                            <button onClick={() => this.setState({create: false, username: '', password: '', emp_type: ''})}>cancel</button>
                        </div>
                    ) : (
                        <button onClick={() => this.setState({create: true, delete: false, edit: false})}>Create New Employee</button>
                    )}
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { getEmployees, postEmployee, putEmployee, deleteEmployee })(EmployeePage);