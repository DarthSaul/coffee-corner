import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const { register, userObj } = useContext(UserContext);

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(state => ({
            ...state,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        await register(email, username, password);
    };

    if (userObj.isAuthenticated) {
        return (
            <Redirect
                to={{
                    pathname: '/profile/create',
                    state: { fromRegister: true }
                }}
            />
        );
    }

    const { email, username, password } = formData;

    return (
        <div className='card col-md-7 col-xl-5 mx-auto p-4'>
            <div className='card-body'>
                <form onSubmit={handleSubmit} className='m-3'>
                    <div className='mb-3'>
                        <label className='form-label fs-4'>Email</label>
                        <input
                            type='email'
                            placeholder='Email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            className='form-control'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label fs-4'>Username</label>
                        <input
                            type='text'
                            placeholder='Username'
                            name='username'
                            value={username}
                            onChange={handleChange}
                            className='form-control'
                            required
                        />
                    </div>
                    <div className='mb-5'>
                        <label className='form-label fs-4'>Password</label>
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                            className='form-control'
                            required
                        />
                    </div>
                    <button type='submit' className='btn btn-lg btn-theme'>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
