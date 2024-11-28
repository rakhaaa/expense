// src/components/Notification.jsx
import React, { useEffect } from 'react';

const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const typeStyles = {
        success: 'bg-green-500',
        error: 'bg-red-500',
    };

    return (
        <div className={`fixed top-4 right-4 p-4 text-white rounded shadow ${typeStyles[type]}`}>
            {message}
        </div>
    );
};

export default Notification;
