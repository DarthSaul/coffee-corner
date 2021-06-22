import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

import Navigation from './components/Nav';
import CoffeeList from './components/CoffeeList';
import CoffeeItem from './components/CoffeeItem';
import AddReview from './components/AddReview';
import Login from './components/Login';
import Register from './components/Register';

const App = () => (
    <Router>
        <Navigation />
        <div className='container p-4 mt-4'>
            <Switch>
                <Route exact path={['/', '/coffee']}>
                    <CoffeeList />
                </Route>
                <Route exact path='/coffee/:id/review'>
                    <AddReview />
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
            </Switch>
        </div>
    </Router>
);

export default App;
