import React, { useContext, useEffect } from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { AlertContext } from '../../contexts/AlertContext';

const PrivateRoute = ({ children, ...rest }) => {
    const {
        userObj: { isAuthenticated, loading }
    } = useContext(UserContext);

    const { setAlert } = useContext(AlertContext);

    const history = useHistory();

    useEffect(() => {
        if (!history.location.key) {
            setAlert('Please login to view that page.', 'secondary');
        }
    }, [history.location.key, setAlert]);

    return (
        <Route {...rest}>
            {!loading && !isAuthenticated ? <Redirect to='/login' /> : children}
        </Route>
    );
};

export default PrivateRoute;
