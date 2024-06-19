import React, { useEffect, useState } from 'react';
import withAuth from './withAuth'; // Import HOC withAuth
import '../assets/style/homePage.css'; // Import CSS file
import LeftSideBar from "./leftSideBar/LeftSideBar";
import MainChat from "./mainChat/MainChat";
import RightSideBar from "./rightSideBar/RightSideBar";
import UserInfo from "./leftSideBar/UserInfo";
import ChatList from "./leftSideBar/ChatList";
import SearchBox from "./leftSideBar/searchBox";
import '../assets/style/leftSideBar.css';
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

// Component của trang HomePage
const HomePage = () => {
    const [socket, setSocket] = useState(null);
    const [users, setUsers] = useState([]);

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

    function handleSearchUser(username) {
        // Kiểm tra xem user có trong danh sách không
        const userIndex = users.findIndex(user => user.name === username);

        if (userIndex !== -1) {
            // Nếu đã có, đưa user này lên đầu danh sách
            const updatedUsers = [...users];
            const foundUser = updatedUsers.splice(userIndex, 1)[0];
            updatedUsers.unshift(foundUser);
            setUsers(updatedUsers);
        } else {
            // Nếu chưa có, tạo mới user và đưa lên đầu danh sách
            const newUser = { name: username, actionTime: new Date().toLocaleString() };
            const updatedUsers = [newUser, ...users];
            setUsers(updatedUsers);
        }
    }

    useEffect(() => {
        // Khởi tạo kết nối với server qua websocket
        const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");
        socket.addEventListener("open", () => {
            console.log("WebSocket connection established.");
            // Gửi message RE_LOGIN để đăng nhập lại với thông tin user và code
            // Giải mã thông tin từ localStorage
            const storedUsername = localStorage.getItem('username');
            const storedReLoginCode = localStorage.getItem('re_login_code');

            if (storedUsername && storedReLoginCode) {
                try {
                    const decryptedUsername = decryptData(storedUsername);

                    // Gửi message RE_LOGIN để đăng nhập lại với thông tin user và code đã giải mã
                    socket.send(JSON.stringify({
                        action: "onchat",
                        data: {
                            event: "RE_LOGIN",
                            data: {
                                user: decryptedUsername,
                                code: storedReLoginCode
                            }
                        }
                    }));
                } catch (error) {
                    console.error('Lỗi khi giải mã thông tin đăng nhập từ localStorage:', error);
                    // Xử lý lỗi khi giải mã (ví dụ: xóa thông tin không hợp lệ từ localStorage)
                    localStorage.removeItem('username');
                    localStorage.removeItem('re_login_code');
                }
            }
            socket.send(JSON.stringify({
                action: 'onchat',
                data: {
                    event: 'GET_USER_LIST',
                },
            }));
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
                    alert(response.mes);
                }
                if (response.status === 'success' && response.event === 'JOIN_ROOM') {
                    const receivedRoomName = response.data;
                    console.log(receivedRoomName);
                }
                if (response.status === 'error' && response.event === 'JOIN_ROOM') {
                    alert(response.mes);
                }
                if (response.status === 'success' && response.event === 'GET_USER_LIST') {
                    console.log('Danh sách người dùng:', response.data);
                    setUsers(response.data);
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
                <UserInfo />
                <div className='chatList'>
                    <SearchBox
                        handleCreateRoom={handleCreateRoom}
                        handleJoinRoom={handleJoinRoom}
                        handleSearchUser={handleSearchUser} // Thêm prop handleSearchUser
                    />
                    <ChatList users={users} /> {/* Truyền danh sách users vào ChatList */}
                </div>
            </div>
            <MainChat />
            <RightSideBar />
        </div>
    );
};

export default withAuth(HomePage);
