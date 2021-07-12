import React, { useState, useEffect, useContext } from 'react';

import ProfileDataService from '../../services/profiles';

import { AlertContext } from '../../contexts/AlertContext';
import { UserContext } from '../../contexts/UserContext';

const EditUser = ({ email, username }) => {
    const [formData, setFormData] = useState({
        mail: '',
        uName: ''
    });
    const [original] = useState({
        email,
        username
    });

    const { loadUser, setUser, userObj } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        setFormData({
            mail: email,
            uName: username
        });
    }, [email, username]);

    const [editState, setEditState] = useState(false);

    const toggleEdit = () => {
        setFormData({
            mail: email,
            uName: username
        });
        setEditState(prevState => !prevState);
    };

    const { mail, uName } = formData;

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {};
        if (mail !== original.email) {
            data.email = mail;
        }
        if (uName !== original.username) {
            data.username = uName;
        }
        try {
            const res = await ProfileDataService.updateUser(
                data,
                userObj.token
            );
            const { error } = res.data;
            if (error) {
                throw new Error(error);
            }
            setUser(prevState => ({
                ...prevState,
                loading: true
            }));
            await loadUser();
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
                                name='mail'
                                value={mail}
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
                                name='uName'
                                value={uName}
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
