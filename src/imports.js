import axios from 'axios';
import { Switch, Route, Link } from 'react-router-dom';

import Test from './test';
import Header from './component/Header/Header';
import LandingPage from './component/LandingPage/LandingPage';
import Loading from './component/Loading/Loading';
import Login from './component/Login/Login';
import Home from './component/Home/Home';
import Browse from './component/Browse/Browse';
import Orders from './component/Orders/Orders';
import FieldNewOrder from './component/Orders/Field/FieldNewOrder';
import DisplayFieldOrder from './component/Display/DisplayFieldOrder';
import DisplayWarehouseOrder from './component/Display/DisplayWarehouseOrder';
import DisplayProduct from './component/Display/DisplayProduct';
import DisplayProductCreate from './component/Display/DisplayProductCreate';
import DisplayEmployees from './component/Display/DisplayEmployees';
import DisplayEmployeesCreate from './component/Display/DisplayEmployeeCreate'; 
import DisplayEmployeesEdit from './component/Display/DisplayEmployeesEdit';
import DisplayFeatured from './component/Display/DisplayFeatured';
import NoPage from './component/NoPage/NoPage';

import Map from './component/Map/Map';

export {
    axios,
    Switch,
    Route,
    Link,
    Test,

    Header,
    LandingPage,
    Loading,
    Home,
    Login,
    Browse,
    Orders,
    FieldNewOrder,
    DisplayFieldOrder,
    DisplayWarehouseOrder,
    DisplayProduct,
    DisplayProductCreate,
    DisplayEmployees,
    DisplayEmployeesCreate,
    DisplayEmployeesEdit,
    DisplayFeatured,
    NoPage,

    Map,
};