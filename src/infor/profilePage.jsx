import React from 'react';
import ProfileInfo from "./profileInfor";
import UpdateButton from "./updateButton";


const ProfilePage = () => {
    return (
        <div className="profile-page">
            <h1>Thông tin tài khoản</h1>
            <ProfileInfo />
            <UpdateButton />
        </div>
    );
};

export default ProfilePage;