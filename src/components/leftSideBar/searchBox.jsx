import React, { useState } from "react";

const SearchBox = ({ handleCreateRoom, handleJoinRoom, usersList, setUsersList }) => {
    const [roomName, setRoomName] = useState('');
    const [userName, setUserName] = useState('');

    function handleChange(event) {
        setUserName(event.target.value); // Update userName state with input value
    }

    function CreateRoomClick() {
        if (roomName.trim() !== "") {
            handleCreateRoom(roomName.trim());
            setRoomName('');
        }
    }

    function JoinRoomClick() {
        if (roomName.trim() !== "") {
            handleJoinRoom(roomName.trim());
            setRoomName('');
        }
    }

    function SearchUserClick() {
        if (userName.trim() !== "") {
            const currentDateTime = new Date().toISOString(); // Lấy thời gian hiện tại ở định dạng ISO

            // Check if userName already exists in usersList
            const userIndex = usersList.findIndex(user => user.name === userName);

            if (userIndex !== -1) {
                // If userName exists, update its actionTime and move it to the top
                const updatedUsers = [
                    ...usersList.slice(0, userIndex),
                    { ...usersList[userIndex], actionTime: currentDateTime },
                    ...usersList.slice(userIndex + 1)
                ];
                setUsersList(updatedUsers);
            } else {
                // If userName does not exist, add it to the top with the current date and time
                const newUser = { name: userName, actionTime: currentDateTime, type: 0 }; // Thêm type: 0 vào đối tượng newUser
                const updatedUsers = [newUser, ...usersList];
                setUsersList(updatedUsers);
            }
            setUserName(''); // Clear input after adding user
        }
    }

    return (
        <div className="searchUserAndRoom">
            <div className="search">
                <div className="searchBar">
                    <img src="/img/search.png" alt=""/>
                    <input
                        type="text"
                        id='userName'
                        className='form-control'
                        value={userName}
                        onChange={handleChange}
                        placeholder='Search or add user'
                    />
                </div>
                <img src={"/img/plus.png"} onClick={SearchUserClick} alt="" className="add"/>
            </div>
            <div className="search">
                <div className="searchBar">
                    <img src="/img/search.png" alt=""/>
                    <input
                        type="text"
                        id='roomName'
                        className='form-control'
                        value={roomName}
                        onChange={(event) => setRoomName(event.target.value)}
                        placeholder='Create or search room'
                    />
                </div>
                <img src={"/img/plus.png"} onClick={CreateRoomClick} alt="" className="add"/>
                <img src={"/img/arrowRight.png"} onClick={JoinRoomClick} alt="" className="add"/>
            </div>
        </div>
    );
};

export default SearchBox;
