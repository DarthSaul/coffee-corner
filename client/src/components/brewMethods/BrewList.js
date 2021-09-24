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

    let avatar =
        'https://res.cloudinary.com/darthsaul/image/upload/v1626367195/Coffee-Corner/no_image_wkgy3c.png';

    return (
        <div className='row'>
            <div className='col-12 mx-auto text-center mt-3 mb-3'>
                <button className='btn btn-new'>
                    <Link to='/brews/new'>Post New Brew Method</Link>
                </button>
            </div>
            {!loading &&
                brewMethods.map((brew, ind) => {
                    if (brew.user.profile.avatar) {
                        avatar = brew.user.profile.avatar.medium;
                    }
                    return (
                        <div
                            className='col-12 col-lg-10 col-xl-9 mx-auto'
                            key={ind}
                        >
                            <div className='card my-5'>
                                <img
                                    src={avatar}
                                    alt=''
                                    className='brew-card-img'
                                />
                                <Link
                                    to={`/brew/${brew._id}`}
                                    className='text-decoration-none brew-title'
                                >
                                    <h5 className='card-header p-4 fs-2'>
                                        {capitalize.words(brew.name)}
                                    </h5>
                                </Link>

                                <div className='card-body p-4'>
                                    <p className='card-text fs-4 fw-light'>
                                        {brew.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default BrewList;
