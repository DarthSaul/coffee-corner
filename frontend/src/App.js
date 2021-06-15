import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './App.css';

import Nav from './components/Nav';
import CoffeeList from './components/CoffeeList';
import CoffeeItem from './components/CoffeeItem';
import AddReview from './components/AddReview';
import Login from './components/Login';

const App = () => (
    <Router>
        <Nav active='Home' />
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
            </Switch>
        </div>
    </Router>
);

export default App;
