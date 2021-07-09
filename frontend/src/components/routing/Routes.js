import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Alert from '../layout/Alert';
import Login from '../layout/Login';
import Register from '../layout/Register';
import NotFound from '../layout/NotFound';

import Dashboard from '../dashboard/Dashboard';

import CreateProfile from '../profile/CreateProfile';

import CoffeeList from '../coffee/CoffeeList';
import CoffeeItem from '../coffee/CoffeeItem';

import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        <div className='container p-4 mt-4'>
            <Alert />
            <Switch>
                <Route exact path={'/coffee'}>
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
    );
};

export default Routes;
