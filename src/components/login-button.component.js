import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

/**
 * Log in button hook that redirects to Auth0's login screen
 */
const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <button
            className="btn btn-primary btn-block"
            onClick={() => loginWithRedirect()}
            >
                Staff Log In
            </button>
    )
}

export default LoginButton;