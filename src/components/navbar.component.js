import React from 'react';
import AuthNav from './auth-nav.component';
import MainNav from './main-nav.component';
import './navbar.css';  // Import your new navbar.css

/**
 * Navbar hook containing MainNav and AuthNav hooks
 */
const NavBar = () => {
    return (
        <div className="nav-container">
            <nav className="navbar navbar-expand-md custom-navbar">
                <div className="container custom-container">
                    <a className="navbar-brand custom-navbar-brand" href="/">
                        <img src="https://ci.greenfield.ca.us/ImageRepository/Document?documentID=1390" width="200" height="100" alt="gcsw-logo" className="d-inline-block align-top" />
                    </a>
                    <MainNav />
                </div>
            </nav>
        </div>
    );
}

export default NavBar;
