import { NavLink } from "react-router-dom";
import React from "react";

/**
 * Main navbar hook containing links to /home and /participants routes
 */
const MainNav = () => (
    <div className="navbar-nav mr-auto">
        <NavLink
            to="/"
            className="nav-link"
        >
            Home
        </NavLink>
        <NavLink
            to="/participants"
            className="nav-link"
        >
            Participants
        </NavLink>
    </div>
);

export default MainNav;

