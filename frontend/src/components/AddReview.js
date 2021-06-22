import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../contexts/UserContext';

import CoffeeDataService from '../services/coffees';

const AddReview = ({ coffeeId }) => {
    const [formData, setFormData] = useState({
        name: '',
        text: ''
    });

    const {
        userObj: { id }
    } = useContext(UserContext);

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
            await CoffeeDataService.createReview({
                coffee_id: coffeeId,
                text,
                name
            });
            history.go(0);
        } catch (err) {
            console.log(err);
        }
    };

    const { name, text } = formData;

    return (
        <div className='card col-md-10 col-lg-8 col-xl-6 m-auto mt-5'>
            <div className='card-body'>
                <h1>Leave a review:</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label className='form-label'>Name</label>
                        <input
                            type='text'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
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
