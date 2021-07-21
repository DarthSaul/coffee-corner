import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className='landing-page d-flex justify-content-center align-items-center vh-100 pb-5'>
            <Link to='/coffee'>
                <button
                    type='button'
                    className='btn btn-lg btn-landing px-5 py-2 mb-5 '
                >
                    <span className='display-3 fw-normal mx-2'>Enter</span>
                </button>
            </Link>
        </div>
    );
};

export default Landing;
