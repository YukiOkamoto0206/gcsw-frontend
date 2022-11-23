import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
    const curOrganization = localStorage.getItem('organization_id');

    const options = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
        redirectUri: window.location.origin,
        ...(curOrganization ? { organization: curOrganization } : null)

    };

    return (
        <Auth0Provider {...options}>{children}</Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;