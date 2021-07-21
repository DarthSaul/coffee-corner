import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Redirect, useLocation } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [validated, setValidated] = useState(false);

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
        if (username !== '' && password !== '') {
            event.preventDefault();
            return await login(username, password);
        }
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
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
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    className='m-3'
                >
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
                        Login
                    </button>
                </Form>
            </div>
        </div>
    );
};

export default Login;
