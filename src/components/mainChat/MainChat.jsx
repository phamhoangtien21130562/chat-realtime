import React, { useEffect, useRef, useState } from "react";
import { Fireworks } from '@fireworks-js/react';
import '../../assets/style/mainChat.css';
import EmojiPicker from "emoji-picker-react";
import CryptoJS from "crypto-js";
import html2canvas from 'html2canvas';
import * as events from "events";
import FacebookEmbed from "../FacebookPost";
import pica from "pica";
import Cloudinary from "../Cloudinary";
import cloudinary from "../Cloudinary";
import GifSelector from "./GifSelector";
import Confetti from 'react-confetti';

const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    dateTime.setHours(dateTime.getHours() + 7);
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const datePart = dateTime.toLocaleDateString(undefined, dateOptions);
    const timePart = dateTime.toLocaleTimeString(undefined, timeOptions);

    return `${datePart} ${timePart}`;
};
const formatDateTime2 = (dateTimeString) => {
    const dateTime = dateTimeString ? new Date(dateTimeString) : new Date();
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

const MainChat = ({chatMess,groupName, userType, handleSendMessage}) => {
    const [openEmoji, setOpenEmoji] = useState(false);
    const [emojiToText, setEmojiToText] = useState("");
    const [message, setMessage] = useState("");
    const [showGifSelector, setShowGifSelector] = useState(false);
    const [selectedGif, setSelectedGif] = useState(null);
    const [showFireworks, setShowFireworks] = useState(false);
    const [isConfetti, setIsConfetti] = useState(false);

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
        const noscriptElements = document.getElementsByTagName('noscript');
        Array.from(noscriptElements).forEach(noscript => {
            noscript.style.display = 'none';
        });

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

    const handleFireworksClick = () => {
        setShowFireworks(true);
        setTimeout(() => setShowFireworks(false), 5000); // Stop fireworks after 3 seconds
    };
    const handleConfettiClick = () => {
        setIsConfetti(true);
        setTimeout(() => setIsConfetti(false), 5000); // Thả giấy trong 3 giây
    };

    let prevName = "";

    const getYoutubeEmbedUrl = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const uploadPhoto = await cloudinary(file);

            if (!uploadPhoto) {
                throw new Error('Error: uploadPhoto is null or undefined');
            }

            console.log('Upload Photo:', uploadPhoto);

            if (!uploadPhoto.secure_url) {
                throw new Error('Error: secure_url is undefined');
            }

            const imageUrl = uploadPhoto.secure_url;
            handleSendMessage(imageUrl);
        } catch (error) {
            console.error('Error during image upload:', error);
        }
    };

    const handleGifSelect = (gifUrl) => {
        setSelectedGif(gifUrl);
        setShowGifSelector(false);
        console.log(gifUrl);
        handleSendMessage(gifUrl);
    };

    return (
        <div className='mainChat'>
            {showFireworks && (
                <Fireworks
                    options={{
                        rocketsPoint: { min: 0, max: 100 }
                    }}
                    style={{
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        position: 'fixed',
                        background: 'rgba(0, 0, 0, 0.5)'
                    }}
                />
            )}
            {isConfetti && <Confetti style={{
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                position: 'fixed',
                background: 'rgba(0, 0, 0, 0.5)'
            }}/>}
            <div className="topChat">
                <div className="user">
                    {userType === 0 ? (<img src="/img/avata.png" alt="" />): (<img src="/img/avatamuti.png" alt=""/>)}
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
                                        {mess.mes.includes("https://www.youtube.com/watch") ? (
                                            <div className="youtube_own">
                                                <a href={mess.mes} className="link_mes_own" target="_blank">{mess.mes}</a>
                                                <iframe className="iframe_youtube"
                                                        width="914"
                                                        height="514"
                                                        src={getYoutubeEmbedUrl(mess.mes)}
                                                        title="Video Player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        referrerPolicy="strict-origin-when-cross-origin"
                                                        allowFullScreen
                                                ></iframe>
                                            </div>
                                        ) : mess.mes.includes("gif") ? (
                                            <p className="pic_own">
                                                <img src={mess.mes} alt="Received Image"/>
                                            </p>
                                        ) : mess.mes.includes("base64") ? (
                                            <p className="pic_own">
                                                <img src={mess.mes} alt="Received Image"/>
                                            </p>
                                        ) : mess.mes.includes("https://www.facebook.com") ? (
                                            <div className="facebook">
                                                <a className="mes_facebook_own" href={mess.mes} target="_blank">{mess.mes}</a>
                                                <FacebookEmbed
                                                    href={mess.mes}
                                                    width="486"
                                                />
                                            </div>
                                        ) : (mess.mes.includes("jpg") || mess.mes.includes("png") || mess.mes.includes("jpeg") || mess.mes.includes("image")) ? (
                                            <p className="pic_own">
                                                <img src={mess.mes} alt="Received Image"/>
                                            </p>
                                        ) : mess.mes.includes("mp4") ? (
                                            <video  controls className="video_own">
                                                <source src={mess.mes}/>
                                            </video>
                                        ) : (
                                            <a className="mes">{mess.mes}</a>
                                        )}
                                        {isLastMessage && <span>{formatDateTime(mess.createAt)}</span>}
                                    </div>
                                </div>
                            ) : (
                                <div className="messages">
                                    <img src="/img/avata.png" alt=""
                                         className={`avatarImage ${isSameUser ? 'hidden' : ''}`}/>
                                    <div className="texts">
                                        {isFirstMessage && <span className="nameMessage">{mess.name}</span>}
                                        <p className="pic">
                                            {mess.mes.includes("https://www.youtube.com/watch") ? (
                                                <div className="youtube">
                                                    <a href={mess.mes} className="link_mes"
                                                       target="_blank">{mess.mes}</a>
                                                    <iframe className="iframe_youtube"
                                                            width="914"
                                                            height="514"
                                                            src={getYoutubeEmbedUrl(mess.mes)}
                                                            title="Video Player"
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            referrerPolicy="strict-origin-when-cross-origin"
                                                            allowFullScreen
                                                    ></iframe>
                                                </div>
                                            ) : mess.mes.includes("https://www.facebook.com") ? (
                                                <div className="facebook">
                                                    <a className="mes_facebook" href={mess.mes} target="_blank">{mess.mes}</a>
                                                    <FacebookEmbed
                                                        href={mess.mes}
                                                        width="520"
                                                        height="400"
                                                    />
                                                </div>
                                            ) : mess.mes.includes("gif") ? (
                                                <img src={mess.mes} alt="Received Image"/>
                                            ) : mess.mes.includes("base64") ? (
                                                <img src={mess.mes} alt="Received Image"/>
                                            ) : (mess.mes.includes("jpg") || mess.mes.includes("png") || mess.mes.includes("jpeg") || mess.mes.includes("image")) ? (
                                                <img src={mess.mes} alt="Received Image"/>
                                            ) : mess.mes.includes("mp4") ? (
                                                <video  controls className="video">
                                                    <source src={mess.mes}/>
                                                </video>
                                            ) : (
                                                <a>{mess.mes}</a>
                                            )}
                                        </p>

                                        {isLastMessage &&
                                            <span className="lastMessage">{formatDateTime2(mess.createAt)}</span>}

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
                    <img
                        src="/img/img.png"
                        alt=""
                        onClick={() => document.getElementById('image-upload').click()}
                    />
                    <input
                        id="image-upload"
                        type="file"
                        style={{display: "none"}}
                        onChange={handleImageUpload}
                    />

                    <img src="/img/camera.png" alt="" onClick={handleScreenshotClick}/>
                    <img src="/img/mic.png" alt="" onClick={handleMicClick}/>
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
                        {openEmoji && <EmojiPicker onEmojiClick={showEmoji}/>}
                    </div>
                </div>
                <div className="emoji">
                    <img
                        src="/img/face.png"
                        alt=""
                        onClick={() => setShowGifSelector((prev) => !prev)}
                    />
                    <div className="emojiPicker">
                        {showGifSelector && <GifSelector onSelect={handleGifSelect}/>}
                    </div>
                </div>
                <div className="emoji">
                    <img
                        src="/logo192.png"
                        alt=""
                        onClick={handleFireworksClick}
                    />
                </div>
                <div className="emoji">
                    <img
                        src="/img/happyi.png"
                        alt=""
                        onClick={handleConfettiClick}
                    />
                </div>
                <button onClick={handleClickSend} className="sendButton">Send</button>
            </div>
        </div>
    );
};

export default MainChat;
