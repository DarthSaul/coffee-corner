import React, { useState, useEffect } from 'react';

const EditProfile = ({ firstName, lastName, location, email }) => {
    const [formData, setFormData] = useState({
        first: '',
        last: '',
        loc: '',
        mail: ''
    });

    useEffect(() => {
        setFormData({
            first: firstName,
            last: lastName,
            loc: location,
            mail: email
        });
    }, [firstName, lastName, location, email]);

    const [editState, setEditState] = useState(false);

    const toggleEdit = event => {
        setEditState(prevState => !prevState);
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log('Making request to PUT route...');
        setEditState(prevState => !prevState);
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(state => ({
            ...state,
            [name]: value
        }));
    };

    const { first, last, loc, mail } = formData;

    return (
        <div className='card mb-3'>
            <div className='card-body'>
                <form className='my-2' onSubmit={handleSubmit}>
                    <div className='row mb-3'>
                        <label className='col-sm-3 col-xl-2 col-form-label'>
                            First Name
                        </label>
                        <div className='col-sm-9 col-xl-10'>
                            <input
                                disabled={!editState}
                                type='text'
                                name='first'
                                value={first}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label className='col-sm-3 col-xl-2  col-form-label'>
                            Last Name
                        </label>
                        <div className='col-sm-9 col-xl-10'>
                            <input
                                disabled={!editState}
                                type='text'
                                name='last'
                                value={last}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label className='col-sm-3 col-xl-2  col-form-label'>
                            Location
                        </label>
                        <div className='col-sm-9 col-xl-10'>
                            <input
                                disabled={!editState}
                                type='text'
                                name='loc'
                                value={loc}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label className='col-sm-3 col-xl-2 col-form-label'>
                            Email
                        </label>
                        <div className='col-sm-9 col-xl-10'>
                            <input
                                disabled={!editState}
                                type='email'
                                name='mail'
                                value={mail}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-3 col-xl-2 mb-3 mb-sm-0'>
                            <button
                                type='button'
                                className='btn btn-warning'
                                onClick={toggleEdit}
                            >
                                {editState ? 'Nevermind' : 'Edit'}
                            </button>
                        </div>
                        <div className='col-sm-3'>
                            {editState && (
                                <button
                                    type='submit'
                                    className='btn btn-success'
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
