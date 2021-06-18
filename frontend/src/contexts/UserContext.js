import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [userObj, setUser] = useState({
        isAuthenticated: null,
        loading: true,
        user: null
    });
    async function loadUser() {
        try {
            const res = await axios.get('http://localhost:5000/api/v1/auth');
            console.log(res);
        } catch (err) {
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
            console.log(res);
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
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <UserContext.Provider value={{ userObj, loadUser, register, login }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserProvider, UserContext };
