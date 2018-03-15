import axios from 'axios';

// Constants
const
    GET_FIELD_ORDERS          = 'GET_FIELD_ORDERS',
    GET_WAREHOUSE_ORDERS      = 'GET_WAREHOUSE_ORDERS',
    GET_PRODUCTS_BY_ORDER     = 'GET_PRODUCST_BY_ORDER',
    GET_NEW_ORDER             = 'GET_NEW_ORDER',
    GET_NEW_ORDER_PRODUCTS    = 'GET_NEW_ORDER_PRODUCTS',
    POST_NEW_ORDER            = 'POST_NEW_ORDER',
    REMOVE_FROM_NEW_ORDER     = 'REMOVE_FROM_NEW_ORDER',
    REMOVE_ALL_FROM_NEW_ORDER = 'REMOVE_ALL_FROM_NEW_ORDER',
    PLACE_ORDER               = 'PLACE_ORDER',
    MARK_AS_COMPLETE          = 'MARK_AS_COMPLETE';

const orderState = {
    orders: [],
    ordersLoading: false,
    currentOrder: [],
    currentOrderLoading: false,
    newOrder: [],
    newProductsLoading: false,
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


export function markAsComplete(send) {
    return {
        type: MARK_AS_COMPLETE,
        payload: 
            axios
                .put(`/api/orders/${send.username}/${send.id}/complete`)
                .then(() => window.location.href = window.location.origin + '/#/orders')
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
                .then(alert('Removed From Order!'))
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
                    // window.location.reload();
                    console.log('went through')
                })
                .catch(err => console.log('PLACE ORDER: ', err))
    }
}

export default function reducer_order(state = orderState, action) {
    switch(action.type) {
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

        default:
            return state;
    }
}