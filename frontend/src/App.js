import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

import Navigation from './components/layout/Nav';
import Landing from './components/layout/Landing';

import Routes from './components/routing/Routes';

const App = () => (
    <Router>
        <>
            <Navigation />
            <Switch>
                <Route exact path='/'>
                    <Landing />
                </Route>
                <Route>
                    <Routes />
                </Route>
            </Switch>
        </>
    </Router>
);

export default App;
