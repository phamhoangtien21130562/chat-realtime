import React from 'react';

const gifs = [
    'https://i0.wp.com/images.onwardstate.com/uploads/2016/05/giphy-gif-11.gif?fit=500%2C375&ssl=1',
    'https://i.pinimg.com/originals/85/de/04/85de0467549cd6f1fe46f28bcf862c07.gif',
    'https://media1.tenor.com/m/sA-Ukl2vy7gAAAAC/ao-anime.gif',
    'https://gifdb.com/images/high/adorable-snow-seal-sup-ow1ropnowuqw9ib6.webp',
    'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGh3bzRjd2pwcW5pZnUzYTZ3anp1MnExNGYxYWtvb3V3b2k4MzVmeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Sr8tRKDNp1Kla/giphy.webp',
    'https://fbi.cults3d.com/uploaders/28284376/illustration-file/c264f925-ae7f-46ff-975a-f7261f807d58/ezgif.com-gif-maker.gif',
    'https://media1.tenor.com/m/S32ZfhsF65oAAAAd/cute-love.gif',
    'https://cdn.dribbble.com/users/1783374/screenshots/10971607/media/f8306d5fa8106661e6cdf9ec756dbe28.gif',
    'https://media.tenor.com/WWbuQdYiwe0AAAAC/rabbit-cute-animal.gif',
    'https://gifdb.com/images/high/cute-fox-thank-you-v0sgp7u86jl3bztt.gif',
    'https://thanhnien.mediacdn.vn/Uploaded/game/st.game.thanhnien.com.vn/image/kenhug14/8/21/pikachu/thanh-nien-game-pikachu-4.gif',
    'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi96sHfWFmdCIUDOJkjwTKK5BA84ccqi3hWRrlX-UohWniXmmt7RnZqSDRjFCbJtbpJATht0KoO2fWS25UwUgGGUk-7pPv-CIHpf4kWQXuM9ET4GQ6Jk45mbEthSPBe1QbqdNXWC7kHSQVx/s1600/Funny%20Cat%20Picture%20-%20Kitten%2093.gif'
    // Thêm các URL GIF khác tại đây
];

const GifSelector = ({ onSelect }) => {
    return (
        <div className="gif-selector">
            {gifs.map((gif, index) => (
                <img
                    key={index}
                    src={gif}
                    alt={`gif-${index}`}
                    onClick={() => onSelect(gif)}
                    style={{ width: '100px', height: '100px', margin: '10px', cursor: 'pointer' }}
                />
            ))}
        </div>
    );
};

export default GifSelector;
