import React from 'react';
import { Link } from 'react-router-dom';
import coffeeCup from '../coffee-cup.svg';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

const Nav = () => {
    return (
        <nav class='navbar navbar-expand-lg navbar-light bg-light'>
            <div class='container-fluid'>
                <Link class='navbar-brand' to='/'>
                    <img
                        src={coffeeCup}
                        alt=''
                        width='30'
                        height='24'
                        class='d-inline-block align-text-top me-1'
                    />
                    CC
                </Link>
                <button
                    class='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span class='navbar-toggler-icon'></span>
                </button>
                <div class='collapse navbar-collapse'>
                    <div class='navbar-nav me-auto mb-2 mb-lg-0'>
                        <Link
                            class='nav-link active'
                            aria-current='page'
                            to='/'
                        >
                            Home
                        </Link>
                        <Link class='nav-link' to='/reviews'>
                            Add a Review
                        </Link>
                        <Link class='nav-link' to='/distributors' tabindex='-1'>
                            Distributors
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
