// React Imports
import React, { Component } from 'react';
import {
    Switch, Route, Test
} from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';

export default (
    <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/' component={LandingPage} />
    </Switch>
);