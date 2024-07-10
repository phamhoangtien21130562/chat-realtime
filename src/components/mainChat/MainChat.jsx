import '../../assets/style/mainChat.css';
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useRef, useState } from "react";
import CryptoJS from "crypto-js";
import html2canvas from 'html2canvas';
import * as events from "events";
import FacebookEmbed from "../FacebookPost";
import pica from "pica";

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

const MainChat = ({chatMess,groupName, userType, handleSendMessage}) => {
    const [openEmoji, setOpenEmoji] = useState(false);
    const [emojiToText, setEmojiToText] = useState("");
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

    let prevName = "";

    const getYoutubeEmbedUrl = (url) => {
        const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        return match ? `https://www.youtube.com/embed/${match[1]}` : url;
    };


    //nén dữ liệu thành 22kb
    const MAX_IMAGE_SIZE = 22 * 1024;
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Tạo một canvas mới để nén ảnh
        const image = new Image();
        image.src = URL.createObjectURL(file);
        image.onload = async function () {
            const canvas = document.createElement('canvas');
            const targetSize = calculateTargetSize(image, MAX_IMAGE_SIZE);

            canvas.width = targetSize.width;
            canvas.height = targetSize.height;

            const resizeOptions = {
                quality: 3, // Chất lượng nén, số càng cao thì chất lượng càng tốt nhưng file càng lớn
            };

            try {
                const resizedCanvas = await resizeImage(image, canvas, resizeOptions);
                const base64Image = resizedCanvas.toDataURL('image/jpeg');
                handleSendMessage(base64Image);
            } catch (error) {
                console.error("Lỗi khi nén ảnh: ", error);
            }
        };
    };

    //tính toán dữ liệu
    const calculateTargetSize = (image, maxSize) => {
        const aspectRatio = image.width / image.height;
        let targetWidth = Math.sqrt(maxSize * aspectRatio);
        let targetHeight = targetWidth / aspectRatio;

        if (targetWidth > image.width || targetHeight > image.height) {
            targetWidth = image.width;
            targetHeight = image.height;
        }

        return { width: targetWidth, height: targetHeight };
    };

    //nén ảnh
    const resizeImage = (image, canvas, options) => {
        const { quality } = options;
        const picaInstance = pica();

        return new Promise((resolve, reject) => {
            picaInstance.resize(image, canvas, options)
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };


    return (
        <div className='mainChat'>
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
                                        {/*<p>{mess.mes}</p>*/}
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
                                            ) : mess.mes.includes("base64") ? (
                                                <img src={mess.mes} alt="Received Image"/>
                                            ) : (mess.mes.includes("jpg") || mess.mes.includes("png") || mess.mes.includes("jpeg") || mess.mes.includes("image")) ? (
                                                <img src={mess.mes} alt="Received Image"/>
                                            ) : (
                                                <a>{mess.mes}</a>
                                            )}
                                        </p>

                                        {isLastMessage &&
                                            <span className="lastMessage">{formatDateTime(mess.createAt)}</span>}

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
                        accept="image/*"
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
                <button onClick={handleClickSend} className="sendButton">Send</button>
            </div>
        </div>
    );
};
console.log(decryptedUsername);
export default MainChat;
