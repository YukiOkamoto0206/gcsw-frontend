import React from "react";

/**
 * Basic footer hook, contains link to city page for workshop
 */
const Footer = () => (
    <footer className="bg-light p-3 text-center">
        <div className="logo" />
        <p>
            Database project for{" "}
            <a target="__blank" rel="noopener noreferrer" href="https://ci.greenfield.ca.us/191/Greenfield-Science-Workshop">
                Greenfield Community Science Workshop
            </a>
        </p>
    </footer>
)

export default Footer; 