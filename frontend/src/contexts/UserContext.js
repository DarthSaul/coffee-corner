import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { AlertContext } from './AlertContext';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [userObj, setUser] = useState({
        isAuthenticated: null,
        loading: true,
        user: null
    });

    const { setAlert } = useContext(AlertContext);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        const id = Cookies.get('user');
        if (id) {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/v1/auth/get/${id}`
                );
                const { data } = res;
                setUser({
                    isAuthenticated: true,
                    loading: false,
                    user: {
                        username: data.username,
                        user_id: data._id
                    }
                });
            } catch (err) {
                console.error(err);
            }
        } else {
            setUser(prevState => ({
                ...prevState,
                loading: false
            }));
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
            // console.log(res);
            const { data } = res;
            setUser({
                isAuthenticated: true,
                loading: false,
                user: {
                    username: data.username,
                    user_id: data._id
                }
            });
            Cookies.set('user', data._id, { expires: 7 });
            setAlert(`Welcome, ${data.username}!`, 'success');
        } catch (err) {
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
            const { data } = res;
            setUser({
                isAuthenticated: true,
                loading: false,
                user: {
                    username: data.user.username,
                    user_id: data.user._id
                }
            });
            Cookies.set('user', data.user._id, { expires: 7 });
            setAlert(`Welcome back, ${data.user.username}!`, 'success');
        } catch (err) {
            setAlert('Incorrect username or password.', 'danger');
            console.error(err);
        }
    }

    async function logout() {
        try {
            await axios.get('http://localhost:5000/api/v1/auth/logout');
            Cookies.remove('user');
            setUser({
                isAuthenticated: false,
                loading: false,
                user: {}
            });
            setAlert(`Successfully logged out.`, 'secondary');
        } catch (err) {
            console.error(err);
        }
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
