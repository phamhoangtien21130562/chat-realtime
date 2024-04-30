import '../../assets/style/chatList.css'
import {useState} from "react";

const ChatList = () => {
    const [addMode,setAddMode] = useState(false)
    return(
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="/img/search.png" alt=""/>
                    <input type="text" placeholder='Search'/>
                </div>
                <img src={addMode ? "/img/minus.png" : "/img/plus.png"} alt="" className="add"
                     onClick={() => setAddMode((prev) => !prev)}/>
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