import axios from 'axios';

// Constants
const
    GET_PRODUCTS               = 'GET_PRODUCTS',
    GET_CURRENT_PRODUCT        = 'GET_CURRENT_PRODUCT',
    CREATE_PRODUCT             = 'CREATE_PRODUCT',
    CREATE_PRODUCT_NAME        = 'CREATE_PRODUCT_NAME',
    CREATE_PRODUCT_DESCRIPTION = 'CREATE_PRODUCT_DESCRIPTION',
    CREATE_PRODUCT_PRICE       = 'CREATE_PRODUCT_PRICE',
    CREATE_PRODUCT_STOCK       = 'CREATE_PRODUCT_STOCK',
    EDIT_PRODUCT_NAME          = 'EDIT_PRODUCT_NAME',
    EDIT_PRODUCT_DESCRIPTION   = 'EDIT_PRODUCT_DESCRIPTION',
    EDIT_PRODUCT_PRICE         = 'EDIT_PRODUCT_PRICE',
    EDIT_PRODUCT_STOCK         = 'EDIT_PRODUCT_STOCK',
    EDIT_PRODUCT_UPDATE        = 'EDIT_PRODUCT_UPDATE',
    DELETE_PRODUCT             = 'DELETE_PRODUCT',
    TOGGLE_PRODUCT_EDIT        = 'TOGGLE_PRODUCT_EDIT',
    UPDATE_SEARCH              = 'UPDATE_SEARCH',
    INPUT_CURRENT_EDIT = 'INPUT_CURRENT_EDIT';

const productState = {
    searchInput: '',    
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
}

export function updateSearch(val) {
    return {
        type: UPDATE_SEARCH,
        payload: val
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

export function productsCreate(input, val) {
    return {
        type: `CREATE_PRODUCT_${input}`,
        payload: val
    }
}


export function getCurrentProduct(product) {
    return {
        type: GET_CURRENT_PRODUCT,
        payload:
            axios
                .get(`/api/product/${product}`)
                .then(response => { 
                    let res = response.data[0];
                    res.price = res.price.toFixed(2);
                    return res;
                })
                .catch(err => console.log(err))
    }
}

export function toggleCurrentProductEdit(edit) {
    return {
        type: TOGGLE_PRODUCT_EDIT,
        payload: !edit
    }
}

export function inputCurrentInfo(name, desc, price, stock) {
    return {
        type: INPUT_CURRENT_EDIT,
        payload: {name, desc, price, stock}
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
                .catch(err => console.log('UPDATE PRODUCT: ', err))
    }
}

export function deleteCurrentProduct(id) {
    return {
        type: DELETE_PRODUCT,
        payload:
            axios
                .delete(`/api/products/delete/${id}`)
                .catch(err => console.log('DELETE PRODUCT: ', err))
    }
}

export function createProduct(send) {
    return {
        type: CREATE_PRODUCT,
        payload: 
            axios
                .post('/api/products/create', send)
                .then(() => window.location.reload())
                .catch(err => console.log('CREATE PRODUCT: ', err))
    }
}

export default function reducer_product(state = productState, action) {
    switch(action.type) {
        case UPDATE_SEARCH:
            return Object.assign({}, state, { searchInput: action.payload });

        case `${GET_PRODUCTS}_PENDING`:
            return Object.assign({}, state, { productsLoading: true });

        case `${GET_PRODUCTS}_FULFILLED`:
            return Object.assign({}, state, { productsLoading: false, products: action.payload });

        case `${GET_PRODUCTS}_REJECTED`:
            return Object.assign({}, state, { productsLoading: false });

        case `${GET_CURRENT_PRODUCT}_PENDING`:
            return Object.assign({}, state, { currentProductLoading: true });

        case `${GET_CURRENT_PRODUCT}_FULFILLED`:
            return Object.assign({}, state, { currentProductLoading: false, currentProduct: action.payload });

        case `${GET_CURRENT_PRODUCT}_REJECTED`:
            return Object.assign({}, state, { currentProductLoading: false });

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

        case TOGGLE_PRODUCT_EDIT:
            return Object.assign({}, state, { currentProductEdit: action.payload });
        
        case INPUT_CURRENT_EDIT:
            return Object.assign({}, state, { 
                                                currentProductEditName: action.payload.name,
                                                currentProductEditDescription: action.payload.desc,
                                                currentProductEditPrice: action.payload.price,
                                                currentProductEditStock: action.payload.stock
                                            })

        default:
            return state;
    }
}