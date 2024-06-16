import '../../assets/style/chatList.css'

const ChatList = () => {
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
                        <input type="text" placeholder='Create or search room'/>
                    </div>
                    <img src={"/img/plus.png"} alt="" className="add"/>
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