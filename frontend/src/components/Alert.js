import React, { useContext } from 'react';

import { AlertContext } from '../contexts/AlertContext';

const Alert = () => {
    const { alert } = useContext(AlertContext);
    const alertComponents = alert !== null && (
        <div
            key={alert.id}
            className={`alert alert-${alert.type} mx-auto mb-4`}
        >
            {alert.msg}
        </div>
    );
    return <>{alertComponents}</>;
};

export default Alert;
