import React, { useState, useContext } from 'react';

import { UserContext } from '../contexts/UserContext';
import { AlertContext } from '../contexts/AlertContext';

import CoffeeDataService from '../services/coffees';

const AddReview = ({ coffeeId }) => {
    const [formData, setFormData] = useState({
        text: ''
    });

    const {
        userObj: { user }
    } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

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
            await CoffeeDataService.createReview({
                coffee_id: coffeeId,
                text,
                user_id: user.user_id
            });
            setAlert(`Review posted!`, 'success');
            window.scrollTo(0, 0);
        } catch (err) {
            console.log(err);
        }
    };

    const { text } = formData;

    return (
        <div className='card col-md-10 col-lg-8 col-xl-6 m-auto mt-5'>
            <div className='card-body'>
                <h1>Leave a review:</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Review</label>
                        <textarea
                            type='text'
                            name='text'
                            value={text}
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

export default AddReview;
