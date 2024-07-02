import React from 'react';
import "./index.css"

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${payload[0].name} : ${payload[0].value}%`}</p>
                <p className="intro">{label}</p>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
