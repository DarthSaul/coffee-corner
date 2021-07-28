import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
    return (
        <div className='card'>
            <div className='card-body'>
                <h1 className='x-large'>
                    <FontAwesomeIcon
                        icon={faExclamationTriangle}
                        className='me-3'
                    />
                    Page Not Found
                </h1>
                <p className='large mt-4'>Sorry, that page does not exist.</p>
                <button className='btn btn-theme '>
                    <Link to='/' className='text-decoration-none text-white'>
                        Return home
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default NotFound;
