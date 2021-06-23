import React, { useContext } from 'react';

import { AlertContext } from '../contexts/AlertContext';

const Alert = () => {
    const { alert } = useContext(AlertContext);
    const alertComponents = alert !== null && (
        <div
            key={alert.id}
            className={`alert alert-${alert.type} col-md-8 col-lg-10 mx-auto`}
        >
            {alert.msg}
        </div>
    );
    return <>{alertComponents}</>;
};

export default Alert;
