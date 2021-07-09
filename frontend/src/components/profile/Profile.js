import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
    faMugHot,
    faFillDrip,
    faStore,
    faQuestion
} from '@fortawesome/free-solid-svg-icons';

import ProfileDataService from '../../services/profiles';

import EditProfile from './EditProfile';

const Profile = ({ loading, token, id, email }) => {
    const [profile, setProfile] = useState({
        userId: null,
        firstName: '',
        lastName: '',
        fullName: '',
        location: ''
    });
    useEffect(() => {
        async function getProfile() {
            try {
                const res = await ProfileDataService.getUserProfile(token);
                if (res.data.profile) {
                    const { firstName, lastName, fullName, location } =
                        res.data.profile;
                    setProfile({
                        userId: id,
                        firstName,
                        lastName,
                        fullName,
                        location
                    });
                }
            } catch (err) {
                setProfile({
                    userId: null,
                    firstName: '',
                    lastName: '',
                    fullName: '',
                    location: ''
                });
                console.error(err);
            }
        }
        getProfile();
    }, [loading, token, id]);

    const { firstName, lastName, fullName, location } = profile;
    return (
        <div className='row'>
            <div className='col-lg-4 mb-3'>
                <div className='card'>
                    <div className='card-body'>
                        <div className='d-flex flex-column align-items-center text-center'>
                            <img
                                src='https://bootdey.com/img/Content/avatar/avatar7.png'
                                alt='Admin'
                                className='rounded-circle'
                                width='150'
                            />
                            <div className='mt-4'>
                                <h1>{fullName}</h1>
                                <p className='text-muted fs-3'>{location}</p>
                                <div className='d-flex justify-content-center'>
                                    <FontAwesomeIcon
                                        icon={faInstagram}
                                        size='2x'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card mt-3'>
                    <ul className='list-group list-group-flush'>
                        <li className='list-group-item'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-1'>
                                    <FontAwesomeIcon icon={faMugHot} />
                                </div>
                                <span className='col-9'>Coffees</span>
                                <span className='col text-secondary text-end'>
                                    0
                                </span>
                            </div>
                        </li>
                        <li className='list-group-item'>
                            <div className='row d-flex align-items-center'>
                                <div className='col-1'>
                                    <FontAwesomeIcon icon={faFillDrip} />
                                </div>
                                <span className='col-9'>Brew Methods</span>
                                <span className='col text-secondary text-end'>
                                    0
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
                                <span className='col-9'>Coffee Shops</span>
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
            </div>
            <div className='col-lg-8'>
                <EditProfile
                    firstName={firstName}
                    lastName={lastName}
                    email={email}
                    location={location}
                />
            </div>
        </div>
    );
};

export default Profile;
