import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

import CoffeeDataService from '../../services/coffees';

import AddReview from './AddReview';
import EditReview from './EditReview';

const Reviews = ({ coffeeId, coffeeReviews }) => {
    const [reviews, setReviews] = useState([]);
    const [edit, setEdit] = useState({
        reviewId: null,
        reviewText: '',
        show: false,
        ind: null
    });

    useEffect(() => {
        setReviews(coffeeReviews);
    }, [coffeeReviews]);

    const {
        userObj: { token, user, loading }
    } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

    const handleReviewSubmit = async text => {
        try {
            const res = await CoffeeDataService.createReview(
                {
                    coffee_id: coffeeId,
                    text,
                    user_id: user._id
                },
                token
            );
            setAlert(`Review posted!`, 'success');
            const { review } = res.data;
            setReviews(prevState => [
                ...prevState,
                {
                    ...review,
                    user: {
                        _id: user._id,
                        username: user.username
                    }
                }
            ]);
            window.scrollTo(0, 0);
        } catch (err) {
            console.log(err);
        }
    };

    const handleEditClick = (id, text, ind) => {
        setEdit({
            reviewId: id,
            reviewText: text,
            show: true
        });
        setReviews(prevState => {
            prevState.splice(ind, 1);
            return [...prevState];
        });
    };

    const handleEditSubmit = async (reviewId, text) => {
        try {
            const res = await CoffeeDataService.updateReview(
                reviewId,
                { text },
                token
            );
            const { review } = res.data;
            setReviews(prevState => [
                ...prevState,
                {
                    ...review,
                    user: {
                        _id: user._id,
                        username: user.username
                    }
                }
            ]);
            setEdit({
                reviewId: null,
                reviewText: '',
                show: false,
                ind: null
            });
            window.scrollTo(0, 0);
            setAlert(`Review updated!`, 'success');
        } catch (err) {
            setEdit({
                reviewId: null,
                reviewText: '',
                show: false,
                ind: null
            });
            window.scrollTo(0, 0);
            setAlert(
                `Whoops, something went wrong. Please refresh the page.`,
                'danger'
            );
            console.error(err.response);
        }
    };

    const deleteReview = async (reviewId, index) => {
        try {
            await CoffeeDataService.deleteReview(reviewId, token);
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

    return (
        <>
            <div className='card mt-4 mt-xl-0'>
                <p className='card-title fs-3 p-3'>Reviews</p>
                <ul className='list-group list-group-flush px-3 pt-1'>
                    {reviews.length > 0 ? (
                        reviews.map((review, ind) => {
                            return (
                                <li
                                    className='list-group-item mt-3'
                                    key={review._id}
                                >
                                    <h5 className='mb-4'>{review.text}</h5>
                                    <p className='mb-4 text-muted'>
                                        - <i>By @{review.user.username}</i>
                                    </p>
                                    {!loading &&
                                        user &&
                                        user._id === review.user._id && (
                                            <>
                                                <button
                                                    className='btn btn-sm btn-warning mb-3 me-2'
                                                    onClick={() =>
                                                        handleEditClick(
                                                            review._id,
                                                            review.text,
                                                            ind
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className='btn btn-sm btn-danger mb-3'
                                                    onClick={e => {
                                                        e.preventDefault();
                                                        deleteReview(
                                                            review._id,
                                                            ind
                                                        );
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                </li>
                            );
                        })
                    ) : (
                        <p className='fs-3 p-3'>No reviews yet.</p>
                    )}
                </ul>
            </div>

            {edit.show && (
                <EditReview
                    reviewId={edit.reviewId}
                    reviewText={edit.reviewText}
                    handleEditSubmit={handleEditSubmit}
                />
            )}

            {!loading && user ? (
                <AddReview handleReviewSubmit={handleReviewSubmit} />
            ) : (
                <div className='card mt-4'>
                    <div className='card-body'>
                        <h5 className='card-title fs-2 mb-3'>
                            Leave a Review:
                        </h5>

                        <p>
                            <i>
                                You must be <Link to='/login'>logged in</Link>{' '}
                                to leave a review.
                            </i>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

export default Reviews;
