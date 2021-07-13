import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

import ProfileDataService from '../../services/profiles';

import Profile from '../profile/Profile';
import EditProfile from '../profile/EditProfile';
import EditUser from '../profile/EditUser';

const Dashboard = () => {
    const [profileData, setProfileData] = useState({
        profile: {},
        loading: true
    });

    const { userObj } = useContext(UserContext);

    useEffect(() => {
        const getProfile = async token => {
            try {
                const profile = await ProfileDataService.getUserProfile(
                    userObj.token
                );
                const { data } = profile;
                setProfileData({
                    profile: data.profile,
                    loading: false
                });
            } catch (err) {
                console.error(err);
            }
        };
        getProfile(userObj.token);
    }, [userObj.token]);

    const { loading, profile } = profileData;

    return (
        <div>
            {!loading && profile ? (
                <div className='row'>
                    <div className='col-lg-4 mb-3'>
                        <Profile loading={loading} profile={profile} />
                    </div>
                    <div className='col-lg-8'>
                        <EditProfile profile={profile} />
                        {!userObj.loading && (
                            <EditUser
                                token={userObj.token}
                                user={userObj.user}
                            />
                        )}
                    </div>
                </div>
            ) : (
                <Link to='/profile/create' className='btn btn-success'>
                    Create a Profile to view Dashboard
                </Link>
            )}
        </div>
    );
};

export default Dashboard;
