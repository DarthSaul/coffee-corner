import React from 'react';
import { Link } from 'react-router-dom';
import coffeeCup from '../coffee-cup.svg';

const Nav = ({ active }) => {
    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/'>
                    <img
                        src={coffeeCup}
                        alt=''
                        width='30'
                        height='24'
                        className='d-inline-block align-text-top me-1'
                    />
                    CC
                </Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse'>
                    <div className='navbar-nav me-auto mb-2 mb-lg-0'>
                        <Link
                            className={
                                active === 'Home'
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                            aria-current='page'
                            to='/'
                        >
                            Home
                        </Link>
                        <Link
                            className={
                                active === 'Coffee'
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                            to='/coffee'
                        >
                            Coffee
                        </Link>
                        <Link
                            className={
                                active === 'Reviews'
                                    ? 'nav-link active'
                                    : 'nav-link'
                            }
                            to='/reviews'
                        >
                            Add a Review
                        </Link>
                        <li className='nav-item dropdown'>
                            <Link
                                className='nav-link dropdown-toggle'
                                to='/distributors'
                                id='navbarDropdownMenuLink'
                                role='button'
                                data-bs-toggle='dropdown'
                                aria-expanded='false'
                            >
                                Distributors
                            </Link>
                            <ul
                                className='dropdown-menu'
                                aria-labelledby='navbarDropdownMenuLink'
                            >
                                <li>
                                    <Link className='dropdown-item' to='#'>
                                        Action
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
