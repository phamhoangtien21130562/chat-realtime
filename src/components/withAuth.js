import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent) => {
    return function WithAuthComponent(props) {
        const navigate = useNavigate();

        useEffect(() => {
            // Kiểm tra trạng thái đăng nhập
            const isLoggedIn = sessionStorage.getItem('username') && sessionStorage.getItem('password');

            // Nếu chưa đăng nhập, điều hướng đến trang đăng nhập
            if (!isLoggedIn) {
                navigate('/');
            }
        }, [navigate]);

        // Nếu đã đăng nhập, render component bảo vệ
        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
