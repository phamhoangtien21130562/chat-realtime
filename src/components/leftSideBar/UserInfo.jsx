import React, { useEffect, useState } from 'react';
import '../../assets/style/userInfo.css';
import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('1234567891234567');
const iv = CryptoJS.enc.Utf8.parse('vector khởi tạo');

// Hàm giải mã
const decryptData = (encryptedData) => {
    const decrypted = CryptoJS.AES.decrypt(
        encryptedData,
        key,
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

const UserInfo = () => {
    const [decodedUsername, setDecodedUsername] = useState('');

    useEffect(() => {
        // Kiểm tra và giải mã thông tin người dùng từ localStorage
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            try {
                const decryptedUsername = decryptData(storedUsername);
                setDecodedUsername(decryptedUsername);
            } catch (error) {
                console.error('Lỗi khi giải mã thông tin đăng nhập từ localStorage:', error);
                // Xử lý lỗi khi giải mã (ví dụ: xóa thông tin không hợp lệ từ localStorage)
                localStorage.removeItem('username');
            }
        }
    }, []);

    return (
        <div className='userInfo'>
            <div className="user">
                <img src="/img/avata.png" alt=""/>
                <h2>{decodedUsername}</h2>
            </div>
            <div className="icons">
                <img src="/img/more.png" alt=""/>
                <img src="/img/video.png" alt=""/>
                <img src="/img/edit.png" alt=""/>
            </div>
        </div>
    );
};

export default UserInfo;
