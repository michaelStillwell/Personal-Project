import { combineReducers } from 'redux';
import reducer_product from './reducer_product';
import reducer_order from './reducer_order';
import reducer_login from './reducer_login';
import reducer_featured from './reducer_featured';
import reducer_employee from './reducer_employee';

export default combineReducers({
    reducer_product,
    reducer_order,
    reducer_login,
    reducer_featured,
    reducer_employee,
})