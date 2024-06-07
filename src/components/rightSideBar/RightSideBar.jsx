import React, { useState, useEffect } from 'react';
import '../../assets/style/rightSideBar.css';
import { useNavigate } from 'react-router-dom';

const RightSideBar = ({ socket }) => {
    const navigate = useNavigate();
    const [logoutNotification, setLogoutNotification] = useState('');

    const handleLogout = () => {
        if (socket) {
            const logoutData = {
                action: "onchat",
                data: {
                    event: "LOGOUT"
                }
            };
            socket.send(JSON.stringify(logoutData));
        }

        setLogoutNotification('Bạn đã đăng xuất thành công!');
        navigate('/');
    };

    useEffect(() => {
        if (logoutNotification !== '') {
            const timeout = setTimeout(() => {
                setLogoutNotification('');
            }, 3000); // 3 seconds
            return () => clearTimeout(timeout);
        }
    }, [logoutNotification]);

    return(
        <div className='rightSideBar'>
            <div className="user">
                <img src="/img/avata.png" alt=""/>
                <h2>OzuSus</h2>
                <p>Lorem ipsum dolor sit amet</p>
            </div>
            <div className="info">
                <div className="option">
                    <div className="title">
                        <span>Chat Setting</span>
                        <img src="/img/arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Privacy & Help</span>
                        <img src="/img/arrowUp.png" alt=""/>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Photos</span>
                        <img src="/img/arrowDown.png" alt=""/>
                    </div>
                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/06/Subnautica-Sea-Dragon-1.jpg"
                                    alt=""/>
                                <span>PhotoName</span>
                            </div>
                            <img src="/img/download.png" alt="" className="downloadIcon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/06/Subnautica-Sea-Dragon-1.jpg"
                                    alt=""/>
                                <span>PhotoName</span>
                            </div>
                            <img src="/img/download.png" alt="" className="downloadIcon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/06/Subnautica-Sea-Dragon-1.jpg"
                                    alt=""/>
                                <span>PhotoName</span>
                            </div>
                            <img src="/img/download.png" alt="" className="downloadIcon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/06/Subnautica-Sea-Dragon-1.jpg"
                                    alt=""/>
                                <span>PhotoName</span>
                            </div>
                            <img src="/img/download.png" alt="" className="downloadIcon"/>
                        </div>
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img
                                    src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/06/Subnautica-Sea-Dragon-1.jpg"
                                    alt=""/>
                                <span>PhotoName</span>
                            </div>
                            <img src="/img/download.png" alt="" className="downloadIcon"/>
                        </div>
                    </div>
                </div>
                <div className="option">
                    <div className="title">
                        <span>Files</span>
                        <img src="/img/arrowUp.png" alt=""/>
                    </div>
                </div>
                <button>Block User</button>
                <button onClick={handleLogout} className="logOutBtn">Log out</button>
                {/* Logout notification */}
                {logoutNotification && (
                    <div className="logoutNotification">{logoutNotification}</div>
                )}
            </div>
        </div>
    );
};

export default RightSideBar;