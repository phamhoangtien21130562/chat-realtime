import '../../assets/style/mainChat.css';
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import CryptoJS from "crypto-js";
import html2canvas from 'html2canvas';

const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    dateTime.setHours(dateTime.getHours() + 7);
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const datePart = dateTime.toLocaleDateString(undefined, dateOptions);
    const timePart = dateTime.toLocaleTimeString(undefined, timeOptions);

    return `${datePart} ${timePart}`;
};

const key = CryptoJS.enc.Utf8.parse('1234567891234567');
const iv = CryptoJS.enc.Utf8.parse('vector khởi tạo');

const decryptData = (encryptedData) => {
    if (!encryptedData) {
        console.error("Dữ liệu được mã hóa là null hoặc undefined");
        return null;
    }

    try {
        const decrypted = CryptoJS.AES.decrypt(
            encryptedData,
            key,
            { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
        );
        return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch (error) {
        console.error("Lỗi trong quá trình giải mã", error);
        return null;
    }
};

const storedUsername = localStorage.getItem('username');
const decryptedUsername = decryptData(storedUsername);

const MainChat = ({ chatMess, groupName, userType, handleSendMessage }) => {
    const [openEmoji, setOpenEmoji] = useState(false);
    const [message, setMessage] = useState("");

    const endRef = useRef(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMess]);

    const showEmoji = e => {
        setMessage(prev => prev + e.emoji);
        setOpenEmoji(false);
    };

    if (!chatMess || !Array.isArray(chatMess)) {
        return null;
    }

    const sortedChatContent = chatMess.sort((a, b) => {
        const timeA = new Date(a.createAt).getTime();
        const timeB = new Date(b.createAt).getTime();
        return timeA - timeB;
    });

    function handleChange(event) {
        setMessage(event.target.value);
    }

    function handleClickSend() {
        if (message.trim() !== "") {
            handleSendMessage(message.trim());
            setMessage("");
        }
    }

    const handleScreenshotClick = async () => {
        try {
            const canvas = await html2canvas(document.body);
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'screenshot.png';
            link.click();
        } catch (error) {
            console.error('Error taking screenshot:', error);
        }
    };

    const handleMicClick = () => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'vi-VN';
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setMessage(prevMessage => prevMessage + transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
        };

        recognition.start();
    };

    let prevName = "";

    return (
        <div className='mainChat'>
            <div className="topChat">
                <div className="user">
                    {userType === 0 ? (<img src="/img/avata.png" alt="" />) : (<img src="/img/avatamuti.png" alt="" />)}
                    <div className="texts">
                        <span>{groupName}</span>
                    </div>
                </div>
                <div className="icon">
                    <img src="/img/phone.png" alt="" />
                    <img src="/img/video.png" alt="" />
                    <img src="/img/info.png" alt="" />
                </div>
            </div>
            <div className="centerChat">
                {sortedChatContent.map((mess, index) => {
                    const isSameUser = mess.name === prevName;
                    const isLastMessage = (index === sortedChatContent.length - 1) || (sortedChatContent[index + 1].name !== mess.name);
                    const isFirstMessage = !isSameUser;
                    prevName = mess.name;

                    return (
                        <div className="s" key={index}>
                            {mess.name === decryptedUsername ? (
                                <div className="messages own">
                                    <div className="texts">
                                        <p>{mess.mes}</p>
                                        {isLastMessage && <span>{formatDateTime(mess.createAt)}</span>}
                                    </div>
                                </div>
                            ) : (
                                <div className="messages">
                                    <img src="/img/avata.png" alt=""
                                         className={`avatarImage ${isSameUser ? 'hidden' : ''}`} />
                                    <div className="texts">
                                        {isFirstMessage && <span className="nameMessage">{mess.name}</span>}
                                        <p>{mess.mes}</p>
                                        {isLastMessage && <span className="lastMessage">{formatDateTime(mess.createAt)}</span>}
                                    </div>
                                </div>
                            )}
                            <div ref={endRef}></div>
                        </div>
                    );
                })}
            </div>
            <div className="bottomChat">
                <div className="icons">
                    <img src="/img/img.png" alt="" />
                    <img src="/img/camera.png" alt="" onClick={handleScreenshotClick} />
                    <img src="/img/mic.png" alt="" onClick={handleMicClick} />
                </div>
                <input
                    type="text"
                    placeholder="Write your message here"
                    value={message}
                    onChange={handleChange}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleClickSend();
                        }
                    }}
                />
                <div className="emoji">
                    <img
                        src="/img/emoji.png"
                        alt=""
                        onClick={() => setOpenEmoji((prev) => !prev)}
                    />
                    <div className="emojiPicker">
                        {openEmoji && <EmojiPicker onEmojiClick={showEmoji} />}
                    </div>
                </div>
                <button onClick={handleClickSend} className="sendButton">Send</button>
            </div>
        </div>
    );
};

console.log(decryptedUsername);
export default MainChat;
