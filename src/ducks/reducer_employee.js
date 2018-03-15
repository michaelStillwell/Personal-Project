import axios from 'axios';

// Constants
const
    UPDATE_USERNAME_EDIT   = 'UPDATE_USERNAME_EDIT',
    UPDATE_USERNAME_CREATE = 'UPDATE_USERNAME_CREATE',
    UPDATE_PASSWORD_CREATE = 'UPDATE_PASSWORD_CREATE',
    UPDATE_PASSWORD_EDIT   = 'UPDATE_PASSWORD_EDIT',
    UPDATE_TYPE_CREATE     = 'UPDATE_TYPE_CREATE',
    UPDATE_TYPE_EDIT       = 'UPDATE_TYPE_EDIT',
    GET_EMPLOYEES          = 'GET_EMPLOYEES',
    CREATE_EMPLOYEES       = 'CREATE_EMPLOYEES',
    EDIT_EMPLOYEES         = 'EDIT_EMPLOYEES',
    DELETE_EMPLOYEES       = 'DELETE_EMPLOYEES';

const employeeState = {
    employees: [],
    employeesLoading: false,
    employeesCreateUsername: '',
    employeesCreatePassword: '',
    employeesCreateType: '',
    employeesEditUsername: '',
    employeesEditPassword: '',
    employeesEditType: '',
}

export function getEmployees() {
    return {
        type: GET_EMPLOYEES,
        payload: 
            axios
                .get('/api/employees')
                .then(response => response.data)
                .catch(err => console.log('GET EMPLOYEES: ', err))
    }
}

export function createEmployees(send) {
    return {
        type: CREATE_EMPLOYEES,
        paylaod:
            axios
                .post('/api/employees/create', send)
                .catch(err => console.log('CREATE EMPLOYEES: ', err))
    }
}

export function editEmployees(id, send) {
    return {
        type: EDIT_EMPLOYEES,
        payload:
            axios
                .put(`/api/employees/update/${id}`, send)
                .then(response => console.log(response))
                .catch(err => console.log('EDIT EMPLOYEE: ', err))
    }
}

export function deleteEmployees(id) {
    return {
        type: DELETE_EMPLOYEES,
        payload: 
            axios 
                .delete(`/api/employees/delete/${id}`)
                .then(response => console.log(response))
                .catch(err => console.log('DELETE EMPLOYEES: ', err))
    }
}

export function updateUsernameCreate(val) {
    return {
        type: UPDATE_USERNAME_CREATE,
        payload: val
    }
}

export function updateUsernameEdit(val) {
    return {
        type: UPDATE_USERNAME_EDIT,
        payload: val
    }
}

export function updatePasswordCreate(val) {
    return {
        type: UPDATE_PASSWORD_CREATE,
        payload: val
    }
}

export function updatePasswordEdit(val) {
    return {
        type: UPDATE_PASSWORD_EDIT,
        payload: val
    }
}

export function updateTypeCreate(val) {
    return {
        type: UPDATE_TYPE_CREATE,
        payload: val
    }
}

export function updateTypeEdit(val) {
    return {
        type: UPDATE_TYPE_EDIT,
        payload: val
    }
}

export default function reducer_employee(state = employeeState, action) {
    switch(action.type) {
        case UPDATE_USERNAME_CREATE:
            return Object.assign({}, state, { employeesCreateUsername: action.payload });

        case UPDATE_USERNAME_EDIT:
            return Object.assign({}, state, { employeesEditUsername: action.payload });

        case UPDATE_PASSWORD_CREATE:
            return Object.assign({}, state, { employeesCreatePassword: action.payload });

        case UPDATE_PASSWORD_EDIT:
            return Object.assign({}, state, { employeesEditPassword: action.payload });
            
        case UPDATE_TYPE_CREATE:
            return Object.assign({}, state, { employeesCreateType: action.payload });

        case UPDATE_TYPE_EDIT:
            return Object.assign({}, state, { employeesEditType: action.payload });

        case `${GET_EMPLOYEES}_PENDING`:
            return Object.assign({}, state, { employeesLoading: true });

        case `${GET_EMPLOYEES}_FULFILLED`:
            return Object.assign({}, state, { employeesLoading: false, employees: action.payload });

        case `${GET_EMPLOYEES}_REJECTED`:
            return Object.assign({}, state, { employeesLoading: false });

        default:
            return state;
    }
}