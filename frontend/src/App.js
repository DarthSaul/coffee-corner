import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

import Alert from './components/layout/Alert';
import Navigation from './components/layout/Nav';
import Login from './components/layout/Login';
import Register from './components/layout/Register';
import NotFound from './components/layout/NotFound';

import Dashboard from './components/dashboard/Dashboard';

import CreateProfile from './components/profile/CreateProfile';

import CoffeeList from './components/coffee/CoffeeList';
import CoffeeItem from './components/coffee/CoffeeItem';

import PrivateRoute from './routing/PrivateRoute';

const App = () => (
    <Router>
        <Navigation />
        <div className='container p-4 mt-4'>
            <Alert />
            <Switch>
                <Route exact path={['/', '/coffee']}>
                    <CoffeeList />
                </Route>
                <Route exact path='/coffee/:id'>
                    <CoffeeItem />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/register'>
                    <Register />
                </Route>
                <PrivateRoute exact path='/dashboard'>
                    <Dashboard />
                </PrivateRoute>
                <PrivateRoute exact path='/profile/create'>
                    <CreateProfile />
                </PrivateRoute>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </div>
    </Router>
);

export default App;
