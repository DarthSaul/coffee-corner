import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { AlertProvider } from './contexts/AlertContext';
import { UserProvider } from './contexts/UserContext';

ReactDOM.render(
    <AlertProvider>
        <UserProvider>
            <App />
        </UserProvider>
    </AlertProvider>,
    document.getElementById('root')
);
