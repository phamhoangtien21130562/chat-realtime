import React, { useEffect, useRef, useState } from 'react';

const FacebookEmbed = ({ href, width = '500' }) => {
    const iframeRef = useRef(null);
    const [height, setHeight] = useState('auto');

    useEffect(() => {
        const handleMessage = (event) => {
            if (event.origin === 'https://www.facebook.com') {
                const data = event.data;
                if (data.height && iframeRef.current) {
                    setHeight(data.height + 'px');
                }
            }
        };

        window.addEventListener('message', handleMessage);

        return () => {
            window.removeEventListener('message', handleMessage);
        };
    }, []);

    const iframeSrc = `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(href)}&width=${width}`;

    return (
        <iframe
            ref={iframeRef}
            src={iframeSrc}
            width={width}
            height={height}
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allow="encrypted-media"
            allowFullScreen={true}
        ></iframe>
    );
};

export default FacebookEmbed;
