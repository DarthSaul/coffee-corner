import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = ({ color = 'white' }) => (
    <>
        <div>
            <FontAwesomeIcon
                icon={faSpinner}
                spin
                size='5x'
                style={{
                    display: 'block',
                    color
                }}
            />
        </div>
    </>
);

export default Spinner;
