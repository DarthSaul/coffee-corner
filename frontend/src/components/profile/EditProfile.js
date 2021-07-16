import React, { useState, useEffect, useContext } from 'react';

import ProfileDataService from '../../services/profiles';

import { AlertContext } from '../../contexts/AlertContext';
import { UserContext } from '../../contexts/UserContext';

const EditProfile = ({
    profile: { firstName, lastName, location, social }
}) => {
    const [formData, setFormData] = useState({
        first: '',
        last: '',
        loc: '',
        insta: ''
    });

    const { userObj, loadUser } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        setFormData({
            first: firstName,
            last: lastName,
            loc: location,
            insta: social ? social.instagram : ''
        });
    }, [firstName, lastName, location, social]);

    const [editState, setEditState] = useState(false);

    const toggleEdit = () => {
        setFormData({
            first: firstName,
            last: lastName,
            loc: location,
            insta: social ? social.instagram : ''
        });
        setEditState(prevState => !prevState);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await ProfileDataService.updateProfile(
                {
                    firstName: first,
                    lastName: last,
                    location: loc,
                    social: {
                        instagram: insta
                    }
                },
                userObj.token
            );
            await loadUser();
            setEditState(prevState => !prevState);
            window.scroll(0, 0);
            setAlert('Profile updated!', 'success');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(state => ({
            ...state,
            [name]: value
        }));
    };

    const { first, last, loc, insta } = formData;

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
                            Instagram
                        </label>
                        <div className='col-sm-9 col-xl-10'>
                            <div className='input-group'>
                                <span
                                    className='input-group-text'
                                    id='basic-addon1'
                                >
                                    @
                                </span>
                                <input
                                    disabled={!editState}
                                    type='text'
                                    name='insta'
                                    value={insta}
                                    onChange={handleChange}
                                    className='form-control'
                                    placeholder='Handle'
                                />
                            </div>
                            <div className='form-text'>
                                Handle only, ex: <i>therock</i>
                            </div>
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
