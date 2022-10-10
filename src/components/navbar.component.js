import React from 'react';
import AuthNav from './auth-nav.component';
import MainNav from './main-nav.component';

const NavBar = () => {
    return (
        <div className="nav-container mb-3">
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">Greenfield Community Science Workshop</a>
                    <MainNav />
                    <AuthNav />
                </div>
            </nav>
        </div>
    );
}


export default NavBar;