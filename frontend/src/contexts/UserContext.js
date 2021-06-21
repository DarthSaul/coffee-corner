import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [userObj, setUser] = useState({
        cookie: Cookies.get('user'),
        isAuthenticated: null,
        loading: true,
        user: null
    });

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
                    cookie: Cookies.get('user'),
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
            const { data } = res;
            setUser({
                cookie: Cookies.set('user', data._id, { expires: 7 }),
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
                cookie: Cookies.set('user', data.user._id, { expires: 7 }),
                isAuthenticated: true,
                loading: false,
                user: {
                    username: data.user.username,
                    user_id: data.user._id
                }
            });
        } catch (err) {
            console.error('Authorization failed');
            console.error(err);
        }
    }

    async function logout() {
        try {
            const res = await axios.get(
                'http://localhost:5000/api/v1/auth/logout'
            );
            console.log(res);
            Cookies.remove('user');
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
