import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className='landing-page d-flex justify-content-center align-items-center vh-100 pb-5'>
            <button
                type='button'
                className='btn btn-lg btn-theme px-5 py-3 mb-5'
            >
                <Link
                    to='/coffee'
                    className='text-decoration-none text-reset display-4'
                >
                    Enter
                </Link>
            </button>
        </div>
    );
};

export default Landing;
