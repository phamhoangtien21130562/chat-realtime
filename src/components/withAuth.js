import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => {
    return (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const username = localStorage.getItem('username');
            const reLoginCode = localStorage.getItem('re_login_code');
            if (!username || !reLoginCode) {
                navigate('/');
            }
        }, [navigate]);

        return <Component {...props} />;
    };
};

export default withAuth;
