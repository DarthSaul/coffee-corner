import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Spinner = () => (
    <>
        <div style={{ width: '100%' }}>
            <FontAwesomeIcon
                icon={faSpinner}
                spin
                size='4x'
                style={{
                    width: '200px',
                    margin: 'auto',
                    display: 'block',
                    color: 'white'
                }}
            />
        </div>
    </>
);

export default Spinner;
