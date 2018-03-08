import axios from 'axios';

// Constants
const
    UPDATE_USERNAME = 'UPDATE_USERNAME',
    UPDATE_USERNAME_EDIT = 'UPDATE_USERNAME_EDIT',
    UPDATE_USERNAME_CREATE = 'UPDATE_USERNAME_CREATE',
    UPDATE_PASSWORD = 'UPDATE_PASSWORD',
    UPDATE_PASSWORD_CREATE = 'UPDATE_PASSWORD_CREATE',
    UPDATE_PASSWORD_EDIT = 'UPDATE_PASSWORD_EDIT',
    UPDATE_TYPE_CREATE = 'UPDATE_TYPE_CREATE',
    UPDATE_TYPE_EDIT = 'UPDATE_TYPE_EDIT',
    UPDATE_SEARCH = 'UPDATE_SEARCH',
    
    AUTH_USER   = 'AUTH_USER',

    GET_FEATURED_PRODUCTS = 'GET_FEATURED_PRODUCTS',
    
    GET_PRODUCTS = 'GET_PRODUCTS',
    GET_FIELD_ORDERS   = 'GET_FIELD_ORDERS',
    GET_WAREHOUSE_ORDERS = 'GET_WAREHOUSE_ORDERS',
    GET_PRODUCTS_BY_ORDER = 'GET_PRODUCST_BY_ORDER',
    GET_CURRENT_PRODUCT = 'GET_CURRENT_PRODUCT',
    CREATE_PRODUCT = 'CREATE_PRODUCT',
    CREATE_PRODUCT_NAME = 'CREATE_PRODUCT_NAME',
    CREATE_PRODUCT_DESCRIPTION = 'CREATE_PRODUCT_DESCRIPTION',
    CREATE_PRODUCT_PRICE = 'CREATE_PRODUCT_PRICE',
    CREATE_PRODUCT_STOCK = 'CREATE_PRODUCT_STOCK',
    EDIT_PRODUCT_NAME = 'EDIT_PRODUCT_NAME',
    EDIT_PRODUCT_DESCRIPTION = 'EDIT_PRODUCT_DESCRIPTION',
    EDIT_PRODUCT_PRICE = 'EDIT_PRODUCT_PRICE',
    EDIT_PRODUCT_STOCK = 'EDIT_PRODUCT_STOCK',
    EDIT_PRODUCT_UPDATE = 'EDIT_PRODUCT_UPDATE',
    DELETE_PRODUCT = 'DELETE_PRODUCT',
    TOGGLE_PRODUCT_EDIT = 'TOGGLE_PRODUCT_EDIT',

    GET_NEW_ORDER = 'GET_NEW_ORDER',
    GET_NEW_ORDER_PRODUCTS = 'GET_NEW_ORDER_PRODUCTS',
    POST_NEW_ORDER = 'POST_NEW_ORDER',
    REMOVE_FROM_NEW_ORDER = 'REMOVE_FROM_NEW_ORDER',
    REMOVE_ALL_FROM_NEW_ORDER = 'REMOVE_ALL_FROM_NEW_ORDER',
    PLACE_ORDER = 'PLACE_ORDER',

    GET_EMPLOYEES = 'GET_EMPLOYEES',
    CREATE_EMPLOYEES = 'CREATE_EMPLOYEES',
    EDIT_EMPLOYEES = 'EDIT_EMPLOYEES',
    DELETE_EMPLOYEES = 'DELETE_EMPLOYEES',
    
    MARK_AS_COMPLETE = 'MARK_AS_COMPLETE';

let user = '', emp_type = 0;
localStorage.emp_type ? emp_type = localStorage.emp_type : emp_type = 0;
localStorage.user ? user = localStorage.user : user = '';

const initialState = {
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
    user: user,
    emp_type: emp_type,
    isLoading: false,

    featuredProducts: [],
    featuredLoading: false,

    products: [],
    productsLoading: false,
    productsCreateName: '',
    productsCreateDescription: '',
    productsCreatePrice: 0.00,
    productsCreateStock: 0,
    currentProduct: [],
    currentProductEdit: false,
    currentProductEditName: '',
    currentProductEditDescription: '',
    currentProductEditPrice: 0,
    currentProductEditStock: 0,
    currentProductLoading: false,

    orders: [],
    ordersLoading: false,
    currentOrder: [],
    currentOrderLoading: false,
    newOrder: [],
    newProductsLoading: false,

    employees: [],
    employeesLoading: false,
    employeesCreateUsername: '',
    employeesCreatePassword: '',
    employeesCreateType: '',
    employeesEditUsername: '',
    employeesEditPassword: '',
    employeesEditType: '',
}

export function checkSession() {
    axios
        .get('/api/session')
        .then(response => {
            console.log('CHECK SESSION: ', response.data.user);
            localStorage.user = response.data.user.username;
            localStorage.emp_type = response.data.user.emp_type;
        })
        .catch(err => console.log(err))
}

export function updateUsername(val) {
    return {
        type: UPDATE_USERNAME,
        payload: val
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

export function updatePassword(val) {
    return {
        type: UPDATE_PASSWORD,
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

export function updateSearch(val) {
    return {
        type: UPDATE_SEARCH,
        payload: val
    }
}

export function productsCreate(input, val) {
    return {
        type: `CREATE_PRODUCT_${input}`,
        payload: val
    }
}

export function authUser(send) {
    return {
        type: AUTH_USER,
        payload:
            axios
                .post('/api/auth', send)
                .then(response => {
                    if ( response.data.Body.length ) {
                        window.location.href = window.location;
                        return response.data.Body[0];
                    } else {
                        window.location.reload();
                        alert('User Not Found');
                    }
                })
                .catch(err => console.log(err))
    }
}

export function getProducts() {
    return {
        type: GET_PRODUCTS,
        payload:
            axios
                .get('/api/products')
                .then(response => response.data)
                .catch(err => console.log(err))
    }
}

export function getFieldOrders(emp_type) {
    return {
        type: GET_FIELD_ORDERS,
        payload:
            axios
                .get(`/api/orders/field/${emp_type}`)
                .then(response => response.data)
                .catch(err => console.log(err))
    }
}

export function getWarehouseOrders() {
    return {
        type: GET_WAREHOUSE_ORDERS,
        payload: 
            axios
                .get('/api/orders/warehouse/')
                .then(response => response.data)
                .catch(err => console.log(err))
    }
}

export function getProductsByOrder(send) {
    return {
        type: GET_PRODUCTS_BY_ORDER,
        payload: 
            axios
                .get(`/api/orders/read/${send.username}/${send.id}`)
                .then(response => response.data)
                .catch(err => console.log(err))
    }
}

export function getCurrentProduct(product) {
    return {
        type: GET_CURRENT_PRODUCT,
        payload:
            axios
                .get(`/api/product/${product}`)
                .then(response => response.data[0])
                .catch(err => console.log(err))
    }
}

export function toggleCurrentProductEdit(edit) {
    return {
        type: TOGGLE_PRODUCT_EDIT,
        payload: !edit
    }
}

export function editCurrentProduct(input, val) {
    console.log(input, val);
    return {
        type: `EDIT_PRODUCT_${input}`,
        payload: val
    }
}

export function updateCurrentProduct(id, send) {
    return {
        type: EDIT_PRODUCT_UPDATE,
        payload: 
            axios
                .put(`/api/products/update/${id}`, send)
                .then(response => console.log(response))
                .catch(err => console.log('UPDATE PRODUCT: ', err))
    }
}

export function deleteCurrentProduct(id) {
    return {
        type: DELETE_PRODUCT,
        payload:
            axios
                .delete(`/api/products/delete/${id}`)
                .then( response => console.log(response))
                .catch(err => console.log('DELETE PRODUCT: ', err))
    }
}

export function createProduct(send) {
    return {
        type: CREATE_PRODUCT,
        payload: 
            axios
                .post('/api/products/create', send)
                .then(() => window.reload())
                .catch(err => console.log('CREATE PRODUCT: ', err))
    }
}

export function markAsComplete(send) {
    return {
        type: MARK_AS_COMPLETE,
        payload: 
            axios
                .put(`/api/orders/${send.username}/${send.id}/complete`)
                .then(response => console.log(response))
                .catch(err => console.log(err))
    }
}

export function getNewOrder() {
    return {
        type: GET_NEW_ORDER,
        payload: 
            axios 
                .get('/api/orders/new/order/MStillwell')
                .then(response => console.log(response))
                .catch(err => console.log(err))
    }
}

export function postNewOrder(user, product) {
    return {
        type: POST_NEW_ORDER,
        payload: 
            axios
                .post(`/api/orders/new/post/${user}/${product}`)
                .then(alert('Added to Order!'))
                .catch(err => console.log(err))
    }
}

export function removeFromNewOrder(send) {
    return {
        type: REMOVE_FROM_NEW_ORDER,
        payload:
            axios
                .delete(`/api/orders/new/products/delete/${send.user}/${send.id}`)
                .then(() => {
                    // window.location.href = window.location;
                    alert('Removed From Order!');
                })
                .catch(err => console.log(err))
    }
}

export function removeAllFromNewOrder(user) {
    return {
        type: REMOVE_ALL_FROM_NEW_ORDER,
        payload:
            axios
                .delete(`/api/orders/new/products/remove/${user}`)
                .then(alert('Cleared Order!'))
                .catch(err => console.log('FROM CLEAR ALL: ', err))
    }
}

export function getNewOrderProducts(id) {
    return {
        type: GET_NEW_ORDER_PRODUCTS,
        payload:
            axios
                .get(`/api/orders/new/products/${id}`)
                .then(response => response.data)
                .catch(err => console.log(err))
    }
}

export function placeOrder(order, send) {
    return {
        type: PLACE_ORDER,
        payload:
            axios
                .post(`/api/orders/create/${order}`, send)
                .then(() => {
                    alert('Order Placed!');
                    window.location.reload();
                })
                .catch(err => console.log('PLACE ORDER: ', err))
    }
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
                .then(response => console.log(response))
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

export function getFeaturedProducts() {
    return {
        type: GET_FEATURED_PRODUCTS,
        payload: 
            axios 
                .get('/api/featured')
                .then(response => response.data)
                .catch(err => console.log('GET FEATURED: ', err))
    }
}

export function logoutUser() {
    window.location.href = window.location.origin + '#/';
    window.location.reload();
    localStorage.clear();
}

export default function reducer(state = initialState, action) {
    switch(action.type) {

        case UPDATE_USERNAME:
            return Object.assign({}, state, { usernameInput: action.payload  });

        case UPDATE_USERNAME_CREATE:
            return Object.assign({}, state, { employeesCreateUsername: action.payload });

        case UPDATE_USERNAME_EDIT:
            return Object.assign({}, state, { employeesEditUsername: action.payload });

        case UPDATE_PASSWORD:
            return Object.assign({}, state, { passwordInput: action.payload });

        case UPDATE_PASSWORD_CREATE:
            return Object.assign({}, state, { employeesCreatePassword: action.payload });

        case UPDATE_PASSWORD_EDIT:
            return Object.assign({}, state, { employeesEditPassword: action.payload });

        case UPDATE_TYPE_CREATE:
            return Object.assign({}, state, { employeesCreateType: action.payload });

        case UPDATE_TYPE_EDIT:
            return Object.assign({}, state, { employeesEditType: action.payload });

        case UPDATE_SEARCH:
            return Object.assign({}, state, { searchInput: action.payload });

        case CREATE_PRODUCT_NAME:
            return Object.assign({}, state, { productsCreateName: action.payload });

        case CREATE_PRODUCT_DESCRIPTION:
            return Object.assign({}, state, { productsCreateDescription: action.payload });

        case CREATE_PRODUCT_PRICE:
            return Object.assign({}, state, { productsCreatePrice: action.payload });

        case CREATE_PRODUCT_STOCK:
            return Object.assign({}, state, { productsCreateStock: action.payload });

        case EDIT_PRODUCT_NAME:
            return Object.assign({}, state, { currentProductEditName: action.payload })

        case EDIT_PRODUCT_DESCRIPTION:
            return Object.assign({}, state, { currentProductEditDescription: action.payload })

        case EDIT_PRODUCT_PRICE:
            return Object.assign({}, state, { currentProductEditPrice: action.payload })
        
        case EDIT_PRODUCT_STOCK:
            return Object.assign({}, state, { currentProductEditStock: action.payload })
        
        case `${AUTH_USER}_PENDING`:
            return Object.assign({}, state, { isLoading: true });

        case `${AUTH_USER}_FULFILLED`:
            checkSession();
            return Object.assign({}, state, { isLoading: false, user: action.payload.username, emp_type: action.payload.emp_type });

        case `${AUTH_USER}_REJECTED`:
            return Object.assign({}, state, { isLoading: false });

        case `${GET_FEATURED_PRODUCTS}_PENDING`:
            return Object.assign({}, state, { featuredLoading: true });

        case `${GET_FEATURED_PRODUCTS}_FULFILLED`:
            return Object.assign({}, state, { featuredLoading: false, featuredProducts: action.payload });

        case `${GET_FEATURED_PRODUCTS}_REJECTED`:
            return Object.assign({}, state, { featuredLoading: false });

        case `${GET_PRODUCTS}_PENDING`:
            return Object.assign({}, state, { productsLoading: true });

        case `${GET_PRODUCTS}_FULFILLED`:
            return Object.assign({}, state, { productsLoading: false, products: action.payload });

        case `${GET_PRODUCTS}_REJECTED`:
            return Object.assign({}, state, { productsLoading: false });

        case `${GET_FIELD_ORDERS}_PENDING`:
            return Object.assign({}, state, { ordersLoading: true });

        case `${GET_FIELD_ORDERS}_FULFILLED`:
            return Object.assign({}, state, { ordersLoading: false, orders: action.payload });

        case `${GET_FIELD_ORDERS}_REJECTED`:
            return Object.assign({}, state, { ordersLoading: false });

        case `${GET_WAREHOUSE_ORDERS}_PENDING`:
            return Object.assign({}, state, { ordersLoading: true });

        case `${GET_WAREHOUSE_ORDERS}_FULFILLED`:
            return Object.assign({}, state, { ordersLoading: false, orders: action.payload });

        case `${GET_WAREHOUSE_ORDERS}_REJECTED`:
            return Object.assign({}, state, { ordersLoading: false });

        case `${GET_PRODUCTS_BY_ORDER}_PENDING`:
            return Object.assign({}, state, { currentOrderLoading: true });

        case `${GET_PRODUCTS_BY_ORDER}_FULFILLED`:
            return Object.assign({}, state, { currentOrderLoading: false, currentOrder: action.payload });

        case `${GET_PRODUCTS_BY_ORDER}_REJECTED`:
            return Object.assign({}, state, { currentOrderLoading: false });

        case `${GET_CURRENT_PRODUCT}_PENDING`:
            return Object.assign({}, state, { currentProductLoading: true });

        case `${GET_CURRENT_PRODUCT}_FULFILLED`:
            return Object.assign({}, state, { currentProductLoading: false, currentProduct: action.payload });

        case `${GET_CURRENT_PRODUCT}_REJECTED`:
            return Object.assign({}, state, { currentProductLoading: false });

        case TOGGLE_PRODUCT_EDIT:
            return Object.assign({}, state, { currentProductEdit: action.payload });

        case GET_NEW_ORDER:
            return Object.assign({}, state, { newOrder: action.payload });

        case `${GET_NEW_ORDER_PRODUCTS}_PENDING`:
            return Object.assign({}, state, { newProductsLoading: true });

        case `${GET_NEW_ORDER_PRODUCTS}_FULFILLED`:
            return Object.assign({}, state, { newProductsLoading: false, currentOrder: action.payload });

        case `${GET_NEW_ORDER_PRODUCTS}_REJECTED`:
            return Object.assign({}, state, { newProductsLoading: false });

        case `${REMOVE_FROM_NEW_ORDER}_FULFILLED`:
            return action.payload;

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