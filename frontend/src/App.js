import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Nav from './components/Nav';
import Landing from './components/Landing';
import CoffeeList from './components/CoffeeList';
import AddReview from './components/AddReview';

function App() {
    return (
        <Router>
            <Nav active='Home' />
            <div className='container py-5'>
                <Switch>
                    <Route exact path='/'>
                        <Landing />
                    </Route>
                    <Route exact path='/coffee'>
                        <CoffeeList />
                    </Route>
                    <Route exact path='/reviews'>
                        <AddReview />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
