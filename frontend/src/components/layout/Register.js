import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Redirect } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });
    const [validated, setValidated] = useState(false);

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
        const form = event.currentTarget;
        if (form.checkValidity()) {
            setValidated(false);
            return await register(email, username, password);
        }
        setValidated(true);
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
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                    className='m-3'
                >
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
                        <Form.Control.Feedback type='invalid'>
                            Please provide a valid email.
                        </Form.Control.Feedback>
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
                            minLength='3'
                        />
                        <Form.Control.Feedback type='invalid'>
                            Username must be at least 3 characters.
                        </Form.Control.Feedback>
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
                            minLength='6'
                        />
                        <Form.Control.Feedback type='invalid'>
                            Password must be at least 6 characters.
                        </Form.Control.Feedback>
                    </div>
                    <button type='submit' className='btn btn-lg btn-theme'>
                        Register
                    </button>
                </Form>
            </div>
        </div>
    );
};

export default Register;
