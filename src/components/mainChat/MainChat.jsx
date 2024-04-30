import '../../assets/style/mainChat.css'
import EmojiPicker from "emoji-picker-react";
import {useState} from "react";
const MainChat = () => {
  const [openEmoji,setOpenEmoji] = useState(false)
  const [emojiToText, setEmojiToText] = useState("")
  const showEmoji = e => {
    setEmojiToText(prev=>prev + e.emoji);
    setOpenEmoji(false)
  };
  return(
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
        <div className="centerChat"></div>
        <div className="bottomChat">
            <div className="icons">
                <img src="/img/img.png" alt=""/>
                <img src="/img/camera.png" alt=""/>
                <img src="/img/mic.png" alt=""/>
            </div>
            <input type="text" placeholder="Write your message here"
                   value={emojiToText} onChange={e=> setEmojiToText(e.target.value)}
            />
            <div className="emoji">
                <img src="/img/emoji.png" alt=""
                     onClick={() =>setOpenEmoji((prev) => !prev)}
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