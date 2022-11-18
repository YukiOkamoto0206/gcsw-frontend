import React from 'react';
import AuthNav from './auth-nav.component';
import MainNav from './main-nav.component';

const NavBar = () => {
    return (
        <div className="nav-container mb-3">
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src="https://ci.greenfield.ca.us/ImageRepository/Document?documentID=1390" width="200" height="100" className="d-inline-block align-top" />
                    </a>
                    <MainNav />
                    <AuthNav />
                </div>
            </nav>
        </div>
    );
}


export default NavBar;