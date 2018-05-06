import client from '../index';
import gql from 'graphql-tag';

// CONSTANTS
const
    GET_ALL_PRODUCTS  = 'GET_ALL_PRODUCTS',
    GET_ALL_ORDERS    = 'GET_ALL_ORDERS',
    GET_ALL_EMPLOYEES = 'GET_ALL_EMPLOYEES',

    POST_ORDER        = 'POST_ORDER',
    POST_EMPLOYEE     = 'POST_EMPLOYEE',
    
    PUT_EMPLOYEE      = 'PUT_EMPLOYEE',

    DELETE_EMPLOYEE   = 'DELETE_EMPLOYEE';
    
    // TEST = 'TEST';

const defualtState = {
    getProductsBool: false,
    getProductsList: [],
    
    getOrdersBool: false,
    getOrdersList: [],

    getEmployeesBool: false,
    getEmployeesList: [],

    postOrdersBool: false,
    postOrdersResp: {},
};

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

export function getOrders(id) {
    return {
        type: GET_ALL_ORDERS,
        payload: (
            client.query({
                query: gql`
                    query($id: ID!) {
                        getAllOrders(id: $id) {
                            order_id
                            completion
                            product {
                                id
                                name
                                description
                                price
                                stock
                                amount
                            }
                        }
                    }
                `,
                variables: {
                    id: id
                }
            }).then(response => (
                response.data.getAllOrders
            ))
            .catch(err => console.log('GET ALL ORDERS: ', err))
        )
    };
};

export function getEmployees() {
    return {
        type: GET_ALL_EMPLOYEES,
        payload: (
            client.query({
                query: gql`
                    query {
                        getAllEmployees {
                            id
                            username
                            password
                            emp_type
                        }
                    }
                `,
            })
        ).then(response => (
            response.data.getAllEmployees
        ))
        .catch(err => console.log('GET ALL EMPLOYEES: ', err))
    }
}

export function postOrder(order_id, product, employee_id, completion, num_of_product) {
    return {
        type: POST_ORDER,
        payload: (
            client.mutate({
                mutation: gql`
                    mutation($products: [OrderInput]) {
                        createOrder(products: $products)
                    }
                `,
                variables: {
                    products: {
                        // ## ${x.order_id}, ${x.product}, ${x.employee_id}, ${x.completion}, ${x.num_of_product}
                        order_id: order_id,
                        product: product,
                        employee_id: employee_id,
                        completion: completion,
                        num_of_product: num_of_product
                    }
                }
            })
        ).then(response => (
            response.data
        ))
        .catch(err => console.log('POST ORDER: ', err))
    }
};

export function postEmployee(input) {
    return {
        type: POST_EMPLOYEE,
        payload: client.mutate({
            mutation: gql`
                mutation($input: EmployeeInput) {
                    createEmployee(input: $input) {
                        id
                        username
                        password
                        emp_type
                    }
                }
            `,
            variables: {
                input : input
            }
        }).then(response => response.data.createEmployee)
        .catch(err => console.log('POST EMPLOYEE: ', err))
    }
};

export function putEmployee(id, input) {
    return {
        type: PUT_EMPLOYEE,
        payload: (
            client.mutate({
                mutation: gql`
                    mutation($id: ID!, $input: EmployeeInput) {
                        updateEmployee(id: $id, input: $input) {
                            username
                            password
                            emp_type
                        }
                    }
                `,
                variables: {
                    id: id,
                    input: input
                }
            })
        ).then(response => (
            response.data[0]
        ))
        .catch(err => console.log('EMPLOYEE: ', err))
    }
};

export function deleteEmployee(id) {
    return {
        type: DELETE_EMPLOYEE,
        payload: (
            client.mutate({
                mutation: gql`
                    mutation($id: ID!) {
                        deleteEmployee(id: $id) {
                            id
                            username
                            password
                            emp_type
                        }
                    }
                `,
                variables: {
                    id: id
                }
            })
        ).then(response => (
            response.data.deleteEmployee
        ))
        .catch(err => console.log('EMPLOYEE: ', err))
    }
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
            return Object.assign({}, state, { getProductsBool: true });

        case `${GET_ALL_PRODUCTS}_FULFILLED`:
            return Object.assign({}, state, { getProductsBool: false, getProductsList: action.payload });

        case `${GET_ALL_PRODUCTS}_REJECTED`:
            return Object.assign({}, state, { getProductsBool: false });

        case `${GET_ALL_ORDERS}_PENDING`:
            return Object.assign({}, state, { getOrdersBool: true });
        
        case `${GET_ALL_ORDERS}_FULFILLED`:
            return Object.assign({}, state, { getOrdersBool: false, getOrdersList: action.payload });
        
        case `${GET_ALL_ORDERS}_REJECTED`:
            return Object.assign({}, state, { getOrdersBool: false });

        case `${GET_ALL_EMPLOYEES}_PENDING`:
            return Object.assign({}, state, { getEmployeesBool: true });

        case `${GET_ALL_EMPLOYEES}_FULFILLED`:
            return Object.assign({}, state, { getEmployeesBool: false, getEmployeesList: action.payload });

        case `${GET_ALL_EMPLOYEES}_REJECTED`:
            return Object.assign({}, state, { getEmployeesBool: false });

        case `${POST_ORDER}_PENDING`: 
            return Object.assign({}, state, { postOrdersBool: true });

        case `${POST_ORDER}_FULFILLED`: 
            return Object.assign({}, state, { postOrdersBool: false, postOrdersResp: action.payload });

        case `${POST_ORDER}_REJECTED`: 
            return Object.assign({}, state, { postOrdersBool: false });

        case `${POST_EMPLOYEE}_PENDING`:
            return Object.assign({}, state, { postEmployeeBool: true });

        case `${POST_EMPLOYEE}_FULFILLED`:
            return Object.assign({}, state, { postEmployeeBool: false, getEmployeesList: action.payload });

        case `${POST_EMPLOYEE}_REJECTED`:
            return Object.assign({}, state, { postEmployeeBool: false });

        case `${PUT_EMPLOYEE}_PENDING`:
            return Object.assign({}, state, { putEmployeeBool: true });

        case `${PUT_EMPLOYEE}_FULFILLED`:
            return Object.assign({}, state, { putEmployeeBool: false, putEmployeeList: action.payload });

        case `${PUT_EMPLOYEE}_REJECTED`:
            return Object.assign({}, state, { putEmployeeBool: false });
            
        case `${DELETE_EMPLOYEE}_PENDING`:
            return Object.assign({}, state, { deleteEmployeeBool: true });

        case `${DELETE_EMPLOYEE}_FULFILLED`:
            return Object.assign({}, state, { deleteEmployeeBool: false, getEmployeesList: action.payload });

        case `${DELETE_EMPLOYEE}_REJECTED`:
            return Object.assign({}, state, { deleteEmployeeBool: false });

        default:
            return state;
    }
};