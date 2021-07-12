import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import BrewDataService from '../../services/brewMethods';
import capitalize from 'capitalize';

import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

const BrewMethod = () => {
    const [brewState, setBrewState] = useState({
        _id: null,
        name: '',
        description: '',
        weights: {},
        grindType: '',
        items: [],
        user: {}
    });
    const [loading, setLoading] = useState(true);
    const {
        userObj: { token }
    } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

    const { id } = useParams();

    const history = useHistory();

    useEffect(() => {
        getBrewMethod(id);
    }, [id]);

    const getBrewMethod = async id => {
        try {
            const brewMethod = await BrewDataService.getBrewById(id);
            setBrewState(brewMethod.data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    const { name, description, weights, grindType, items, user } = brewState;

    const deleteBrew = async () => {
        try {
            await BrewDataService.deleteBrew(id, token);
            setAlert(`Brew method removed.`, 'secondary');
            history.push('/brews');
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className='card col-xl-10 m-auto'>
            {!loading && (
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
                        {weights && (
                            <div className='mb-3'>
                                <strong>Measurements</strong>
                                <br />
                                Coffee: {weights.coffee}
                                <br />
                                Water: {weights.waterRatio}
                            </div>
                        )}
                    </div>
                    <div className='card-footer'>
                        <button className='btn btn-danger' onClick={deleteBrew}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrewMethod;
