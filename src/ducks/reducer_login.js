import axios from 'axios';

// Constants

const 
    UPDATE_USERNAME = 'UPDATE_USERNAME',
    UPDATE_PASSWORD = 'UPDATE_PASSWORD',
    AUTH_USER       = 'AUTH_USER';


let user = '', emp_type = 0;
localStorage.emp_type ? emp_type = localStorage.emp_type : emp_type = 0;
localStorage.user ? user = localStorage.user : user = '';

const loginState = {
    usernameInput: '',
    passwordInput: '',
    user: user,
    emp_type: emp_type,
    isLoading: false,
}

export function checkSession() {
    axios
        .get('/api/session')
        .then(response => {
            // console.log('CHECK SESSION: ', response.data.user);
            localStorage.user = response.data.user.username;
            localStorage.emp_type = response.data.user.emp_type;
        })
        .catch(err => console.log(err))
}

export function authUser(send) {
    return {
        type: AUTH_USER,
        payload:
            axios
                .post('/api/auth', send)
                .then(response => {
                    if ( response.data.Body.length ) {
                        return response.data.Body[0];
                    } else {
                        alert('User Not Found');
                    }
                })
                .catch(err => console.log(err))
    }
}

export function updateUsername(val) {
    return {
        type: UPDATE_USERNAME,
        payload: val
    }
}

export function updatePassword(val) {
    return {
        type: UPDATE_PASSWORD,
        payload: val
    }
}

export function logoutUser() {
    window.location.href = window.location.origin + '#/';
    window.location.reload();
    localStorage.clear();
}

export default function reducer_login(state = loginState, action) {
    switch(action.type) {
    case UPDATE_USERNAME:
        return Object.assign({}, state, { usernameInput: action.payload  });
    
    case UPDATE_PASSWORD:
        return Object.assign({}, state, { passwordInput: action.payload });

    case `${AUTH_USER}_PENDING`:
        return Object.assign({}, state, { isLoading: true });

    case `${AUTH_USER}_FULFILLED`:
        checkSession();
        return Object.assign({}, state, { isLoading: false, user: action.payload.username, emp_type: action.payload.emp_type });

    case `${AUTH_USER}_REJECTED`:
        return Object.assign({}, state, { isLoading: false });
    
    default:
            return state;
    }
}