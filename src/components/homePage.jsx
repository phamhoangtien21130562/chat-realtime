import '../assets/style/homePage.css'
import LeftSideBar from "./leftSideBar/LeftSideBar";
import MainChat from "./mainChat/MainChat";
import RightSideBar from "./rightSideBar/RightSideBar";

const HomePage = () => {
    return (
        <div className="App">
            <LeftSideBar/>
            <MainChat/>
            <RightSideBar/>
        </div>
    )
}
export default HomePage