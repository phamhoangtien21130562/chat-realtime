import '../../assets/style/chatList.css'

const ChatList = () => {
    return(
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="/img/search.png" alt=""/>
                    <input type="text" placeholder='Search'/>
                </div>
                <img src="/img/plus.png" alt="" className="add"/>
            </div>
        </div>
    )
}
export default ChatList