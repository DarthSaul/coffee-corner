import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import coffeeCup from '../../coffee-cup.svg';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

import { UserContext } from '../../contexts/UserContext';

const Navigation = () => {
    const {
        userObj: { loading, isAuthenticated },
        logout
    } = useContext(UserContext);

    const history = useHistory();

    const handleLogout = event => {
        event.preventDefault();
        logout();
        history.push('/');
    };

    return (
        <Navbar bg='light' expand='md'>
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
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mr-auto w-100'>
                        <Link className='nav-link' to='/'>
                            Home
                        </Link>
                        <Link className='nav-link' to='/coffee'>
                            Coffee
                        </Link>
                        <NavDropdown
                            title='Distributors'
                            id='basic-nav-dropdown'
                        >
                            <Link className='dropdown-item' to='#/3.1'>
                                Action
                            </Link>
                        </NavDropdown>
                        <div className='d-md-flex ms-md-auto'>
                            {!loading && !isAuthenticated ? (
                                <>
                                    <Link className='nav-link' to='/login'>
                                        Login
                                    </Link>
                                    <Link className='nav-link' to='/register'>
                                        Register
                                    </Link>
                                </>
                            ) : (
                                !loading && (
                                    <span
                                        className='nav-link'
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </span>
                                )
                            )}
                        </div>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
};

export default Navigation;
