import React, { useEffect, useState } from 'react';
import withAuth from './withAuth'; // Import HOC withAuth
import '../assets/style/homePage.css'; // Import CSS file
import LeftSideBar from "./leftSideBar/LeftSideBar";
import MainChat from "./mainChat/MainChat";
import RightSideBar from "./rightSideBar/RightSideBar";
import UserInfo from "./leftSideBar/UserInfo";
import ChatList from "./leftSideBar/ChatList";
import SearchBox from "./leftSideBar/searchBox";
import '../assets/style/leftSideBar.css'

// Component của trang HomePage
const HomePage = () => {
    const [socket, setSocket] = useState(null);

    function handleCreateRoom(roomName) {
        const requestcreateRoom = {
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: {
                    name: roomName,
                },
            },
        };
        socket.send(JSON.stringify(requestcreateRoom));
        const userList = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        socket.send(JSON.stringify(userList));
    }

    function handleJoinRoom(roomName) {
        const joinRequest = {
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: {
                    name: roomName,
                },
            },
        };

        socket.send(JSON.stringify(joinRequest));
        console.log("Đã gửi yêu cầu ");
        const userList = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        socket.send(JSON.stringify(userList));
    }

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
                if (response.status === 'success' && response.event === 'CREATE_ROOM') {
                    const receivedRoomName = response.data;
                    console.log(receivedRoomName);
                }
                if (response.status === 'error' && response.event === 'CREATE_ROOM') {
                    alert(response.mes)
                }
                if (response.status === 'success' && response.event === 'JOIN_ROOM') {
                    const receivedRoomName = response.data;
                    console.log(receivedRoomName)
                }
                if (response.status === 'error' && response.event === 'JOIN_ROOM') {
                    alert(response.mes)
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
            <div className='leftSideBar'>
                <UserInfo/>
                <div className='chatList'>
                    <SearchBox
                        handleCreateRoom={handleCreateRoom}
                        handleJoinRoom={handleJoinRoom}/>
                    <ChatList/>
                </div>
            </div>
            <MainChat/>
            <RightSideBar/>
        </div>
    );
};

// Áp dụng withAuth cho HomePage và xuất nó
export default withAuth(HomePage);
