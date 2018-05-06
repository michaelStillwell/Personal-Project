// Import React
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { 
    getEmployees, putEmployee, deleteEmployee
} from '../../ducks/reducer';

class EmployeePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            emp_type: '',
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
                                <button onClick={() => this.setState({edit: !this.state.edit, selected: y})}>edit</button>
                                {this.state.delete &&  this.state.selected === y ? (
                                    <div>
                                        <h5>Are you sure you want to delete {x.username}?</h5>
                                        <button onClick={() => this.props.deleteEmployee()}>Yes</button>
                                        <button onClick={() => this.setState({ delete: false, selected: null})}>No</button>
                                    </div>
                                ) : (
                                    <button onClick={() => this.setState({delete: true, selected: y})}>delete</button>
                                )}
                            </li>
                        )
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => state;
export default connect(mapStateToProps, { getEmployees, putEmployee, deleteEmployee })(EmployeePage);