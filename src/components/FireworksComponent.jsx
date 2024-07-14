import React from 'react';
import { Fireworks } from 'fireworks-js/dist/react';

const FireworksComponent = ({ show }) => {
    if (!show) return null;

    const fxProps = {
        count: 3,
        interval: 500,
        colors: ['#cc3333', '#4CAF50', '#81C784'],
        calc: (props, i) => ({
            ...props,
            x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
            y: 200 + Math.random() * 200 - 100
        })
    };

    return <Fireworks {...fxProps} />;
};

export default FireworksComponent;
