import React, { Component } from "react";
import axios from "axios";
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import ReactDatePicker, { DatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

class ParticipantSignin extends Component {
    constructor(props) {
        super(props); 

        this.onChangeId = this.onChangeId.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeSchool = this.onChangeSchool.bind(this);
        this.onChangeObjective = this.onChangeObjective.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            participant_id: '',
            first_name: '',
            last_name: '',
            gender: '',
            age: 0,
            school: '',
            objective: '',
            date: new Date()
        }
    }

    onChangeId(e) {
        this.setState({
            participant_id: e.target.value
        });
    }

    onChangeFirstName(e) {
        this.setState({
            first_name: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            last_name: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }

    onChangeSchool(e) {
        this.setState({
            school: e.target.value
        });
    }

    onChangeObjective(e) {
        this.setState({
            objective: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    async onSubmit(e) {
        e.preventDefault();

        const { getAccessTokenSilently } = this.props.auth0;

        const token = await getAccessTokenSilently();

        const participant = {
            participant_id: this.state.participant_id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            gender: this.state.gender,
            age: this.state.age,
            school: this.state.school,
            objective: this.state.objective,
            date: this.state.date,
        }

        console.log(participant);

        axios.post(`${process.env.REACT_APP_SERVER_URL}/participants/add`, participant, {
            headers: {
                authorization: `Bearer ${token}`,
            }
            })
            .then(response => {
                alert("Participant has signed in!");
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
        
    }

    render() {
        return (
            <div>
                <h1 className="mb-3">Sign In</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>ID:</label>
                        <input 
                            type="text" 
                            required
                            className="form-control" 
                            placeholder="Enter ID here"
                            value={this.state.participant_id} 
                            onChange={this.onChangeId} />
                    </div>
                    <div className="form-group">
                        <label>First Name / Nombre de Pila:</label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            placeholder="Enter first name here"
                            value={this.state.first_name}
                            onChange={this.onChangeFirstName}/>
                    </div>
                    <div className="form-group">
                        <label>Last Name / Apellido:</label>
                        <input 
                            type="text"
                            required
                            className="form-control"
                            placeholder="Enter last name here"
                            value={this.state.last_name}
                            onChange={this.onChangeLastName}/>
                    </div>
                    <div className="form-group">
                        <select
                            ref="userInput"
                            required
                            className="form-control"
                            value={this.state.gender}
                            onChange={this.onChangeGender}>
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="decline">Decline to say</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Age / Edad:</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            placeholder="Enter age here"
                            value={this.state.age}
                            onChange={this.onChangeAge}/>
                    </div>
                    <div className="form-group">
                        <select
                            ref="userInput"
                            required
                            className="form-control"
                            value={this.state.school}
                            onChange={this.onChangeSchool}>
                            <option value="">School</option>
                            <option value="Greenfield High">Greenfield High School (GHS)</option>
                            <option value="Vista Verde">Vista Verde Middle School (VVMS)</option>
                            <option value="Oak Avenue">Oak Avenue Elementary School (OAK)</option>
                            <option value="Mary Chapa">Mary Chapa Academy (MCA)</option>
                            <option value="Cesar Chavez">Cesar Chavez Elementary School (CCE)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>What do you want to do today? Que quieres hacer hoy?</label>
                        <textarea
                            type="text"
                            className="form-control"
                            value={this.state.objective}
                            onChange={this.onChangeObjective}/>
                    </div>
                    <div className="form-group">
                        <label>Date / Fecha:</label>
                        <div>
                            <ReactDatePicker
                                className="input"
                                placeholderText="Select date"
                                onChange={this.onChangeDate}
                                selected={this.state.date}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Sign in" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

export default withAuth0(ParticipantSignin);