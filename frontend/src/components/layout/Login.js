import React, { useState, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { userObj, login } = useContext(UserContext);

    let location = useLocation();

    const handleChange = event => {
        const { name, value } = event.target;
        setFormData(state => ({
            ...state,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        await login(username, password);
    };

    if (userObj.isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    const { username, password } = formData;

    return (
        <div className='card col-md-7 col-xl-5 mx-auto p-4'>
            <div className='card-body'>
                {location.state && location.state.redirect && (
                    <p className='text-muted fst-italic'>
                        Please login to view that page.
                    </p>
                )}
                <form onSubmit={handleSubmit} className='m-3'>
                    <div className='mb-3'>
                        <label className='form-label fs-4'>Username</label>
                        <input
                            type='text'
                            placeholder='Username'
                            name='username'
                            value={username}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='form-label fs-4'>Password</label>
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <button type='submit' className='btn btn-lg btn-theme'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
