import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
    faMugHot,
    faFillDrip,
    faStore,
    faQuestion
} from '@fortawesome/free-solid-svg-icons';

import Spinner from '../layout/Spinner';

import ProfileDataService from '../../services/profiles';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        profile: null,
        loading: true
    });

    const { id } = useParams();

    useEffect(() => {
        const getProfile = async user_id => {
            try {
                const res = await ProfileDataService.getProfileByUserId(
                    user_id
                );
                setProfileData({
                    ...res.data,
                    loading: false
                });
            } catch (err) {
                console.error(err);
            }
        };
        getProfile(id);
    }, [id]);

    const { profile, loading } = profileData;

    const profileImage =
        profile && profile.avatar
            ? profile.avatar.medium
            : 'https://res.cloudinary.com/darthsaul/image/upload/v1626367195/Coffee-Corner/no_image_wkgy3c.png';

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <div className='row'>
                    <div className='col-lg-8 mb-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-4'>
                                        <img
                                            src={profileImage}
                                            alt='Profile'
                                            className='rounded-start w-100'
                                        />
                                    </div>
                                    <div className='col-8 d-flex flex-column justify-content-between'>
                                        <h1 className='display-2 mb-0'>
                                            {profile.fullName}
                                        </h1>
                                        <span className='text-muted fs-1 fw-light'>
                                            {profile.location}
                                        </span>
                                        {profile.social &&
                                            profile.social.instagram && (
                                                <div className='d-flex justify-content-start'>
                                                    <a
                                                        href={`https://www.instagram.com/${profile.social.instagram}`}
                                                        target='_blank'
                                                        rel='noreferrer external'
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faInstagram}
                                                            size='3x'
                                                            className='text-dark'
                                                        />
                                                    </a>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='card mt-md-0 mb-2'>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <div className='row d-flex align-items-center'>
                                        <div className='col-1'>
                                            <FontAwesomeIcon icon={faMugHot} />
                                        </div>
                                        <span className='col-9'>Coffees</span>
                                        <span className='col text-secondary text-end'>
                                            {profile.coffees.length}
                                        </span>
                                    </div>
                                </li>
                                <li className='list-group-item'>
                                    <div className='row d-flex align-items-center'>
                                        <div className='col-1'>
                                            <FontAwesomeIcon
                                                icon={faFillDrip}
                                            />
                                        </div>
                                        <span className='col-9'>
                                            Brew Methods
                                        </span>
                                        <span className='col text-secondary text-end'>
                                            {profile.brewMethods.length}
                                        </span>
                                    </div>
                                </li>
                                <li className='list-group-item '>
                                    <div className='row d-flex align-items-center'>
                                        <div className='col-1'>
                                            <FontAwesomeIcon
                                                icon={faStore}
                                                className='me-2'
                                            />
                                        </div>
                                        <span className='col-9'>
                                            Coffee Shops
                                        </span>
                                        <span className='col text-secondary text-end'>
                                            0
                                        </span>
                                    </div>
                                </li>
                                <li className='list-group-item'>
                                    <div className='row d-flex align-items-center'>
                                        <div className='col-1'>
                                            <FontAwesomeIcon
                                                icon={faQuestion}
                                                className='me-2'
                                            />
                                        </div>
                                        <span className='col-9'>Questions</span>
                                        <span className='col text-secondary text-end'>
                                            0
                                        </span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='card mt-auto'>
                            <div className='card-body'>
                                <h1>Another card here</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProfilePage;
