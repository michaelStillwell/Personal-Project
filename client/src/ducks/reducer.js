import client from '../index';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// CONSTANTS
const

    TEST = 'TEST';

const defualtState = {
    employeeList: [],
    employeeListBool: false,
};

export const getEmployees = () => {
    return {
        type: TEST,
        payload: (
            client.query({
                query: gql`
                    query {
                        getAllEmployees {
                            id
                            username
                            emp_type
                        }
                    }
                `
            }).then(res => {
                console.log(res)
                return {};
            }).catch(err => console.log(err))
        )
    }
};

// export const userLogin = () => {
//     return {
//         type: LOGIN,
//         payload: (
//             client.query({
//                 query: gql`
//                     query 
//                 `
//             })
//         )
//     }
// }

// REDUCER
export default function reducer(state = defualtState, action) {
    switch(action.type) {
        case `${TEST}_PENDING`:
            return Object.assign({}, state, { employeeListBool: true });
        
        case `${TEST}_FULFILLED`:
            return Object.assign({}, state, { employeeListBool: false, employeeList: action.payload });
            
        case `${TEST}_REJECTED`:
            return Object.assign({}, state, { employeeListBool: false });
        default:
            return state;
    }
};