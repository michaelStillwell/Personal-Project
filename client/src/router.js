// React Imports
import React, { Component } from 'react';
import {
    Switch, Route, Test
} from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';

export default (
    <Switch>
        <Route exact path='/' render={() => {
            if ( localStorage.getObject('auth-token') ) {
                return <HomePage />;
            } else {
                return <LandingPage />;
            }
        }} />
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/' component={LandingPage} />
    </Switch>
);