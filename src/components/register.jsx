import React, {useEffect, useState} from 'react';
import {FaEye, FaEyeSlash} from 'react-icons/fa';
import '../assets/style/register.css'

const RegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [socket, setSocket] = useState(null);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState(false);
    const [notification, setNotification] = useState('');

    useEffect(() => {
        const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

        newSocket.addEventListener("open", (event) => {
            console.log("Kết nối WebSocket đã được thiết lập", event);
            setSocket(newSocket);
        });

        return () => {
            // Đóng kết nối WebSocket khi component bị hủy
            newSocket.close();
        };
    }, []);

    const handleRegister = () => {
        // Gửi yêu cầu đăng kí đến server WebSocket
        const register = {
            action: "onchat", data: {
                event: "REGISTER", data: {
                    user: username, pass: password,
                },
            },
        };
        socket.send(JSON.stringify(register));
    };


    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const responseData = JSON.parse(event.data);
                if (responseData && responseData.status === "success") {
                    // Đăng kí thành công
                    setNotification('Đăng ký thành công!');
                    setError(false)
                } else {
                    setNotification('Tài khoản đã tồn tại!');
                    setError(true)
                }
            };
        }
    }, [socket]);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleRegister();
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
                    <h2>Đăng ký tài khoản</h2>
                    <i className="fab fa-app-store-ios"></i>
                    <div className="username_Input">
                        <div className="label_username">
                            <label style={{marginLeft: '0px'}}> Username:</label>
                            {usernameTouched && username.trim() === '' && (
                                <p className="text-danger noti">Vui lòng nhập tên đăng nhập</p>
                            )}
                        </div>
                        <input value={username}
                               className="input_write input_type_text"
                               placeholder="Tên đăng nhập"
                               type="text"
                               onChange={(e) => setUsername(e.target.value)}
                               onBlur={handleUserBlur}
                               name="hoten"/>
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
                               name="pass"/>
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
                    <input id="submit" type="submit" name="submit" value="Đăng kí"/>
                    <div className="login_ref">
                        <p>Bạn đã có tài khoản?<a href="/" className="">Đăng nhập!</a></p>
                    </div>
                </form>
                {notification && (
                    <div className={`alert ${error == true ? 'error' : ''}`}>{notification}</div>
                )}
            </div>
        </div>
    );

}

export default RegisterForm;