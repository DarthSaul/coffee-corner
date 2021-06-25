import React, { useEffect, useState } from 'react';

const AddReview = ({ handleReviewSubmit }) => {
    const [text, setText] = useState('');

    const handleChange = event => {
        const { value } = event.target;
        setText(value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        setText('');
        handleReviewSubmit(text);
    };
    return (
        <div className='card col-md-10 col-lg-8 col-xl-6 m-auto mt-5'>
            <div className='card-body'>
                <h5 className='card-title fs-2 mb-3'>Leave a Review:</h5>
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

export default AddReview;
