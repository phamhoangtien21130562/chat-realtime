import React from 'react';
import '../../assets/style/chatList.css';

const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const datePart = dateTime.toLocaleDateString(undefined, dateOptions);
    const timePart = dateTime.toLocaleTimeString(undefined, timeOptions);

    return `${datePart} ${timePart}`;
};

const ChatList = ({ users }) => {
    return (
        <ul>
            {users.map((user, index) => (
                <li key={index} className="items">
                    <img src="/img/avata.png" alt="" />
                    <div className="texts">
                        <span>{user.name}</span>
                        <p>{formatDateTime(user.actionTime)}</p>
                    </div>
                </li>
            ))}
            {users.length === 0 && <p>Không có người dùng nào được tải lên.</p>}
        </ul>
    );
};

export default ChatList;
