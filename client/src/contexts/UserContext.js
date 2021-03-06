import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AlertContext } from './AlertContext';
import setAuthToken from '../services/setAuthToken';

import ProfileDataService from '../services/profiles';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [userObj, setUser] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        profile: null
    });

    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        try {
            if (localStorage.token) {
                setAuthToken(localStorage.token);
            }
            const user = await axios.get('/api/v1/auth');
            const profile = await ProfileDataService.getUserProfile(
                localStorage.token
            );
            setUser({
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                loading: false,
                user: user.data.user,
                profile: profile.data.profile
            });
        } catch (err) {
            localStorage.removeItem('token');
            setUser({
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                profile: null
            });
            console.error(err);
        }
    }

    async function register(email, username, password) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ email, username, password });
        try {
            const res = await axios.post('/api/v1/auth/register', body, config);
            localStorage.setItem('token', res.data.token);
            loadUser();
            setAlert(`Thanks for registering, ${username}!`, 'success');
        } catch (err) {
            const errors = err.response.data.errors;
            setAlert(errors[0].msg, 'danger');
            localStorage.removeItem('token');
            setUser({
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null,
                profile: null
            });
            if (errors) {
                console.error(errors);
            }
        }
    }

    async function login(username, password) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({ username, password });
        try {
            const res = await axios.post('/api/v1/auth/login', body, config);
            localStorage.setItem('token', res.data.token);
            loadUser();
            setAlert(`Welcome back, ${username}!`, 'success');
        } catch (err) {
            setAlert(
                'Incorrect username or password. Please try logging in again.',
                'danger'
            );
            const error = err.response.data;
            authError(error);
        }
    }

    async function logout() {
        authError();
        setAlert(`Successfully logged out.`, 'secondary');
    }

    function authError(error) {
        localStorage.removeItem('token');
        setUser({
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
            profile: null
        });
        if (error) {
            console.error(error);
        }
    }

    return (
        <UserContext.Provider
            value={{
                userObj,
                setUser,
                loadUser,
                register,
                login,
                logout,
                authError
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };
