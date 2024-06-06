import React, { useRef } from 'react';
import ProfilePage from "./profilePage";
import '../assets/style/profile.css'

const Popup = () => {
    const popupRef = useRef(null);

    const handleClosePopup = () => {
        popupRef.current.style.display = 'none';
    };

    return (
        <div className="popup">
            <div ref={popupRef} className="popup-content">
                <button className="popup-button" onClick={handleClosePopup}>X</button>
                <ProfilePage/>
            </div>
        </div>
    );
};

export default Popup;