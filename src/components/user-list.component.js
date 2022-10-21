import React, { Component } from "react";
import axios from "axios";
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const User = props => (
    <tr>
        <td>{props.user._id}</td>
        <td>{props.user.username}</td>
    </tr>
)

class UserList extends Component {

    constructor(props) {
        super(props);

        this.state = {users: []};
    }

    async componentDidMount() {
        const { getAccessTokenSilently } = this.props.auth0;

        const token = await getAccessTokenSilently();
        
        axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, { 
            headers: {
                authorization: `Bearer ${token}`,
            }
            })
            .then(response => {
                this.setState({ users: response.data })
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error); 
            });
    }

    userList() {
        return this.state.users.map(currentuser => {
            return <User user={currentuser} key={currentuser._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Users</h3>
                <Table striped bordered hover>
                    <thead className="thead-light">
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default withAuth0(UserList);