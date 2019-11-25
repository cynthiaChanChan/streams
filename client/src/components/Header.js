import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

const Header = () => {
    return (
        <header className="header">
            <Link to="/" className="heading-1">
                Streamit
            </Link>
            <div className="header__content">
                <Link to="/" className="header__item">
                    All Streams
                </Link>
                <GoogleAuth />
            </div>
        </header>
    );
}

export default Header;