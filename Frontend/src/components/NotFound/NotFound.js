import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {

    const navigate = useNavigate();
    const gohome = () => navigate('/')

    const content = (
        <div className="not-found">
            <div className="contents">
                <img
                    src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
                    alt="not-found"
                />
                <button className="link-home" onClick={gohome}>
                    Go to Home page!
                </button>
            </div>
        </div>
    )

    return content;
};

export default NotFound;
