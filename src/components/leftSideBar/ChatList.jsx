import '../../assets/style/chatList.css'
import {useState} from "react";

const ChatList = ({handleJoinRoom, handleCreateRoom, handleSearchRoom }) => {

    const [roomName, setRoomName] = useState('');

    function handleChange(event) {
        setRoomName(event.target.value); // Cập nhật giá trị từ thẻ input vào state
    }

    function SearchRoomClick() {
        if (roomName !== "") {
            handleSearchRoom(roomName); // Truyền giá trị message vào hàm handleSendMessage
            setRoomName('');
        }

    }
    function CreateRoomClick() {
        if (roomName !== "") {
            handleCreateRoom(roomName);
            setRoomName('');
        }

    }



    return(
        <div className='chatList'>
            <div className="searchUserAndRoom">
                <div className="search">
                    <div className="searchBar">
                        <img src="/img/search.png" alt=""/>
                        <input type="text" placeholder='Search User'/>
                    </div>
                    <img src={"/img/plus.png"} alt="" className="add"/>
                </div>
                <div className="search">
                    <div className="searchBar">
                        <img src="/img/search.png" alt=""/>
                        <input type="text"
                               id='roomName'
                               className='form-control'
                               value={roomName}
                               onChange={handleChange}
                               placeholder='Create or search room'/>
                    </div>
                    <img src={"/img/plus.png"} onClick={CreateRoomClick} alt="" className="add"/>
                    <img src={"/img/arrowRight.png"} onClick={JoinRoomClick} alt="" className="add"/>
                </div>
            </div>
            <div className="items">
                <img src="/img/avata.png" alt=""/>
                <div className="texts">
                    <span>OzuSus</span>
                    <p>Hello World</p>
                </div>
            </div>
            <div className="items">
                <img src="/img/avata.png" alt=""/>
                <div className="texts">
                    <span>OzuSus</span>
                    <p>Hello World</p>
                </div>
            </div>
            <div className="items">
                <img src="/img/avata.png" alt=""/>
                <div className="texts">
                    <span>OzuSus</span>
                    <p>Hello World</p>
                </div>
            </div>
            <div className="items">
                <img src="/img/avata.png" alt=""/>
                <div className="texts">
                    <span>OzuSus</span>
                    <p>Hello World</p>
                </div>
            </div>
            <div className="items">
                <img src="/img/avata.png" alt=""/>
                <div className="texts">
                    <span>OzuSus</span>
                    <p>Hello World</p>
                </div>
            </div>
            <div className="items">
                <img src="/img/avata.png" alt=""/>
                <div className="texts">
                    <span>OzuSus</span>
                    <p>Hello World</p>
                </div>
            </div>
            <div className="items">
                <img src="/img/avata.png" alt=""/>
                <div className="texts">
                    <span>OzuSus</span>
                    <p>Hello World</p>
                </div>
            </div>
            <div className="items">
                <img src="/img/avata.png" alt=""/>
                <div className="texts">
                    <span>OzuSus</span>
                    <p>Hello World</p>
                </div>
            </div>
            <div className="items">
                <img src="/img/avata.png" alt=""/>
                <div className="texts">
                    <span>OzuSus</span>
                    <p>Hello World</p>
                </div>
            </div>
        </div>
    );
};
export default ChatList