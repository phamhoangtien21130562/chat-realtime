import React, {useEffect, useState} from 'react';
import '../assets/style/register.css'

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [socket, setSocket] = useState(null);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
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
    // Gửi yêu cầu đăng nhập đến server WebSocket
    const register = {
      action: "onchat", data: {
        event: "REGISTER", data: {
          user: username, pass: password,
        },
      },
    };
    socket.send(JSON.stringify(register));
  };

  // Sau khi đăng nhập thành công, set socket và lưu trữ thông tin đăng nhập
  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const responseData = JSON.parse(event.data);
        if (responseData && responseData.status === "success") {
          // Đăng kí thành công
          setNotification('Đăng ký thành công!');
        } else {
          setNotification('Tài khoản đã tồn tại!');
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
                     placeholder="Tên đăng nhập"
                     type="text"
                     onChange={(e) => setUsername(e.target.value)}
                     onBlur={handleUserBlur}
                     name="hoten"/>
            </div>
            <div className="pass_Input">
              <div className="label_pass">
                <label style={{marginLeft: '0px'}}> Password:</label>
                {passwordTouched && password.trim() === '' && (
                    <p className="text-danger noti">Vui lòng nhập mật khẩu</p>
                )}
              </div>
              <input value={password}
                     type="password"
                     placeholder="Mật khẩu"
                     onChange={(e) => setPassword(e.target.value)}
                     onBlur={handlePassBlur}
                     name="pass"/>
            </div>
            <input id="submit" type="submit" name="submit" value="Đăng kí"/>
            <div className="login_ref">
              <p>Bạn đã có tài khoản?<a href="/" className="">Đăng nhập!</a></p>
            </div>
          </form>
          {notification && (
              <div className="alert">{notification}</div>
          )}
        </div>
      </div>
  );
}

export default RegisterForm;