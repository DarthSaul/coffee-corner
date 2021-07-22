import React, { useContext } from 'react';

import { AlertContext } from '../../contexts/AlertContext';

const Alert = () => {
    const { alert } = useContext(AlertContext);
    const alertComponents = alert !== null && (
        <div
            key={alert.id}
            className={`col-md-4 alert alert-${alert.type} mx-auto my-5 text-center`}
        >
            {alert.msg}
        </div>
    );
    return <>{alertComponents}</>;
};

export default Alert;
