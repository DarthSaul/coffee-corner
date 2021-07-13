import React, { useState } from 'react';

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
        <div className='card mt-4'>
            <div className='card-body'>
                <p className='card-title fs-3 mb-3'>Leave a Review:</p>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <textarea
                            type='text'
                            name='text'
                            value={text}
                            onChange={handleChange}
                            className='form-control'
                            rows='4'
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
