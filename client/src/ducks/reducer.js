import client from '../index';
import gql from 'graphql-tag';

// CONSTANTS
const
    GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
    
    // TEST = 'TEST';

const defualtState = {
    productsBool: false,
    productsList: [],
};

// export const getEmployees = () => {
//     return {
//         type: TEST,
//         payload: (
//             client.query({
//                 query: gql`
//                     query {
//                         getAllEmployees {
//                             id
//                             username
//                             emp_type
//                         }
//                     }
//                 `
//             }).then(res => {
//                 console.log(res)
//                 return {};
//             }).catch(err => console.log(err))
//         )
//     }
// };

// FUNCTIONS
export function getProducts() {
    return {
        type: GET_ALL_PRODUCTS,
        payload: (
            client.query({
                query: gql`
                    query {
                        getAllProducts {
                            id
                            name
                            description
                            price
                            stock
                        }
                    }
                `
            }).then(response => (
                response.data.getAllProducts
            )).catch(err => console.log('GET ALL PRODUCTS: ', err))
        )
    };
};

// REDUCER
export default function reducer(state = defualtState, action) {
    switch(action.type) {
        // case `${TEST}_PENDING`:
        //     return Object.assign({}, state, { employeeListBool: true });
        
        // case `${TEST}_FULFILLED`:
        //     return Object.assign({}, state, { employeeListBool: false, employeeList: action.payload });
            
        // case `${TEST}_REJECTED`:
        //     return Object.assign({}, state, { employeeListBool: false });
        case `${GET_ALL_PRODUCTS}_PENDING`:
            return Object.assign({}, state, { productsBool: true });

        case `${GET_ALL_PRODUCTS}_FULFILLED`:
            return Object.assign({}, state, { productsBool: false, productsList: action.payload });

        case `${GET_ALL_PRODUCTS}_REJECTED`:
            return Object.assign({}, state, { productsBool: false });

        default:
            return state;
    }
};