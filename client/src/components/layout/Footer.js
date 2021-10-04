import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className='footer'>
            <div className='container-fluid px-3 d-flex justify-content-between h-100 align-items-center'>
                <div className='text-muted'>&copy; 2021, Saul Graves</div>
                <a
                    href='https://github.com/DarthSaul/coffee-corner'
                    className='text-decoration-none'
                    target='_blank'
                    rel='noreferrer'
                >
                    <FontAwesomeIcon
                        icon={faGithub}
                        className='me-2 text-dark'
                    />
                    <span className='text-muted'>View the Code</span>
                </a>
            </div>
        </div>
    );
};

export default Footer;
