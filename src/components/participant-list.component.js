import React, { Component } from "react";
import axios from "axios";
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import { Table } from "react-bootstrap";

const Participant = props => (
    <tr>
        <td>{props.participant.participant_id}</td>
        <td>{props.participant.first_name}</td>
        <td>{props.participant.last_name}</td>
        <td>{props.participant.gender}</td>
        <td>{props.participant.age}</td>
        <td>{props.participant.school}</td>
        <td>{props.participant.dates[props.participant.dates.length - 1]}</td>
    </tr>
)

class ParticipantList extends Component {

    constructor(props) {
        super(props);

        this.state = {participants: []};
    }

    async componentDidMount() {
        const { getAccessTokenSilently } = this.props.auth0;

        const token = await getAccessTokenSilently();
        
        axios.get(`${process.env.REACT_APP_SERVER_URL}/participants`, { 
            headers: {
                authorization: `Bearer ${token}`,
            }
            })
            .then(response => {
                this.setState({ participants: response.data })
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error); 
            });
    }

    participantList() {
        return this.state.participants.map(currentParticipant => {
            return <Participant participant={currentParticipant} key={currentParticipant.participant_id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Participants</h3>
                <Table striped bordered hover>
                    <thead className="thead-light">
                        <tr>
                            <th>Participant ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>School</th>
                            <th>Last Signed In</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.participantList() }
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default withAuth0(ParticipantList);