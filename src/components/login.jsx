import React from 'react';
import '../assets/style/login.css'

const LoginForm = () => {
  return (
    <html>
      <head>
        <title>Đăng kí</title>
        <link rel="stylesheet" href="login.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:300,400,400i|Noto+Sans:400,400i,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" />
      </head>
      <body>
        <div className="to">
          <div className="form">
            <h2>Đăng Nhập</h2>
            <i className="fab fa-app-store-ios"></i>
            <label style={{marginLeft: '-120px'}}>Tên đăng nhập</label>
            <input type="text" name="hoten" />
            <label style={{marginLeft: '-150px'}}>Mật Khẩu</label>
            <input type="text" name="Pass" />	
            <div className="button-container">
              {/* Đăng ký button */}
              <button type="button" onClick={() => { window.location.href='register.jsx'; }}>Đăng Ký</button>
              {/* Quên mật khẩu button */}
              <button type="button" onClick={() => { window.location.href='forgot_password.html'; }}>Quên Mật Khẩu</button>
            </div>
            <input id="submit" type="submit" name="submit" value="Gửi" />
          </div>
        </div>
      </body>
    </html>
  );
}

export default LoginForm;