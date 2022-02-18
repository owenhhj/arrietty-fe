import React, {useState} from "react";

import {Link} from "react-router-dom";
import './Navbar.css';

function Navbar(){
    const [click, setClick] = useState(false);


    const handleClick = ()=>{
        setClick(!click);
    };

    const closeMobileMenu = ()=>{
        setClick(!click);
    };


    return (

            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/home" className="navbar-logo">
                        <img className="navbar-logo-icon" src="./logo-icon.svg" alt=""/>
                        &nbsp;  Arrietty
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click? 'fas fa-times': 'fas fa-bars'}/>
                    </div>
                    <ul className={click? 'nav-menu active': 'nav-menu'}>
                        <li className="nav-item">
                            <img className="nav-icon" src="./home-icon.svg" alt="" />
                            <Link to="/home" className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <img className="nav-icon" src="./my-posts-icon.svg" alt="" />
                            <Link to="/myPosts" className="nav-links" onClick={closeMobileMenu}>
                                My posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <img className="nav-icon" src="./favorite-icon.svg" alt="" />
                            <Link to="/favorite" className="nav-links" onClick={closeMobileMenu}>
                                Favorite
                            </Link>
                        </li>
                        <li className="nav-item">
                            <img className="nav-icon" src="./notification-icon.svg" alt="" />
                            <Link to="/notification" className="nav-links" onClick={closeMobileMenu}>
                                Notification
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>


    )

}

export default Navbar;