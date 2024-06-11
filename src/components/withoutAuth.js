import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withoutAuth = (WrappedComponent) => {
    return function WithoutAuthComponent(props) {
        const navigate = useNavigate();

        useEffect(() => {
            // Kiểm tra trạng thái đăng nhập
            const isLoggedIn = sessionStorage.getItem('username') && sessionStorage.getItem('password');

            // Nếu đã đăng nhập, điều hướng về trang chính
            if (isLoggedIn) {
                navigate('/homePage');
            }
        }, [navigate]);

        // Nếu chưa đăng nhập, render component bảo vệ
        return <WrappedComponent {...props} />;
    };
};

export default withoutAuth;
