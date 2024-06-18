import '../../assets/style/chatList.css';

const ChatList = ({ users }) => {
    return (
        <ul>
            {users.map((user, index) => (
                <li key={index} className="items">
                    <img src="/img/avata.png" alt="" />
                    <div className="texts">
                        <span>{user.name}</span>

                        <p> {user.actionTime}</p>
                    </div>
                </li>
            ))}
            {users.length === 0 && <p>Không có người dùng nào được tải lên.</p>}
        </ul>
    );
};

export default ChatList;
