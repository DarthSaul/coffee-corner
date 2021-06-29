import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AlertContext } from './AlertContext';
import setAuthToken from '../services/setAuthToken';

const UserContext = React.createContext();

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function UserProvider({ children }) {
    const [userObj, setUser] = useState({
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null
    });

    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get(`http://localhost:5000/api/v1/auth`);
            setUser({
                token: localStorage.getItem('token'),
                isAuthenticated: true,
                loading: false,
                user: res.data.user
            });
        } catch (err) {
            localStorage.removeItem('token');
            setUser({
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
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
            const res = await axios.post(
                'http://localhost:5000/api/v1/auth/register',
                body,
                config
            );
            localStorage.setItem('token', res.data.token);
            loadUser();
            setAlert(`Thanks for registering, ${username}!`, 'success');
        } catch (err) {
            localStorage.removeItem('token');
            setUser({
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            });
            setAlert(err.response.data, 'danger');
            console.error(err);
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
            const res = await axios.post(
                'http://localhost:5000/api/v1/auth/login',
                body,
                config
            );
            localStorage.setItem('token', res.data.token);
            loadUser();
            setAlert(`Welcome back, ${username}!`, 'success');
        } catch (err) {
            localStorage.removeItem('token');
            setUser({
                token: null,
                isAuthenticated: false,
                loading: false,
                user: null
            });
            setAlert('Incorrect username or password.', 'danger');
            console.error(err);
        }
    }

    async function logout() {
        localStorage.removeItem('token');
        setUser({
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null
        });
        setAlert(`Successfully logged out.`, 'secondary');
    }

    return (
        <UserContext.Provider
            value={{ userObj, loadUser, register, login, logout }}
        >
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };
