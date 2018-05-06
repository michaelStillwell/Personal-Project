// React Imports
import React from 'react';
import {
    Switch, Route
} from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import BrowsePage from './components/BrowsePage/BrowsePage';
import ProductPage from './components/ProductPage/ProductPage';
import OrdersPage from './components/OrdersPage/OrdersPage';
import EmployeePage from './components/EmployeePage/EmployeePage';
import EmpInfoPage from './components/EmpInfoPage/EmpInfoPage';

export default (
    <Switch>
        <Route exact path="/" render={() => {
            if ( localStorage.getObject('auth-token') ) {
                return <HomePage />;
            } else {
                return <LandingPage />;
            }
        }} />
        <Route exact path="/browse" component={BrowsePage} />
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/orders" component={OrdersPage} />
        <Route exact path="/employees" component={EmployeePage} />
        <Route exact path="/employees/:id" component={EmpInfoPage} />
    </Switch>
);