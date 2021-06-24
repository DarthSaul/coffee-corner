import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AlertContext = React.createContext();

function AlertProvider({ children }) {
    const [alert, updateAlert] = useState(null);

    function setAlert(msg, type, time = 5000) {
        const id = uuidv4();
        updateAlert({
            id,
            msg,
            type
        });
        setTimeout(() => {
            updateAlert(null);
        }, time);
    }

    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            {children}
        </AlertContext.Provider>
    );
}

export { AlertProvider, AlertContext };
