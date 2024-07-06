import '../../assets/style/mainChat.css';
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import CryptoJS from "crypto-js";
import html2canvas from 'html2canvas';

// Thêm Web Speech API vào đây
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'vi-VN'; // Đặt ngôn ngữ thành tiếng Việt
recognition.continuous = false;
recognition.interimResults = false;

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
    const [emojiToText, setEmojiToText] = useState("");
    const [message, setMessage] = useState("");
    const [isRecording, setIsRecording] = useState(false);

    const endRef = useRef(null);
    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatMess]);

    const showEmoji = e => {
        setEmojiToText(prev => prev + e.emoji);
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
        setEmojiToText(event.target.value); // Cập nhật emojiToText cùng với message
    }

    function handleClickSend() {
        if (message.trim() !== "") {
            handleSendMessage(message.trim());
            setMessage("");
            setEmojiToText(""); // Xóa emojiToText sau khi gửi
        }
    }

    const handleMicClick = () => {
        if (isRecording) {
            recognition.stop();
            setIsRecording(false);
        } else {
            recognition.start();
            setIsRecording(true);
        }
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(prevMessage => prevMessage + " " + transcript);
        setEmojiToText(prevEmojiToText => prevEmojiToText + " " + transcript);
        setIsRecording(false);
    };

    recognition.onerror = (event) => {
        console.error("Error occurred in recognition: ", event.error);
        setIsRecording(false);
    };

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

    return (
        <div className='mainChat'>
            <div className="topChat">
                <div className="user">
                    {userType === 0 ? (<img src="/img/avata.png" alt="" />) : (<img src="/img/avatamuti.png" alt=""/>)}
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
                {sortedChatContent.map((mess, index) => (
                    <div className="s" key={index}>
                        {mess.name === decryptedUsername ? (
                            <div className="messages own">
                                <div className="texts">
                                    <p>{mess.mes}</p>
                                    <span>{formatDateTime(mess.createAt)}</span>
                                </div>
                            </div>
                        ) : (
                            <div className="messages">
                                <img src="/img/avata.png" alt="" className="avatarImage" />
                                <div className="texts">
                                    <span className="nameMessage">{mess.name}</span>
                                    <p>{mess.mes}</p>
                                    <span>{formatDateTime(mess.createAt)}</span>
                                </div>
                            </div>
                        )}
                        <div ref={endRef}></div>
                    </div>
                ))}
            </div>
            <div className="bottomChat">
                <div className="icons">
                    <img src="/img/img.png" alt="" />
                    <img src="/img/camera.png" alt="" onClick={handleScreenshotClick} />
                    <img src="/img/mic.png" alt="" onClick={handleMicClick} className={isRecording ? 'recording' : ''} />
                </div>
                <input
                    type="text"
                    placeholder="Write your message here"
                    value={emojiToText}
                    onChange={e => {
                        setEmojiToText(e.target.value);
                        handleChange(e);
                    }}
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

export default MainChat;
