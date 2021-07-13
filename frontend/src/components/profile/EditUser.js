import React, { useState, useEffect, useContext } from 'react';

import ProfileDataService from '../../services/profiles';

import { AlertContext } from '../../contexts/AlertContext';
import { UserContext } from '../../contexts/UserContext';

const EditUser = ({ token, user }) => {
    const [formData, setFormData] = useState({
        email: '',
        username: ''
    });

    const [original] = useState({
        email: user.email,
        username: user.username
    });

    const { setAlert } = useContext(AlertContext);
    const { loadUser } = useContext(UserContext);

    useEffect(() => {
        setFormData({
            email: user.email,
            username: user.username
        });
    }, [user]);

    const [editState, setEditState] = useState(false);

    const toggleEdit = async () => {
        await loadUser();
        setEditState(prevState => !prevState);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {};
        if (email !== original.email) {
            data.email = email;
        }
        if (username !== original.username) {
            data.username = username;
        }
        try {
            const res = await ProfileDataService.updateUser(data, token);
            const { error } = res.data;
            if (error) {
                throw new Error(error);
            }
            setEditState(prevState => !prevState);
            window.scroll(0, 0);
            setAlert('User info updated!', 'success');
        } catch (err) {
            window.scroll(0, 0);
            setAlert(err.message, 'danger');
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

    const { email, username } = formData;

    return (
        <div className='card mb-3'>
            <div className='card-body'>
                <form className='my-2' onSubmit={handleSubmit}>
                    <div className='row mb-3'>
                        <label className='col-sm-3 col-xl-2 col-form-label'>
                            Email
                        </label>
                        <div className='col-sm-9 col-xl-10'>
                            <input
                                disabled={!editState}
                                type='email'
                                name='email'
                                value={email}
                                onChange={handleChange}
                                className='form-control'
                            />
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <label className='col-sm-3 col-xl-2 col-form-label'>
                            Username
                        </label>
                        <div className='col-sm-9 col-xl-10'>
                            <input
                                disabled={!editState}
                                type='text'
                                name='username'
                                value={username}
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

export default EditUser;
