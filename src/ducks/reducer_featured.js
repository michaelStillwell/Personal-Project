import axios from 'axios';

// Constant
const
    GET_FEATURED_PRODUCTS    = 'GET_FEATURED_PRODUCTS',
    POST_FEATURED_PRODUCTS   = 'POST_FEATURED_PRODUCTS',
    DELETE_FEATURED_PRODUCTS = 'DELETE_FEATURED_PRODUCTS';

const featuredState = {
    featuredProducts: [],
    featuredCurrentProduct: 0,
    featuredLoading: false,
    featuredPostLoading: false,
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

export function postFeaturedProduct(product) {
    return {
        type: POST_FEATURED_PRODUCTS,
        payload: 
            axios
                .post(`/api/featured/${product}`)
                .then(console.log('worked hopefully'))
                .catch(err => console.log('POST FEATURED: ', err))
    }
}

export function deleteFeaturedProduct(product) {
    return {
        type: DELETE_FEATURED_PRODUCTS,
        payload: 
            axios
                .delete(`/api/featured/delete/${product}`)
                .then(console.log('worked hopefully'))
                .catch(err => console.log('DELETE FEATURE: ', err))
    }
}

export default function reducer_featured(state = featuredState, action) {
    switch(action.type) {
        case `${GET_FEATURED_PRODUCTS}_PENDING`:
            return Object.assign({}, state, { featuredLoading: true });

        case `${GET_FEATURED_PRODUCTS}_FULFILLED`:
            return Object.assign({}, state, { featuredLoading: false, featuredProducts: action.payload });

        case `${GET_FEATURED_PRODUCTS}_REJECTED`:
            return Object.assign({}, state, { featuredLoading: false });

        case `${POST_FEATURED_PRODUCTS}_PENDING`:
            return Object.assign({}, state, { featuredPostLoading: true });
        
        case `${POST_FEATURED_PRODUCTS}_FULFILLED`:
            return Object.assign({}, state, { featuredPostLoading: false });
        
        case `${POST_FEATURED_PRODUCTS}_REJECTED`:
            return Object.assign({}, state, { featuredPostLoading: false });

        default:
            return state;
    }
}