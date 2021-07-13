import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BrewDataService from '../../services/brewMethods';
import capitalize from 'capitalize';

const BrewList = () => {
    const [brewMethods, setBrewMethods] = useState([]);
    const [loading, setLoading] = useState('true');
    useEffect(() => {
        getBrews();
        setLoading(false);
    }, []);
    const getBrews = async () => {
        try {
            const res = await BrewDataService.getAll();
            setBrewMethods(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className='row'>
            {!loading &&
                brewMethods.map((brew, ind) => {
                    return (
                        <div className='col-xl-6' key={ind}>
                            <div className='card mb-4'>
                                <Link
                                    to={`/brew/${brew._id}`}
                                    className='text-decoration-none brew-title'
                                >
                                    <h5 className='card-header py-3'>
                                        {`${capitalize(brew.user.username)}'s`}{' '}
                                        {capitalize.words(brew.name)}
                                    </h5>
                                </Link>

                                <div className='card-body py-4'>
                                    <h5 className='card-title'>
                                        {brew.description}
                                    </h5>
                                    {/* <p className='card-text text-muted'>
                                        From {brew.user.profile.firstName}
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default BrewList;
