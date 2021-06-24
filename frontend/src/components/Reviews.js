import React, { useState, useEffect, useContext } from 'react';

import { UserContext } from '../contexts/UserContext';
import { AlertContext } from '../contexts/AlertContext';

import CoffeeDataService from '../services/coffees';

const Reviews = ({ coffeeId, coffeeReviews }) => {
    const [text, setText] = useState('');
    const [reviews, setReviews] = useState(coffeeReviews);

    useEffect(() => {
        getReviews(coffeeId);
    }, [coffeeId]);

    const {
        userObj: { user, loading }
    } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

    const getReviews = async id => {
        try {
            const coffee = await CoffeeDataService.get(id);
            setReviews(coffee.data.reviews);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteReview = async (reviewId, index) => {
        try {
            await CoffeeDataService.deleteReview(reviewId);
            setReviews(prevState => {
                prevState.splice(index, 1);
                return [...prevState];
            });
            setAlert(`Review removed.`, 'secondary');
            window.scrollTo(0, 0);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = event => {
        const { value } = event.target;
        setText(value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const res = await CoffeeDataService.createReview({
                coffee_id: coffeeId,
                text,
                user_id: user.user_id
            });
            setAlert(`Review posted!`, 'success');
            setText('');
            const { review } = res.data;
            setReviews(prevState => [
                ...prevState,
                {
                    ...review,
                    owner: {
                        _id: user.user_id,
                        username: user.username
                    }
                }
            ]);
            window.scrollTo(0, 0);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className='card col-md-10 col-lg-8 col-xl-6 m-auto mt-5'>
                <h5 className='card-title fs-2 p-3'>Reviews</h5>
                <ul className='list-group list-group-flush p-3'>
                    {reviews.length > 0 ? (
                        reviews.map((review, ind) => {
                            return (
                                <li
                                    className='list-group-item mt-3'
                                    key={review._id}
                                >
                                    <p>{review.text}</p>
                                    <p>
                                        - <i>By @{review.owner.username}</i>
                                    </p>
                                    {!loading &&
                                        user &&
                                        user.user_id === review.owner._id && (
                                            <button
                                                className='btn btn-sm btn-danger mb-3'
                                                onClick={() =>
                                                    deleteReview(
                                                        review._id,
                                                        ind
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>
                                        )}
                                </li>
                            );
                        })
                    ) : (
                        <h6>No reviews yet.</h6>
                    )}
                </ul>
            </div>

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
        </>
    );
};

export default Reviews;
