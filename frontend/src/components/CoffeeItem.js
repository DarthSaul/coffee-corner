import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import capitalize from 'capitalize';

import AddReview from './AddReview';

import CoffeeDataService from '../services/coffees';
import coffeePic from '../img/coffee_beans_ground.jpg';

const CoffeeItem = () => {
    const [coffeeState, setCoffeeState] = useState({
        id: null,
        name: '',
        origin: '',
        distributor: '',
        roastType: '',
        reviews: [],
        tags: []
    });

    const { id } = useParams();

    useEffect(() => {
        getCoffee(id);
    }, [id]);

    const getCoffee = async id => {
        try {
            const coffee = await CoffeeDataService.get(id);
            setCoffeeState(coffee.data);
        } catch (err) {
            console.log(err);
        }
    };

    const deleteReview = async (reviewId, index) => {
        try {
            await CoffeeDataService.deleteReview(reviewId);
            setCoffeeState(prevState => {
                prevState.reviews.splice(index, 1);
                return { ...prevState };
            });
        } catch (err) {
            console.log(err);
        }
    };

    const { name, origin, distributor, roastType, tags, reviews } = coffeeState;

    return (
        <>
            <div className='card col-md-10 col-lg-8 col-xl-6 m-auto'>
                <img src={coffeePic} className='card-img-top' alt='...' />
                <div className='card-body'>
                    <h5 className='card-title mb-2 fs-2'>{capitalize(name)}</h5>
                    <h6 className='card-subtitle mb-2 text-muted'>
                        {capitalize.words(origin)}
                    </h6>
                    <p className='card-text'>
                        <strong>Distributor: </strong>
                        {capitalize.words(distributor)}
                        <br />
                        <strong>Roast: </strong>
                        {capitalize.words(roastType)}
                        <br />
                        <strong>Tags: </strong>
                        {capitalize.words(tags.join(', '))}
                    </p>
                </div>
            </div>

            <AddReview coffeeId={id} />

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
                                        - <i>{review.name}</i>
                                    </p>
                                    <button
                                        className='btn btn-sm btn-danger mb-3'
                                        onClick={() =>
                                            deleteReview(review._id, ind)
                                        }
                                    >
                                        Delete
                                    </button>
                                </li>
                            );
                        })
                    ) : (
                        <h6>No reviews yet.</h6>
                    )}
                </ul>
            </div>
        </>
    );
};

export default CoffeeItem;
