// React Imports
import React from 'react';
import { 
    Switch, Route, Test,

    Header, LandingPage, Home, Browse, 
    Orders, FieldNewOrder, DisplayFieldOrder, 
    DisplayWarehouseOrder, DisplayProduct, DisplayEmployees,
    DisplayEmployeesCreate, DisplayEmployeesEdit, DisplayFeatured,
    DisplayProductCreate, NoPage,
    Map,
} from './imports';

export default (
    <Switch>
        <Route exact path='/' render={props => (
            <div>
                <Header />
                <LandingPage />
            </div>
        )} />
        <Route path='/home' render={props => (
            <div>
                <Header />
                <Home {...props} />
            </div>
        )} />
        <Route path='/browse' render={props => (
            <div>
                <Header />
                <Browse {...props} />
            </div>
        )} />
        <Route path='/orders/create/:id' render={props => (
            <div>
                <Header />
                <FieldNewOrder {...props} />
            </div>
        )} />
        <Route path='/orders' render={props => (
            <div>
                <Header />
                <Orders {...props} />
            </div>
        )} />
        <Route path='/order/warehouse/:username/:id' render={props => (
            <div>
                <Header />
                <DisplayWarehouseOrder {...props} />
            </div>
        )} />
        <Route path='/order/:username/:id' render={props => (
            <div>
                <Header />
                <DisplayFieldOrder {...props} />
            </div>
        )} />
        <Route path='/product/display/:id' render={props => (
            <div>
                <Header />
                <DisplayProduct {...props} />
            </div>
        )} />
        <Route path='/product/create'render={props => (
            <div>
                <Header />
                <DisplayProductCreate {...props} />
            </div>
        )} />
        <Route path='/employees' render={props => (
            <div>
                <Header />
                <DisplayEmployees {...props} />
            </div>
        )} />
        <Route path='/employee/create' render={props => (
            <div>
                <Header />
                <DisplayEmployeesCreate {...props} />
            </div>
        )} />
        <Route path='/employee/edit/:id' render={props => (
            <div>
                <Header />
                <DisplayEmployeesEdit {...props} />
            </div>
        )} />
        <Route path='/featured' render={props => (
            <div>
                <Header />
                <DisplayFeatured {...props} />
            </div>
        )} />
        <Route path='/map' render={props => (
            <div>
                <Header />
                <Map {...props} />
            </div>
        )} />
        <Route path='/test' render={props => (
            <div>
                <Header />
                <Test {...props} />
            </div>
        )} />
        <Route path='*' render={props => (
            <div>
                <NoPage />
            </div>
        )} />
    </Switch>
)