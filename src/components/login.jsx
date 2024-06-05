import React from 'react';
import '../assets/style/login.css'

const LoginForm = () => {
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