import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import CoffeeDataService from '../services/coffees';

const EditReview = ({ reviewId, reviewText, coffeeId }) => {
    const [text, setText] = useState('');

    const history = useHistory();

    useEffect(() => {
        setText(reviewText);
    }, [reviewText]);

    const handleChange = event => {
        const { value } = event.target;
        setText(value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await CoffeeDataService.updateReview({
                review_id: reviewId,
                text: text
            });
            history.go(0);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='card col-md-10 col-lg-8 col-xl-6 m-auto mt-5'>
            <div className='card-body'>
                <h5 className='card-title fs-2 mb-3'>Editing Review:</h5>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <textarea
                            type='text'
                            name='text'
                            value={text}
                            onChange={handleChange}
                            className='form-control'
                            rows='6'
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

export default EditReview;
