import '../../assets/style/mainChat.css'

const MainChat = () => {
  return(
      <div className='mainChat'>
        <div className="topChat">
          <div className="user">
            <img src="/img/avata.png" alt=""/>
            <div className="texts">
              <span>OzuSus</span>
              <p>Lorem ipsum dolor sit amet</p>
            </div>
          </div>
          <div className="icon">
            <img src="/img/phone.png" alt=""/>
            <img src="/img/video.png" alt=""/>
            <img src="/img/info.png" alt=""/>
          </div>
        </div>
        <div className="centerChat"></div>
        <div className="bottomChat"></div>
      </div>
  )
}
export default MainChat