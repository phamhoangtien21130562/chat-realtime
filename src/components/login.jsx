import React, { useEffect, useState } from 'react';
import '../assets/style/login.css';
import { useNavigate } from 'react-router-dom';
import withoutAuth from './withoutAuth';
import CryptoJS from 'crypto-js';
import {FaEye, FaEyeSlash} from "react-icons/fa";

const key = CryptoJS.enc.Utf8.parse('1234567891234567');
const iv = CryptoJS.enc.Utf8.parse('vector khởi tạo');

// Hàm mã hóa
const encryptData = (data) => {
    const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(data),
        key,
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
    return encrypted.toString();
};

// Hàm giải mã
const decryptData = (encryptedData) => {
    const decrypted = CryptoJS.AES.decrypt(
        encryptedData,
        key,
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [socket, setSocket] = useState(null);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [notification, setNotification] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [error, setError] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

        newSocket.addEventListener("open", (event) => {
            console.log("Kết nối WebSocket đã được thiết lập", event);
            setSocket(newSocket);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    const handleLogin = () => {
        const login = {
            action: "onchat",
            data: {
                event: "LOGIN",
                data: {
                    user: username,
                    pass: password,
                },
            },
        };
        socket.send(JSON.stringify(login));
    };

    useEffect(() => {
        if (loginSuccess && username && password) {
            const encryptedUsername = encryptData(username);
            const encryptedPassword = encryptData(password);

            console.log('Lưu trữ thông tin đăng nhập vào localStorage');
            localStorage.setItem('username', encryptedUsername);
            localStorage.setItem('password', encryptedPassword);
        }
        if (socket) {
            socket.onmessage = (event) => {
                const responseData = JSON.parse(event.data);
                if (responseData && responseData.status === "success") {
                    console.log('Đăng nhập thành công');
                    localStorage.setItem('re_login_code', responseData.data["RE_LOGIN_CODE"]);
                    setNotification('Đăng nhập thành công!');
                    setLoginSuccess(true);
                    setError(false)
                    setTimeout(() => {
                        navigate('/homepage');
                    }, 1000);

                } else {
                    console.log('Sai tên đăng nhập hoặc mật khẩu');
                    setNotification('Sai tên đăng nhập hoặc mật khẩu!');
                    setError(true)
                }
            };
        }
    }, [socket, loginSuccess, username, password, navigate]);

    useEffect(() => {
        // Kiểm tra nếu có thông tin đăng nhập trong localStorage thì giải mã và cập nhật state
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');

        if (storedUsername && storedPassword) {
            try {
                const decryptedUsername = decryptData(storedUsername);
                const decryptedPassword = decryptData(storedPassword);

                setUsername(decryptedUsername);
                setPassword(decryptedPassword);
            } catch (error) {
                console.error('Lỗi khi giải mã thông tin đăng nhập từ localStorage:', error);
                // Xử lý lỗi khi giải mã (ví dụ: xóa thông tin không hợp lệ từ localStorage)
                localStorage.removeItem('username');
                localStorage.removeItem('password');
            }
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    const handleUserBlur = () => {
        setUsernameTouched(true);
    };

    const handlePassBlur = () => {
        setPasswordTouched(true);
    };

    return (
        <div className="to">
            <div className="form">
                <form className="register_form" onSubmit={handleSubmit}>
                    <h2>Đăng nhập tài khoản</h2>
                    <i className="fab fa-app-store-ios"></i>
                    <div className="username_Input">
                        <div className="label_username">
                            <label style={{marginLeft: '0px'}}> Username:</label>
                            {usernameTouched && username.trim() === '' && (
                                <p className="text-danger noti">Vui lòng nhập tên đăng nhập</p>
                            )}
                        </div>
                        <input value={username}
                               className="input_type_text input_write"
                               placeholder="Tên đăng nhập"
                               type="text"
                               onChange={(e) => setUsername(e.target.value)}
                               onBlur={handleUserBlur}
                               name="hoten"
                        />
                    </div>
                    <div className="pass_Input" style={{position: 'relative'}}>
                        <div className="label_pass">
                            <label style={{marginLeft: '0px'}}> Password:</label>
                            {passwordTouched && password.trim() === '' && (
                                <p className="text-danger noti">Vui lòng nhập mật khẩu</p>
                            )}
                        </div>
                        <input value={password}
                               className="input_write input_pass"
                               type={isPasswordVisible ? 'text' : 'password'}
                               placeholder="Mật khẩu"
                               onChange={(e) => setPassword(e.target.value)}
                               onBlur={handlePassBlur}
                               name="pass"
                        />
                        {isPasswordVisible ? (
                            <FaEyeSlash
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '69%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setIsPasswordVisible(false)}
                            />
                        ) : (
                            <FaEye
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '69%',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setIsPasswordVisible(true)}
                            />
                        )}
                    </div>
                    <input id="submit" type="submit" name="submit" value="Đăng nhập"/>
                    <div className="login_ref">
                        <p>Bạn chưa có tài khoản?<a href="/register" className="">Đăng ký!</a></p>
                    </div>
                </form>
                {notification && (
                    <div className={`alert ${error == true ? 'error' : ''}`}>{notification}</div>
                )}
            </div>
        </div>
    );
};

export default withoutAuth(LoginForm);
