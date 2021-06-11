import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './components/Nav.js';

function App() {
    return (
        <Router>
            <Nav />
            <div className='App container py-5'>
                <h1 className='display-1'>Hello, world</h1>
            </div>
        </Router>
    );
}

export default App;
