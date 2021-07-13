import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

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
        <div className='card col-md-8 col-lg-6 m-auto p-4'>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>First Name</label>
                        <input
                            type='text'
                            name='firstName'
                            value={firstName}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Last Name</label>
                        <input
                            type='text'
                            name='lastName'
                            value={lastName}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Location</label>
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
    );
};

export default CreateProfile;
