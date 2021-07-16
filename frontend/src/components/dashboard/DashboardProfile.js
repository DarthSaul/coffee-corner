import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
    faMugHot,
    faFillDrip,
    faStore,
    faQuestion
} from '@fortawesome/free-solid-svg-icons';

const DashboardProfile = ({ profile }) => {
    const { fullName, location, social, brewMethods, coffees, avatar } =
        profile;
    const profileImage = avatar
        ? avatar.thumbnail
        : 'https://res.cloudinary.com/darthsaul/image/upload/w_150/v1626367195/Coffee-Corner/no_image_wkgy3c.png';
    return (
        <>
            <div className='card'>
                <div className='card-body'>
                    <div className='d-flex flex-column align-items-center text-center'>
                        <img
                            src={profileImage}
                            alt='Admin'
                            className='rounded-circle mb-2'
                            // width='150'
                        />

                        <Link to='/upload'>
                            <button className='btn btn-outline-success btn-sm'>
                                Edit Image
                            </button>
                        </Link>

                        <div className='mt-4'>
                            <h1 className='display-4 fw-normal'>{fullName}</h1>
                            <p className='text-muted fs-3 fw-light'>
                                {location}
                            </p>
                            {social && social.instagram && (
                                <div className='d-flex justify-content-center'>
                                    <a
                                        href={`https://www.instagram.com/${social.instagram}`}
                                        target='_blank'
                                        rel='noreferrer external'
                                    >
                                        <FontAwesomeIcon
                                            icon={faInstagram}
                                            size='2x'
                                            className='text-dark'
                                        />
                                    </a>
                                </div>
                            )}
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
                                {coffees.length}
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
                                {brewMethods.length}
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
        </>
    );
};

export default DashboardProfile;
