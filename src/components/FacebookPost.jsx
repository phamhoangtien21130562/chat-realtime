import React, { useEffect } from 'react';

const FacebookEmbed = ({ href, width = 500, type = 'post' }) => {
    useEffect(() => {
        // Load Facebook SDK
        if (window.FB) {
            window.FB.XFBML.parse();
        } else {
            ((d, s, id) => {
                let js,
                    fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0';
                fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
        }
    }, []);

    const renderEmbed = () => {
        switch (type) {
            case 'post':
                return <div className="fb-post" data-href={href} data-width={width}></div>;
            case 'video':
                return <div className="fb-video" data-href={href} data-width={width} data-allowfullscreen="true"></div>;
            case 'photo':
                return <div className="fb-photo" data-href={href} data-width={width}></div>;
            default:
                return null;
        }
    };

    return (
        <div>
            <div id="fb-root"></div>
            {renderEmbed()}
        </div>
    );
};

export default FacebookEmbed;
