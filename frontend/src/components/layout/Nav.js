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
        history.push('/login');
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
                <Navbar.Toggle
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                />
                <Navbar.Collapse id='navbarSupportedContent'>
                    <Nav className='mr-auto w-100'>
                        <Link className='nav-link' to='/'>
                            Home
                        </Link>

                        <NavDropdown title='Coffee' id='coffee-dropdown'>
                            <NavDropdown.Item href='/coffee'>
                                View All
                            </NavDropdown.Item>
                            <NavDropdown.Item href='/coffee/new'>
                                Add New
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown
                            title='Brew Methods'
                            id='brew-methods-dropdown'
                        >
                            <NavDropdown.Item href='/brews'>
                                View All
                            </NavDropdown.Item>

                            <NavDropdown.Item href='/brews/new'>
                                Add New
                            </NavDropdown.Item>
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
                                    <>
                                        <Link
                                            className='nav-link'
                                            to='/dashboard'
                                        >
                                            Dashboard
                                        </Link>
                                        <span
                                            className='nav-link'
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </span>
                                    </>
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
