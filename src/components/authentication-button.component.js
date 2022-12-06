import React from 'react';

import LoginButton from './login-button.component';
import LogoutButton from './logout-button.component';

import { useAuth0 } from '@auth0/auth0-react';

/**
 * Authentication button for the navbar
 * @returns LogoutButton if user is authenticated, else LoginButton
 */
const AuthenticationButton = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;