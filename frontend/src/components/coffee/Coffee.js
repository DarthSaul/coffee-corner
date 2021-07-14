import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import capitalize from 'capitalize';

import Reviews from './Reviews';

import CoffeeDataService from '../../services/coffees';
import coffeePic from '../../img/coffee_beans_ground.jpg';

import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

const Coffee = () => {
    const [coffeeState, setCoffeeState] = useState({
        _id: null,
        name: '',
        origin: '',
        distributor: '',
        roastType: '',
        reviews: [],
        tags: [],
        user: null
    });

    const { id } = useParams();
    const history = useHistory();

    const { userObj, loadUser } = useContext(UserContext);
    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        const getCoffee = async id => {
            try {
                const coffee = await CoffeeDataService.get(id);
                setCoffeeState(coffee.data);
            } catch (err) {
                console.error(err);
                if (err.response.status === 404) {
                    history.push('/notfound');
                }
            }
        };
        getCoffee(id);
    }, [history, id]);

    const deleteCoffee = async () => {
        try {
            await CoffeeDataService.deleteCoffee(
                _id,
                userObj.profile._id,
                userObj.token
            );
            setAlert('Coffee removed.', 'secondary');
            loadUser();
            history.push('/coffee');
        } catch (err) {
            setAlert('Whoops, something went wrong.', 'danger');
            console.error(err);
        }
    };

    const { _id, name, origin, distributor, roastType, tags, reviews, user } =
        coffeeState;

    return (
        <div className='row'>
            <div className='col-xl-6'>
                <div className='card'>
                    <img src={coffeePic} className='card-img-top' alt='...' />
                    <div className='card-body px-4 mb-3'>
                        <h5 className='card-title mb-4 display-3'>
                            {capitalize.words(name)}
                        </h5>
                        <h6 className='card-subtitle fs-4 fw-light mb-2 text-muted'>
                            {capitalize.words(origin)}
                        </h6>
                        <p className='card-text'>
                            <strong>Distributor: </strong>
                            {capitalize.words(distributor)}
                            <br />
                            <strong>Roast: </strong>
                            {capitalize.words(roastType)}
                            <br />
                            <strong>Notes: </strong>
                            {capitalize.words(tags.join(', '))}
                        </p>
                    </div>
                    {userObj.user && user && userObj.user._id === user && (
                        <div className='card-footer ps-4'>
                            <button
                                className='btn btn-danger'
                                onClick={deleteCoffee}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className='col-xl-6'>
                <Reviews coffeeId={id} coffeeReviews={reviews} />
            </div>
        </div>
    );
};

export default Coffee;
