// React Imports
import React from 'react';
import { 
    Switch, Route, Test,

    LandingPage, Home, Browse, 
    Orders, FieldNewOrder, DisplayFieldOrder, 
    DisplayWarehouseOrder, DisplayProduct, DisplayEmployees,
    DisplayEmployeesCreate, DisplayEmployeesEdit, DisplayProductCreate,
    NoPage,
    Map,
} from './imports';

export default (
    <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/browse' component={Browse} />
        <Route path='/orders/create/:id' component={FieldNewOrder} />
        <Route path='/orders' component={Orders} />
        <Route path='/order/warehouse/:username/:id' component={DisplayWarehouseOrder} />
        <Route path='/order/:username/:id' component={DisplayFieldOrder} />
        <Route path='/product/display/:id' component={DisplayProduct} />
        <Route path='/product/create'component={DisplayProductCreate} />
        <Route path='/employees' component={DisplayEmployees} />
        <Route path='/employee/create' component={DisplayEmployeesCreate} />
        <Route path='/employee/edit/:id' component={DisplayEmployeesEdit} />
        <Route path='/map' component={Map} />
        <Route path='/test' component={Test} />
        <Route path='*' component={NoPage} />
    </Switch>
)