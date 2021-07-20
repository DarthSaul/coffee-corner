import React, { useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import ProfileDataService from '../../services/profiles';

import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

const CreateProfile = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        location: ''
    });

    const { userObj, loadUser } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

    const history = useHistory();

    const locationState = useLocation();

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(state => ({
            ...state,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const res = await ProfileDataService.createProfile(
                formData,
                userObj.token
            );
            const { status } = res.data;
            if (status === 'success') {
                setAlert(`Profile created!`, 'success');
                await loadUser();
                history.push('/dashboard');
            }
        } catch (err) {
            setAlert(`Whoops, something went wrong.`, 'danger');
            console.error(err);
        }
    };

    const { firstName, lastName, location } = formData;

    return (
        <>
            {locationState.state && locationState.state.fromRegister && (
                <div className='card col-md-8 col-lg-6 m-auto p-4 mb-3'>
                    <div className='card-body'>
                        <h5 className='fw-light'>
                            Thanks for registering!
                            <br />
                            <br />
                            Next, please complete your profile.
                        </h5>
                    </div>
                </div>
            )}
            <div className='card col-md-8 col-lg-6 m-auto p-4 mb-4'>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <label className='form-label fs-2'>
                                First Name
                            </label>
                            <input
                                type='text'
                                name='firstName'
                                value={firstName}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label fs-2'>Last Name</label>
                            <input
                                type='text'
                                name='lastName'
                                value={lastName}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='form-label fs-2'>Location</label>
                            <input
                                type='text'
                                name='location'
                                value={location}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                        <button type='submit' className='btn btn-success'>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CreateProfile;
