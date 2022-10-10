import { NavLink } from "react-router-dom";
import React from "react";

const MainNav = () => (
    <div className="navbar-nav mr-auto">
        <NavLink
            to="/"
            className="nav-link"
        >
            Home
        </NavLink>
        <NavLink
            to="/users"
            className="nav-link"
        >
            Users
        </NavLink>
        <NavLink
            to="/create"
            className="nav-link"
        >
            Create User
        </NavLink>
    </div>
);

export default MainNav;

