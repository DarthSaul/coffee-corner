import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
    faMugHot,
    faFillDrip,
    faStore,
    faQuestion
} from '@fortawesome/free-solid-svg-icons';
import capitalize from 'capitalize';

import Spinner from '../layout/Spinner';

import ProfileDataService from '../../services/profiles';
import CoffeeDataService from '../../services/coffees';
import BrewDataService from '../../services/brewMethods';
import PostDataService from '../../services/posts';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        profile: null,
        loading: true
    });
    const [coffees, setCoffees] = useState([]);
    const [brews, setBrews] = useState([]);
    const [posts, setPosts] = useState([]);

    const { profile_id } = useParams();

    useEffect(() => {
        const getProfile = async profile_id => {
            try {
                const res = await ProfileDataService.getProfileById(profile_id);
                setProfileData({
                    ...res.data,
                    loading: false
                });
            } catch (err) {
                console.error(err);
            }
        };
        getProfile(profile_id);
    }, [profile_id]);

    const { profile, loading } = profileData;

    useEffect(() => {
        const getCoffees = async coffeeIds => {
            try {
                const data = await Promise.all(
                    coffeeIds.map(async coffee => {
                        const res = await CoffeeDataService.get(coffee);
                        return res.data;
                    })
                );
                setCoffees(data);
            } catch (err) {
                console.error(err);
            }
        };
        profile && profile.coffees && getCoffees(profile.coffees);
        const getBrews = async brewIds => {
            try {
                const data = await Promise.all(
                    brewIds.map(async brew => {
                        const res = await BrewDataService.getBrewById(brew);
                        return res.data;
                    })
                );
                setBrews(data);
            } catch (err) {
                console.error(err);
            }
        };
        profile && profile.brewMethods && getBrews(profile.brewMethods);
        const getPosts = async postIds => {
            try {
                const data = await Promise.all(
                    postIds.map(async post => {
                        const res = await PostDataService.getPostById(post);
                        return res.data;
                    })
                );
                setPosts(data);
            } catch (err) {
                console.error(err);
            }
        };
        profile && profile.posts && getPosts(profile.posts);
    }, [profile]);

    const profileImage =
        profile && profile.avatar
            ? profile.avatar.medium
            : 'https://res.cloudinary.com/darthsaul/image/upload/v1626367195/Coffee-Corner/no_image_wkgy3c.png';

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <div className='row mb-3'>
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
                                                                icon={
                                                                    faInstagram
                                                                }
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
                                                <FontAwesomeIcon
                                                    icon={faMugHot}
                                                />
                                            </div>
                                            <span className='col-9'>
                                                Coffees
                                            </span>
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
                                            <span className='col-9'>
                                                Questions
                                            </span>
                                            <span className='col text-secondary text-end'>
                                                0
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-5'>
                        <div className='col-lg mb-3'>
                            <div className='card'>
                                <h5 className='card-header py-3'>Coffee</h5>
                                <ul className='list-group list-group-flush'>
                                    {coffees &&
                                        coffees.map((el, ind) => (
                                            <Link
                                                to={`/coffee/${el._id}`}
                                                className='text-decoration-none'
                                                key={ind}
                                            >
                                                <li className='list-group-item py-3 d-flex justify-content-between'>
                                                    <span className='fs-5'>
                                                        {capitalize.words(
                                                            el.name
                                                        )}
                                                    </span>
                                                    <span className='text-muted fw-light'>
                                                        {capitalize.words(
                                                            el.distributor
                                                        )}
                                                    </span>
                                                </li>
                                            </Link>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg mb-3'>
                            <div className='card'>
                                <h5 className='card-header py-3'>Brewing</h5>
                                <ul className='list-group list-group-flush'>
                                    {brews &&
                                        brews.map((el, ind) => (
                                            <Link
                                                to={`/brew/${el._id}`}
                                                className='text-decoration-none'
                                                key={ind}
                                            >
                                                <li className='list-group-item py-3'>
                                                    <span className='fs-5'>
                                                        {capitalize.words(
                                                            el.name
                                                        )}
                                                    </span>
                                                </li>
                                            </Link>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className='col-lg mb-3'>
                            <div className='card'>
                                <h5 className='card-header py-3'>Posts</h5>
                                <ul className='list-group list-group-flush'>
                                    {posts &&
                                        posts.map((el, ind) => (
                                            <Link
                                                to={`/post/${el._id}`}
                                                className='text-decoration-none'
                                                key={ind}
                                            >
                                                <li className='list-group-item py-3'>
                                                    <span className='fs-5'>
                                                        {el.title}
                                                    </span>
                                                </li>
                                            </Link>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProfilePage;
