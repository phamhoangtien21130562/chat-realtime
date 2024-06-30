import React, { useEffect, useState } from 'react';
import '../../assets/style/chatList.css';

const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return ''; // Handling edge case where dateTimeString is null or undefined
    const dateTime = new Date(dateTimeString);
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const datePart = dateTime.toLocaleDateString(undefined, dateOptions);
    const timePart = dateTime.toLocaleTimeString(undefined, timeOptions);

    return `${datePart} ${timePart}`;
};

const ChatList = ({ users, handleUserClick, selectedUser, searchQuery }) => {
    const [filteredUserList, setFilteredUserList] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // State to track selected user/room

    useEffect(() => {
        if (searchQuery && searchQuery.trim() !== "") {
            const filteredList = users.filter(user =>
                user.name && user.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
            );
            setFilteredUserList(filteredList);
        } else {
            setFilteredUserList(users);
        }
    }, [users, searchQuery]);

    const handleUserItemClick = (userName, userType) => {
        handleUserClick(userName, userType);
        setSelectedItem(userName); // Set the selected user (you can modify this for rooms as well)
    };

    return (
        <ul>
            {filteredUserList.map((user, index) => (
                <li key={index} className={`items ${user.name === selectedItem ? 'selected' : ''}`}
                    onClick={() => handleUserItemClick(user.name, user.type)}>

                    <img src={user.type === 0 ? "/img/avata.png" : "/img/avatamuti.png"} alt="" />
                    <div className="texts">
                        <span>{user.name}</span>
                        <p>{formatDateTime(user.actionTime)}</p>
                    </div>
                </li>
            ))}
            {filteredUserList.length === 0 && <p className="no-users">Chưa có danh sách liên hệ!</p>}
        </ul>
    );
};

export default ChatList;
