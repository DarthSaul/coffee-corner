import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const { userObj, login } = useContext(UserContext);

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
        console.log(
            `Successfully logged in, ${userObj.user.username}! ID: ${userObj.user.user_id}`
        );
        return <Redirect to='/coffee' />;
    }

    const { username, password } = formData;

    return (
        <div className='card col-md-8 col-lg-6 m-auto p-4'>
            <div className='card-body'>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Username</label>
                        <input
                            type='text'
                            placeholder='Username'
                            name='username'
                            value={username}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Password</label>
                        <input
                            type='password'
                            placeholder='Password'
                            name='password'
                            value={password}
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

export default Login;
