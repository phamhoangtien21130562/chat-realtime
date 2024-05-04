import '../../assets/style/leftSideBar.css'
import ChatList from "./ChatList";
import UserInfo from "./UserInfo";

const LeftSideBar = () => {
    return(
        <div className='leftSideBar'>
            <UserInfo/>
            <ChatList/>
        </div>
    )
}
export default LeftSideBar