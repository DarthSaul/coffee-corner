import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileDataService from '../../services/profiles';

const ProfileCard = ({ userId }) => {
    const [profileData, setProfileData] = useState({
        profile: null,
        loading: true
    });

    useEffect(() => {
        const getProfile = async id => {
            try {
                const res = await ProfileDataService.getProfileByUserId(id);
                setProfileData({
                    ...res.data,
                    loading: false
                });
            } catch (err) {
                console.error(err);
            }
        };

        getProfile(userId);
    }, [userId]);

    const { profile, loading } = profileData;

    const profileImage =
        profile && profile.avatar
            ? profile.avatar.medium
            : 'https://res.cloudinary.com/darthsaul/image/upload/v1626367195/Coffee-Corner/no_image_wkgy3c.png';

    return (
        <div className='card'>
            <div className='card-title mt-3 ms-3'>
                <span className='fw-light fst-italic text-muted'>
                    Coffee posted by
                </span>
            </div>
            <div className='card-body'>
                {!loading && (
                    <div className='row'>
                        <div className='col-4 my-auto'>
                            <img
                                src={profileImage}
                                alt='Profile'
                                className='rounded-start w-100'
                            />
                        </div>
                        <div className='col-8 d-flex flex-column justify-content-between'>
                            <h1 className='mb-0'>{profile.fullName}</h1>
                            <span className='text-muted fs-4 d-none d-sm-block'>
                                {profile.location}
                            </span>
                            <div className='px-3 py-1 bg-secondary d-flex justify-content-between rounded text-white'>
                                <div className='d-flex flex-column'>
                                    <span>Coffees</span>
                                    <span>{profile.coffees.length}</span>
                                </div>
                                <div className='d-flex flex-column'>
                                    <span>Brew Methods</span>
                                    <span>{profile.brewMethods.length}</span>
                                </div>
                                <div className='d-flex flex-column'>
                                    <span>Posts</span>
                                    <span>2</span>
                                </div>
                            </div>
                            <div className='mt-2'>
                                <Link to={`/profile/${userId}`}>
                                    <button className='btn btn-outline-success'>
                                        View Profile
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileCard;
