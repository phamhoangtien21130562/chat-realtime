import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withoutAuth = (Component) => {
    return (props) => {
        const navigate = useNavigate();

        useEffect(() => {
            const username = localStorage.getItem('username');
            const reLoginCode = localStorage.getItem('re_login_code');
            if (username && reLoginCode) {
                navigate('/homepage');
            }
        }, [navigate]);

        return <Component {...props} />;
    };
};

export default withoutAuth;
