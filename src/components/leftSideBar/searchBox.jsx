import React, { useState } from 'react';

const SearchBox = ({ handleJoinRoom, handleCreateRoom, handleSearchRoom, handleSearchUser, socket }) => {
    const [searchUserInput, setSearchUserInput] = useState('');
    const [searchRoomInput, setSearchRoomInput] = useState('');

    const handleChangeUser = (event) => {
        setSearchUserInput(event.target.value);
    };

    const handleChangeRoom = (event) => {
        setSearchRoomInput(event.target.value);
    };

    const handleSearchUserClick = () => {
        if (searchUserInput.trim() !== '') {
            handleSearchUser(searchUserInput.trim());
            setSearchUserInput('');
        }
    };

    const handleCreateRoomClick = () => {
        if (searchRoomInput.trim() !== '') {
            handleCreateRoom(searchRoomInput.trim());
            setSearchRoomInput('');
        }
    };

    const handleJoinRoomClick = () => {
        if (searchRoomInput.trim() !== '') {
            handleJoinRoom(searchRoomInput.trim());
            setSearchRoomInput('');
        }
    };

    return (
        <div className="searchUserAndRoom">
            <div className="search">
                <div className="searchBar">
                    <img src="/img/search.png" alt="" />
                    <input
                        type="text"
                        value={searchUserInput}
                        onChange={handleChangeUser}
                        placeholder="Search User"
                    />
                </div>
                <img src={"/img/plus.png"} onClick={handleSearchUserClick} alt="" className="add" />
            </div>
            <div className="search">
                <div className="searchBar">
                    <img src="/img/search.png" alt="" />
                    <input
                        type="text"
                        className='form-control'
                        value={searchRoomInput}
                        onChange={handleChangeRoom}
                        placeholder='Create or search room'
                    />
                </div>
                <img src={"/img/plus.png"} onClick={handleCreateRoomClick} alt="" className="add" />
                <img src={"/img/arrowRight.png"} onClick={handleJoinRoomClick} alt="" className="add" />
            </div>
        </div>
    );
};

export default SearchBox;
