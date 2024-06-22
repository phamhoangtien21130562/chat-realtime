import '../../assets/style/mainChat.css'
import EmojiPicker from "emoji-picker-react";
import React, {useEffect, useRef, useState} from "react";

const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
    const timeOptions = { hour: 'numeric', minute: 'numeric', second: 'numeric' };

    const datePart = dateTime.toLocaleDateString(undefined, dateOptions);
    const timePart = dateTime.toLocaleTimeString(undefined, timeOptions);

    return `${datePart} ${timePart}`;
};

const MainChat = () => {

    const [openEmoji, setOpenEmoji] = useState(false)
    const [emojiToText, setEmojiToText] = useState("")

    const endRef = useRef(null);
    useEffect(() =>{
        endRef.current?.scrollIntoView({behavior: "smooth"});
    },[]);

    const showEmoji = e => {
        setEmojiToText(prev => prev + e.emoji);
        setOpenEmoji(false)
    };

    return (

        <div className='mainChat'>
            <div className="topChat">
                <div className="user">
                    <img src="/img/avata.png" alt=""/>
                    <div className="texts">
                        <span>OzuSus</span>
                        <p>Helllo World</p>
                    </div>
                </div>
                <div className="icon">
                    <img src="/img/phone.png" alt=""/>
                    <img src="/img/video.png" alt=""/>
                    <img src="/img/info.png" alt=""/>
                </div>
            </div>
            <div className="centerChat">
                <div className="messages">
                    {/*<span>{user.name}</span>*/}
                    {/*<p>{formatDateTime(user.actionTime)}</p>*/}

                    {/*<p classname="dateTime">01/01/2003 0:10:12 PM</p>*/}
                    <img src="/img/avata.png" alt=""className="avatarImage"/>
                    <div className="texts">
                        <span className="nameMessage">Tien</span>
                        <p>user1
                        </p>
                        <span>01/01/2003 0:10:12 PM</span>
                    </div>

                </div>
                <div className="messages own">
                <div className="texts">
                    <p>user2
                        </p>
                        <span>01/01/2003 0:11:12 PM</span>
                    </div>
                </div>


                <div ref={endRef}></div>
            </div>
            <div className="bottomChat">
                <div className="icons">
                <img src="/img/img.png" alt=""/>
                    <img src="/img/camera.png" alt=""/>
                    <img src="/img/mic.png" alt=""/>
                </div>
                <input type="text" placeholder="Write your message here"
                       value={emojiToText} onChange={e => setEmojiToText(e.target.value)}
                />
                <div className="emoji">
                    <img src="/img/emoji.png" alt=""
                         onClick={() => setOpenEmoji((prev) => !prev)}
                    />
                    <div className="emojiPicker">
                        <EmojiPicker open={openEmoji} onEmojiClick={showEmoji}/>
                    </div>
                </div>
                <button className="sendButton">Send</button>
            </div>
        </div>

    )
}
export default MainChat