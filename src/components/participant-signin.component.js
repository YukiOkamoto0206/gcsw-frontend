import React, { Component } from "react";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import ReactDatePicker from "react-datepicker";
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

        // default values of form fields
        this.state = {
            participant_id: '',
            first_name: '',
            last_name: '',
            gender: '',
            age: 1,
            school: '',
            objective: '',
            date: new Date() // defaults to current date
        }
    }

    // checks if entered date is today's date
    isToday(date) {
        let today = new Date();
        today = today.toDateString();

        return date === today;
    }

    /**
     * checks if the participant has signed in once before
     */
    async onChangeId(e) {
        const { getAccessTokenSilently } = this.props.auth0;

        const token = await getAccessTokenSilently();

        // get request with participant id as the parameter
        axios.get(`${process.env.REACT_APP_SERVER_URL}/participants/${e.target.value}`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
            })
            .then(response => {
                // if only one participant is returned, then they are in the database
                if (response.data[1] === undefined) {
                    const date = response.data[0].dates[response.data[0].dates.length - 1];

                    // update field forms with participant credentials
                    this.setState({
                        first_name: response.data[0].first_name,
                        last_name: response.data[0].last_name,
                        gender: response.data[0].gender,
                        age: response.data[0].age,
                        school: response.data[0].school
                    });

                    // check if the participant has already signed in for today
                    if (this.isToday(date)) {
                        console.log('yes');
                        
                    } else {
                        console.log('no');
                    }
                }  
            })
            .catch((error) => {
                console.log(error);
            });
        
        this.setState({
            participant_id: e.target.value
        });
    }

    /**
     * update first name
     */
    onChangeFirstName(e) {
        this.setState({
            first_name: e.target.value
        });
    }

    /**
     * update last name
     */
    onChangeLastName(e) {
        this.setState({
            last_name: e.target.value
        });
    }

    /**
     * update gender
     */
    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    /**
     * update age
     */
    onChangeAge(e) {
        this.setState({
            age: e.target.value
        });
    }

    /**
     * update school
     */
    onChangeSchool(e) {
        this.setState({
            school: e.target.value
        });
    }

    /**
     * update objective
     */
    onChangeObjective(e) {
        this.setState({
            objective: e.target.value
        });
    }

    /**
     * update date
     */
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

        axios.post(`${process.env.REACT_APP_SERVER_URL}/participants/signin`, participant, {
            headers: {
                authorization: `Bearer ${token}`,
            }
            })
            .then(response => {
                alert("Participant has signed in!");
                console.log(response.data);
                window.location = '/';
            })
            .catch((error) => {
                console.log(error);
            });
        
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
                            defaultValue={this.state.participant_id} 
                            onBlur={this.onChangeId} />
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
                            <option value="">Choose a gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="decline">Decline to say</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Age / Edad:</label>
                        <input
                            type="number"
                            required
                            className="form-control"
                            placeholder="Enter age here"
                            min="1"
                            max="99"
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
                            <option value="">Choose a school</option>
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
                                id="date-picker"
                                required
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