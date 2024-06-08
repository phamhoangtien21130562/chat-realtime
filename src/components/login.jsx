import React, {useEffect, useState} from 'react';
import '../assets/style/login.css';
import {useNavigate} from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [socket, setSocket] = useState(null);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [notification, setNotification] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

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
        if (loginSuccess) {
            // Lưu trữ thông tin đăng nhập vào localStorage
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
        }
        if (socket) {
            socket.onmessage = (event) => {
                const responseData = JSON.parse(event.data);
                if (responseData && responseData.status === "success") {
                    sessionStorage.setItem('re_login_code', responseData.data["RE_LOGIN_CODE"]);
                    setNotification('Đăng nhập thành công!');
                    setLoginSuccess(true);

                    setTimeout(() => {
                        navigate('/homepage');
                    }, 1000);

                } else {
                    setNotification('Sai tên đăng nhập hoặc mật khẩu!');
                }
            };
        }
    }, [socket, loginSuccess, username, password]);

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
                    <div className="pass_Input">
                        <div className="label_pass">
                            <label style={{marginLeft: '0px'}}> Password:</label>
                            {passwordTouched && password.trim() === '' && (
                                <p className="text-danger noti">Vui lòng nhập mật khẩu</p>
                            )}
                        </div>
                        <input value={password}
                               className="input_pass input_write"
                               type="password"
                               placeholder="Mật khẩu"
                               onChange={(e) => setPassword(e.target.value)}
                               onBlur={handlePassBlur}
                               name="pass"
                        />
                    </div>
                    <input id="submit" type="submit" name="submit" value="Đăng nhập"/>
                    <div className="login_ref">
                        <p>Bạn chưa có tài khoản?<a href="/register" className="">Đăng ký!</a></p>
                    </div>
                </form>
                {notification && (
                    <div className="alert">{notification}</div>
                )}
            </div>
        </div>
    );
    return (
        <div className="to">
            <div className="form">
                <form className="register_form">
                    <h2>Đăng nhập tài khoản</h2>
                    <i className="fab fa-app-store-ios"></i>
                    <div className="username_Input">
                        <div className="label_username">
                            <label style={{marginLeft: '0px'}}> Username:</label>
                        </div>
                        <input placeholder="Tên đăng nhập"
                               type="text"
                               name="hoten"/>
                    </div>
                    <div className="pass_Input">
                        <div className="label_pass">
                            <label style={{marginLeft: '0px'}}> Password:</label>
                        </div>
                        <input type="password"
                               placeholder="Mật khẩu"
                               name="pass"/>
                    </div>
                    <input id="submit" type="submit" name="submit" value="Đăng nhập"/>
                    <div className="login_ref">
                        <p>Bạn chưa có tài khoản?<a href="/register" className="">Đăng ký!</a></p>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default LoginForm;
