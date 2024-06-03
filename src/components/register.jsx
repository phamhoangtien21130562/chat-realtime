import React from 'react';
import '../assets/style/register.css'
const RegisterForm = () => {
  return (
    <html>
      <head>
        <title>Đăng kí</title>
        <link rel="stylesheet" href="register.css" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:300,400,400i|Noto+Sans:400,400i,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600" rel="stylesheet" />
      </head>
      <body>
        <div className="to">
          <div className="form">
            <h2>Đăng ký tài khoản</h2>
            <i className="fab fa-app-store-ios"></i>
            <label style={{marginLeft: '-120px'}}> Username:</label>
            <input type="text" name="hoten" />
            <label style={{marginLeft: '-120px'}}> Password:</label>
            <input type="text" name="pass" />	
            <label style={{marginLeft: '-150px'}}> Email:</label>
            <input type="text" name="email" /> 
            <input id="submit" type="submit" name="submit" value="Gửi" />
          </div>				
        </div>
      </body>
    </html>
  );
}

export default RegisterForm;