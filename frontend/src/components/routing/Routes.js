import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Alert from '../layout/Alert';
import Login from '../layout/Login';
import Register from '../layout/Register';
import NotFound from '../layout/NotFound';

import Dashboard from '../dashboard/Dashboard';

import CreateProfile from '../profile/CreateProfile';

import CoffeeList from '../coffee/CoffeeList';
import Coffee from '../coffee/Coffee';

import BrewList from '../brewMethods/BrewList';
import BrewMethod from '../brewMethods/BrewMethod';
import AddBrew from '../brewMethods/AddBrew';

import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        <div className='container p-4 mt-4'>
            <Alert />
            <Switch>
                <Route exact path='/coffee'>
                    <CoffeeList />
                </Route>
                <Route exact path='/coffee/new'>
                    <NotFound />
                </Route>
                <Route exact path='/coffee/:id'>
                    <Coffee />
                </Route>
                <Route exact path='/login'>
                    <Login />
                </Route>
                <Route exact path='/register'>
                    <Register />
                </Route>

                <Route exact path='/brews'>
                    <BrewList />
                </Route>
                <Route exact path='/brew/:id'>
                    <BrewMethod />
                </Route>
                <PrivateRoute exact path='/brews/new'>
                    <AddBrew />
                </PrivateRoute>

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