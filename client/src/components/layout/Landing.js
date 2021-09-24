import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

const Landing = () => {
    const {
        userObj: { loading, isAuthenticated }
    } = useContext(UserContext);
    return (
        <div className='landing-page d-flex justify-content-center align-items-center vh-100 pb-5'>
            {!loading && isAuthenticated ? (
                <Link to='/dashboard'>
                    <button
                        type='button'
                        className='btn btn-lg btn-landing px-5 py-2 mb-5 mx-1'
                    >
                        <span className='fw-bold'>Dashboard</span>
                    </button>
                </Link>
            ) : (
                <>
                    <Link to='/login'>
                        <button
                            type='button'
                            className='btn btn-lg btn-landing px-5 py-2 mb-5 mx-1'
                        >
                            <span className='fw-bold'>Login</span>
                        </button>
                    </Link>
                    <Link to='/register'>
                        <button
                            type='button'
                            className='btn btn-lg btn-landing px-5 py-2 mb-5 mx-1'
                        >
                            <span className='fw-bold'>Register</span>
                        </button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Landing;
