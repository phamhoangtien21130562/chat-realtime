import React, { useEffect, useState } from 'react';
import withAuth from './withAuth'; // Import HOC withAuth
import '../assets/style/homePage.css'; // Import CSS file
import LeftSideBar from "./leftSideBar/LeftSideBar";
import MainChat from "./mainChat/MainChat";
import RightSideBar from "./rightSideBar/RightSideBar";

// Component của trang HomePage
const HomePage = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Khởi tạo kết nối với server qua websocket
        const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");
        socket.addEventListener("open", () => {
            console.log("WebSocket connection established.");
            // Gửi message RE_LOGIN để đăng nhập lại với thông tin user và code
            socket.send(JSON.stringify({
                    action: "onchat",
                    data: {
                        event: "RE_LOGIN",
                        data: {
                            user: localStorage.getItem('username'),
                            code: localStorage.getItem('re_login_code')
                        }
                    }
                }
            ));
            socket.send(JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: 'GET_USER_LIST',
                    },
                }
            ));
            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === 'success' && response.event === 'RE_LOGIN') {
                    // Lưu relogincode vào localStorage
                    localStorage.setItem('re_login_code', response.data["RE_LOGIN_CODE"]);
                    console.log("re_login: " + response.data["RE_LOGIN_CODE"]);
                }
            };

            setSocket(socket);
        });

        // Đóng kết nối khi component unmount
        return () => {
            socket.close();
        };
    }, []);

    return (
        <div className="App">
            <LeftSideBar />
            <MainChat />
            <RightSideBar />
        </div>
    );
};

// Áp dụng withAuth cho HomePage và xuất nó
export default withAuth(HomePage);
