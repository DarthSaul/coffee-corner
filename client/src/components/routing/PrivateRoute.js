import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

const PrivateRoute = ({ children, ...rest }) => {
    const {
        userObj: { isAuthenticated, loading }
    } = useContext(UserContext);

    return (
        <Route {...rest}>
            {!loading && !isAuthenticated ? (
                <Redirect
                    to={{
                        pathname: '/login',
                        state: { redirect: true }
                    }}
                />
            ) : (
                children
            )}
        </Route>
    );
};

export default PrivateRoute;
