import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import Nav from './components/Nav';
// import Landing from './components/Landing';
import CoffeeList from './components/CoffeeList';
import CoffeeItem from './components/CoffeeItem';
import AddReview from './components/AddReview';
import Login from './components/Login';

function App() {
    return (
        <Router>
            <Nav active='Home' />
            <div className='container p-4 mt-4'>
                <Switch>
                    {/* <Route exact path='/'>
                        <Landing />
                    </Route> */}
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
}

export default App;
