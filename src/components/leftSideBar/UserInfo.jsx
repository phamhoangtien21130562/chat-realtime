import '../../assets/style/userInfo.css'

const UserInfo = () => {
    return(
        <div className='userInfo'>
            <div className="user">
                {/*<img src="" alt=""/>*/}
                <img src="/img/avata.png" alt=""/>
                <h2>OzuSus</h2>
            </div>
            <div className="icons">
                <img src="/img/more.png" alt=""/>
                <img src="/img/video.png" alt=""/>
                <img src="/img/edit.png" alt=""/>

            </div>
        </div>
    )
}
export default UserInfo