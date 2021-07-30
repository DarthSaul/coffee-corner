import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

import DashboardProfile from './DashboardProfile';
import EditProfile from '../profile/EditProfile';
import EditUser from '../profile/EditUser';
import Spinner from '../layout/Spinner';

const Dashboard = () => {
    const [profileData, setProfileData] = useState({
        profile: null,
        loading: true
    });

    const { userObj } = useContext(UserContext);

    useEffect(() => {
        const setUser = async () => {
            setProfileData({
                profile: userObj.profile,
                loading: false
            });
        };
        setUser();
    }, [userObj.profile]);

    const { loading, profile } = profileData;

    return (
        <>
            {userObj.loading ? (
                <div className='create-profile'>
                    <Spinner margin='auto' />
                </div>
            ) : !loading && profile ? (
                <div>
                    <div className='row'>
                        <div className='col-lg-4 mb-3'>
                            <DashboardProfile
                                loading={loading}
                                profile={profile}
                            />
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
                </div>
            ) : (
                <div className='create-profile'>
                    <Link
                        to='/profile/create'
                        className='btn btn-success btn-lg'
                    >
                        Create a Profile to view Dashboard
                    </Link>
                </div>
            )}
        </>
    );
};

export default Dashboard;
