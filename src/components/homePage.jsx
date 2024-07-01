import React, { useEffect, useState } from 'react';
import withAuth from './withAuth'; // Import HOC withAuth
import '../assets/style/homePage.css'; // Import CSS file
import LeftSideBar from "./leftSideBar/LeftSideBar";
import MainChat from "./mainChat/MainChat";
import UserInfo from "./leftSideBar/UserInfo";
import ChatList from "./leftSideBar/ChatList";
import SearchBox from "./leftSideBar/searchBox";
import '../assets/style/leftSideBar.css';
import CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('1234567891234567');
const iv = CryptoJS.enc.Utf8.parse('vector khởi tạo');

// Decrypt function
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
    const [usersList, setUsersList] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [chatMess, setChatMess] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [groupName, setGroupName] = useState("");
    const [userType, setUserType] = useState(null);
    const [isChatVisible, setIsChatVisible] = useState(true);
    const [typeSend, setTypeSend] = useState(null);
    const [listUserChatRoom, setListUserChatRoom] = useState([]);

    function handleUserClick(userName, type) {
        setSelectedUser(userName);
        setGroupName(userName);
        setUserType(type);
        setShowChat(true);
        setIsChatVisible(true);
        console.log(type)
        console.log(userName);
        if (type == 1) {
            setTypeSend("room");
            const requestRoomChatMess = {
                action: "onchat",
                data: {
                    event: "GET_ROOM_CHAT_MES",
                    data: {
                        name: userName,
                        page: 1
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMess));
            console.log("Đã gửi yêu cầu get room chat mes");
        } else {
            setTypeSend("people");
            const requestRoomChatMess = {
                action: "onchat",
                data: {
                    event: "GET_PEOPLE_CHAT_MES",
                    data: {
                        name: userName,
                        page: 1
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMess));
        }
    }

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

    function handleSendMessage(message) {
        let messEncode = encodeURI(message);
        let  mes = messEncode.replace(/%20/g," ");
        const chatData = {
            action: 'onchat',
            data: {
                event: 'SEND_CHAT',
                data: {
                    type: typeSend,
                    to: selectedUser,
                    mes: mes,
                }
            },
        };
        socket.send(JSON.stringify(chatData));
        console.log("Đã gửi tin nhắn lên cho server");
        const userList = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        socket.send(JSON.stringify(userList));
        if (userType == 1) {
            const requestRoomChatMessage = {
                action: "onchat",
                data: {
                    event: "GET_ROOM_CHAT_MES",
                    data: {
                        name: selectedUser,
                        page: 1,
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMessage));
        }else{
            if(userType == 0){
                const requestRoomChatMessage = {
                    action: "onchat",
                    data: {
                        event: "GET_PEOPLE_CHAT_MES",
                        data: {
                            name: selectedUser,
                            page: 1,
                        },
                    },
                };
                socket.send(JSON.stringify(requestRoomChatMessage));
            }
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
                    setUsersList(response.data);
                }
                if (response.status === 'success' && response.event === 'GET_ROOM_CHAT_MES') {
                    const chatMess = response.data.chatData.map(mes => ({
                        ...mes,
                        mes: decodeURIComponent(mes.mes)
                    }));

                    setChatMess(chatMess);

                    let listUser = [];
                    if (response.data) {
                        listUser = response.data.userList;
                    }
                    setListUserChatRoom(listUser);

                    console.log(listUser);
                    console.log(chatMess);
                }
                if (response.status === 'success' && response.event === 'SEND_CHAT') {
                    const receivedMessage = response.data;
                    receivedMessage.mes = decodeURIComponent(receivedMessage.mes);
                    setChatMess((prevChatMess) => [...prevChatMess, receivedMessage]);
                    if (receivedMessage.type ===1 ){
                        const userList = {
                            action: 'onchat',
                            data: {
                                event: 'GET_USER_LIST',
                            },
                        };
                        socket.send(JSON.stringify(userList));
                    }else{
                        setUsersList((prevUsersList) => {
                            const updatedList = prevUsersList.filter(user => user.name !== receivedMessage.name);
                            return [receivedMessage, ...updatedList];
                        });
                    }
                }
                if (response.status === 'success' && response.event === 'GET_PEOPLE_CHAT_MES') {
                    // Giải mã các tin nhắn từ URL encoding sang UTF-8
                    const chatMess = response.data.map(mes => ({
                        ...mes,
                        mes: decodeURIComponent(mes.mes)
                    }));
                    setChatMess(chatMess);
                    console.log(chatMess);
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
                        handleJoinRoom={handleJoinRoom}
                        usersList={usersList}
                        setUsersList={setUsersList}
                    />
                    <ChatList users={usersList}
                              handleUserClick={handleUserClick}
                              selectedUser={selectedUser}/>
                </div>
            </div>
            {showChat ? (
                <MainChat chatMess={chatMess}
                          groupName={groupName}
                          userType={userType}
                          handleSendMessage={handleSendMessage}/>
            ) : (
                <div className='mainChat'>
                    <link rel="stylesheet"
                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                          integrity="sha512-..." crossOrigin="anonymous"/>
                    <div className="welcome-message">
                        <p>Welcome to appchat!</p>
                        <p>Please choose a subject to chat with!</p>
                        <i className="fas fa-comment"></i>
                    </div>
                </div>


            )}
            <MainChat/>

        </div>
    );
};

// Áp dụng withAuth cho HomePage và xuất nó
export default withAuth(HomePage);
