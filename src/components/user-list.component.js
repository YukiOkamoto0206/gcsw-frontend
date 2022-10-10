import React, { Component } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const UserList = () => {
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        async function fetchData() {
            try {
                const token = await getAccessTokenSilently();
        
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                });
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <p>Hey</p>
        </div>
    );
}

export default UserList;