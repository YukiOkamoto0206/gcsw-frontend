import React, { Component } from "react";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { Table } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";

const Participant = props => (
    <tr>
        <td>{props.participant.participant_id}</td>
        <td>{props.participant.first_name}</td>
        <td>{props.participant.last_name}</td>
        <td>{props.participant.gender}</td>
        <td>{props.participant.age}</td>
        <td>{props.participant.school}</td>
        <td>{props.participant.objectives[props.participant.objectives.length - 1]}</td>
        <td>{props.date}</td>
    </tr>
)

// TODO: Finish this component
class ParticipantList extends Component {

    constructor(props) {
        super(props);

        this.onChangeDate = this.onChangeDate.bind(this);

        this.state = {
            participants: [],
            date: new Date()
        };
    }

    /**
     * 
     */
    async componentDidMount() {
        this.onChangeDate(this.state.date);
    }

    // load participants with specified date
    async onChangeDate(date) {
        this.setState({
            date: date
        });

        const { getAccessTokenSilently } = this.props.auth0;

        const token = await getAccessTokenSilently();
        
        //
        axios.get(`${process.env.REACT_APP_SERVER_URL}/participants/date/${this.state.date.toDateString()}`, { 
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

    /**
     * 
     * @returns 
     */
    participantList() {
        return this.state.participants.map(currentParticipant => {
            const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            return <Participant date={weekday[this.state.date.getUTCDate()]} participant={currentParticipant} key={currentParticipant.participant_id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Participants</h3>
                <div className="form-group">
                    <label>Search by Date</label>
                    <div>
                        <ReactDatePicker
                            className="input"
                            id="date-picker"
                            placeholderText="Select date"
                            onChange={this.onChangeDate}
                            selected={this.state.date}
                        />
                    </div>
                </div>
                <Table striped bordered hover>
                    <thead className="thead-light">
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>School</th>
                            <th>Latest Objective</th>
                            <th>Day</th>
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