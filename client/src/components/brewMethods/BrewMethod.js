import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import BrewDataService from '../../services/brewMethods';
import capitalize from 'capitalize';

import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

import ProfileCard from '../profile/ProfileCard';

const BrewMethod = () => {
    const [brewState, setBrewState] = useState({
        _id: null,
        name: '',
        description: '',
        coffeeWeight: '',
        ratioWater: 0,
        ratioCoffee: 1,
        grindType: '',
        items: [],
        user: null
    });
    const [loading, setLoading] = useState(true);
    const { userObj, loadUser } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        getBrewMethod(id);
    }, [id]);

    const getBrewMethod = async id => {
        try {
            const brewMethod = await BrewDataService.getBrewById(id);
            setBrewState({
                ...brewMethod.data,
                coffeeWeight: brewMethod.data.weights.coffee,
                ratioWater: brewMethod.data.weights.waterRatio.gramsWater,
                ratioCoffee: brewMethod.data.weights.waterRatio.gramsCoffee
            });
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const {
        _id,
        name,
        description,
        coffeeWeight,
        ratioWater,
        ratioCoffee,
        grindType,
        items,
        user
    } = brewState;

    const deleteBrew = async () => {
        try {
            await BrewDataService.deleteBrew(
                id,
                userObj.profile._id,
                userObj.token
            );
            setAlert(`Brew method removed.`, 'secondary');
            loadUser();
            history.push('/brews');
        } catch (err) {
            setAlert(`Whoops, something went wrong.`, 'danger');
            console.error(err);
        }
    };
    return (
        <div className='row mb-5'>
            <div className='col-xl-7'>
                <div className='card'>
                    {!loading && (
                        <>
                            <div className='card-body p-5'>
                                <h2 className='card-title mb-2'>
                                    {capitalize.words(name)}
                                </h2>
                                <h6 className='card-subtitle mb-4 text-muted'>
                                    By {capitalize.words(user.username)}
                                </h6>
                                <div className='card-text'>
                                    <div className='mb-3'>
                                        <strong>Description</strong>
                                        <br />
                                        {description}
                                    </div>
                                    <div className='mb-3'>
                                        <strong>Grind</strong>
                                        <br />
                                        {grindType}
                                    </div>
                                    {coffeeWeight && (
                                        <div className='mb-3'>
                                            <strong>Measurements</strong>
                                            <br />
                                            Coffee: {coffeeWeight}
                                            <br />
                                            Water:{' '}
                                            {`${ratioWater} grams water per ${ratioCoffee} grams coffee`}
                                        </div>
                                    )}
                                    {items && (
                                        <div className='mb-3'>
                                            <strong>Items</strong>
                                            <br />
                                            {items.map((el, ind) => (
                                                <span key={ind}>
                                                    {el}
                                                    {ind + 1 === items.length
                                                        ? ''
                                                        : ', '}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {userObj.user && user._id === userObj.user._id && (
                                    <div className='mt-5'>
                                        <Link to={`/brew/edit/${_id}`}>
                                            <button className='btn btn-outline-warning me-2'>
                                                Edit
                                            </button>
                                        </Link>

                                        <button
                                            className='btn btn-outline-danger'
                                            onClick={deleteBrew}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className='col-xl-5 mt-4 mt-xl-0'>
                {user && (
                    <ProfileCard userId={user._id} text='Brew posted by' />
                )}
            </div>
        </div>
    );
};

export default BrewMethod;
