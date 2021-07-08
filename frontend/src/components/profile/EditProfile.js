import React, { useState } from 'react';

const EditProfile = ({ firstName, lastName, location, email }) => {
    const [formData, setFormData] = useState({
        firstName: firstName,
        lastName: lastName,
        location: location,
        email: email
    });
    const toggleEdit = event => {
        console.log('toggle...');
    };
    return (
        <div className='card mb-3'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-sm-3'>
                        <h6 className='mb-0'>First Name</h6>
                    </div>
                    <div className='col-sm-9 text-secondary'>{firstName}</div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-sm-3'>
                        <h6 className='mb-0'>Last Name</h6>
                    </div>
                    <div className='col-sm-9 text-secondary'>{lastName}</div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-sm-3'>
                        <h6 className='mb-0'>Email</h6>
                    </div>
                    <div className='col-sm-9 text-secondary'>{email}</div>
                </div>
                <hr />

                <div className='row'>
                    <div className='col-sm-3'>
                        <h6 className='mb-0'>Location</h6>
                    </div>
                    <div className='col-sm-9 text-secondary'>{location}</div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-sm-12'>
                        <button className='btn btn-info' onClick={toggleEdit}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
