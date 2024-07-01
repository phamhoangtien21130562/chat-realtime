import React, {useEffect, useState} from 'react';
import '../../assets/style/chatList.css';

const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const datePart = dateTime.toLocaleDateString(undefined, dateOptions);
    const timePart = dateTime.toLocaleTimeString(undefined, timeOptions);

    return `${datePart} ${timePart}`;
};

const ChatList = ({ users,handleUserClick, selectedUser, searchQuery }) => {

    const [showChat, setShowChat] = useState(false);
    const [filteredUserList, setFilteredUserList] = useState([]);

    useEffect(() => {
        if (searchQuery !== undefined && searchQuery !== "") {
            const filteredList = users.filter(
                (user) =>
                    user.name !== undefined &&
                    user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUserList(filteredList);
        } else {
            setFilteredUserList(users);
        }
    }, [users, searchQuery]);
    function handleUserItemClick(userName, userType) {
        handleUserClick(userName, userType);
        setShowChat(true);
    }

    return (
        <ul>
            {users.map((user, index) => (
                <li key={index} className={`items ${
                    user.name === selectedUser ? "selected" : ""
                }`}
                    onClick={() => handleUserItemClick(user.name, user.type)}>

                    <img src={user.type===0 ? "/img/avata.png" : "/img/avatamuti.png"}
                         alt="" />
                    <div className="texts">
                        <span>{user.name}</span>
                        <p>{formatDateTime(user.actionTime)}</p>
                    </div>
                </li>
            ))}
            {users.length === 0 && <p className="no-users">Chưa có danh sách liên hệ!</p>}
        </ul>
    );
};

export default ChatList;
