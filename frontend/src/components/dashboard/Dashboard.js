import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

import Profile from '../profile/Profile';

const Dashboard = () => {
    const {
        userObj: { token, loading, user }
    } = useContext(UserContext);

    return (
        <div>
            {user.profile ? (
                <Profile
                    token={token}
                    loading={loading}
                    id={user._id}
                    email={user.email}
                    username={user.username}
                />
            ) : (
                <Link to='/profile/create' className='btn btn-success'>
                    Create Profile
                </Link>
            )}
        </div>
    );
};

export default Dashboard;
