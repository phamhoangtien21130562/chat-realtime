import '../../assets/style/mainChat.css'
import EmojiPicker from "emoji-picker-react";
import {useEffect, useRef, useState} from "react";

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
                    <img src="/img/avata.png" alt=""/>
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis doloribus eius expedita
                            ipsum laborum magnam non repellendus reprehenderit unde velit. Ab distinctio doloribus fuga,
                            nulla quos reiciendis sunt tempore tenetur?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="messages own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis doloribus eius expedita
                            ipsum laborum magnam non repellendus reprehenderit unde velit. Ab distinctio doloribus fuga,
                            nulla quos reiciendis sunt tempore tenetur?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="messages">
                    <img src="/img/avata.png" alt=""/>
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis doloribus eius expedita
                            ipsum laborum magnam non repellendus reprehenderit unde velit. Ab distinctio doloribus fuga,
                            nulla quos reiciendis sunt tempore tenetur?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="messages own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis doloribus eius expedita
                            ipsum laborum magnam non repellendus reprehenderit unde velit. Ab distinctio doloribus fuga,
                            nulla quos reiciendis sunt tempore tenetur?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="messages">
                    <img src="/img/avata.png" alt=""/>
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis doloribus eius expedita
                            ipsum laborum magnam non repellendus reprehenderit unde velit. Ab distinctio doloribus fuga,
                            nulla quos reiciendis sunt tempore tenetur?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="messages own">
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis doloribus eius expedita
                            ipsum laborum magnam non repellendus reprehenderit unde velit. Ab distinctio doloribus fuga,
                            nulla quos reiciendis sunt tempore tenetur?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="messages">
                    <img src="/img/avata.png" alt=""/>
                    <div className="texts">
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis doloribus eius expedita
                            ipsum laborum magnam non repellendus reprehenderit unde velit. Ab distinctio doloribus fuga,
                            nulla quos reiciendis sunt tempore tenetur?
                        </p>
                        <span>1 min ago</span>
                    </div>
                </div>
                <div className="messages own">
                    <div className="texts">
                        <img
                            src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/06/Subnautica-Sea-Dragon-1.jpg"
                            alt=""/>

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis doloribus eius expedita
                            ipsum laborum magnam non repellendus reprehenderit unde velit. Ab distinctio doloribus fuga,
                            nulla quos reiciendis sunt tempore tenetur?
                        </p>
                        <span>1 min ago</span>
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