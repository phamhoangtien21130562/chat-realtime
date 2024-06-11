
import React from 'react';
import withAuth from './withAuth'; // Import HOC withAuth
import '../assets/style/homePage.css'; // Import CSS file
import LeftSideBar from "./leftSideBar/LeftSideBar";
import MainChat from "./mainChat/MainChat";
import RightSideBar from "./rightSideBar/RightSideBar";

// Component của trang HomePage
const HomePage = () => {
    return (
        <div className="App">
            <LeftSideBar/>
            <MainChat/>
            <RightSideBar/>
        </div>
    )
}

// Áp dụng withAuth cho HomePage và xuất nó
export default withAuth(HomePage);