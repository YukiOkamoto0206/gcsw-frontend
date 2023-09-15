import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import { Form, Button } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, tableCellClasses, styled } from "@mui/material";
import { Link } from "react-router-dom";
import { downloadExcel, useDownloadExcel } from "react-export-table-to-excel";

const { useState } = React;

/**
 * custom table cell
 */
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        whiteSpace: 'nowrap'
    }
}));

/**
 * custom table row
 */
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));

const handleLogout = async (volunteer_id, date) => {
    axios.put(`${process.env.REACT_APP_SERVER_URL}/volunteers/adminLogout`, { volunteer_id: volunteer_id, date: date }, {
        headers: {
        }
    })
        // alert message of successful sign-in, refresh page to clear form fields
        .then(response => {
            alert("Volunteer has logged out!");
            console.log(response.data);
            window.location = '/'
        })
        .catch((error) => {
            console.log(error);
        });
}




/**
 * Volunteer hook that displays volunteer list information in table cells
 * Contains links to Edit page and Delete action
 */
const Volunteer = props => (
    <StyledTableRow>
        <StyledTableCell component="th" scope="row">{props.volunteer.volunteer_id}</StyledTableCell>
        <StyledTableCell align="right">{props.volunteer.first_name + ' ' + props.volunteer.last_name}</StyledTableCell>
        <StyledTableCell align="right">{props.volunteer.total_hours}</StyledTableCell>
        <StyledTableCell align="right">{props.volunteer.is_signed_in ? "Yes" : "No"}</StyledTableCell>
        <StyledTableCell align="right">{props.volunteer.is_signed_in ? <Button variant="danger" onClick={() => handleLogout(props.volunteer.volunteer_id, new Date().toDateString())}>Log Out</Button> : "Not Logged In"}</StyledTableCell>
        <StyledTableCell align="right"> {props.volunteer.phone_number ? `(${props.volunteer.phone_number.substring(0, 3)})-${props.volunteer.phone_number.substring(3, 6)}-${props.volunteer.phone_number.substring(6, 10)}` : ''} </StyledTableCell>
        <StyledTableCell align="right"> {props.volunteer.volunteer_title} </StyledTableCell>
        <StyledTableCell align="right"> <Button variant="success" onClick={() => props.onDownload(props.volunteer.first_name,props.volunteer.last_name,props.volunteer.total_hours,props.volunteer.phone_number, props.volunteer.hours_on_date)}>Print report</Button></StyledTableCell>
    </StyledTableRow>
)

/**
 * React Hook for displaying volunteer attendance list by date
 * @returns VolunteerList HTML template
 */
const VolunteerList = () => {
    /**
     * default state
     * empty array of volunteers
     * current date
     * empty access token
     */
    const [state, setState] = useState({
        volunteers: [],
        date: new Date(),
        token: ''
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTitle, setSelectedTitle] = useState('');

    const getVolunteers = async () => {
        const token = await getAccessTokenSilently();

        // GET request to retrieve volunteer
        axios.get(`${process.env.REACT_APP_SERVER_URL}/volunteers`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
            // set state variables using response data
            .then(response => {
                const data = response.data;
                data.forEach(volunteer => {
                    console.log(volunteer.first_name, volunteer.last_name, "has been present a total of ___ hours");
                })
                setState(prevState => ({ ...prevState, volunteers: data }));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const userSerach = async (e) => {
        setSearchTerm(e.target.value);
        const token = await getAccessTokenSilently();
        // GET request to retrieve volunteer
        axios.get(`${process.env.REACT_APP_SERVER_URL}/volunteers/search?q=${e.target.value}`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
            // set state variables using response data
            .then(response => {
                const data = response.data;
                data.forEach(volunteer => {
                    console.log(volunteer.first_name, volunteer.last_name, "has been present a total of ___ hours");
                })
                setState(prevState => ({ ...prevState, volunteers: data }));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const titleSearch = async (e) => {
        setSelectedTitle(e.target.value)
        console.log(e.target.value)
        const token = await getAccessTokenSilently();
        axios.get(`${process.env.REACT_APP_SERVER_URL}/volunteers/searchTitle?q=${e.target.value}`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            const data = response.data;
            console.log(data)
            setState(prevState => ({...prevState, volunteers:data}));
        })
        .catch((error) => {
            console.log(error);
        })
    }


    /**
     * Used for exporting table and downloading an Excel file
     */
    const tableRef = useRef(null);

    const onDownload  = (first_name, last_name, hours, number, hours_on_date) => {

        const header = ['Name', 'hours', 'number'];

       const body = [];

  const volunteerNameRow = [first_name + ' ' + last_name, '', ''];
  body.push(volunteerNameRow);

  if (hours_on_date instanceof Map) {
    for (const [key, value] of hours_on_date.entries()) {
      const row = [key, value];
      body.push(row);
    }
}
        downloadExcel({
            fileName: 'Report for ' + first_name + ' ' + last_name,
            sheet: "Volunteers",
            tablePayload: {
                header,
                body:body
            }
            
        });

    }

    // method to retreive authenticated user's access token
    const { getAccessTokenSilently } = useAuth0();

    /**
     * On page load, retrieve attendance of current date
     */
    useEffect(() => {
        onChangeDate(state.date);
    }, [state.date]);

    /**
     * Show attendance records of given date
     * @param {selected date} date 
     */
    const onChangeDate = async (date) => {
        const token = await getAccessTokenSilently();

        // GET request to retrieve volunteers who have signed in on specified date
        axios.get(`${process.env.REACT_APP_SERVER_URL}/volunteers/date/${date.toDateString()}`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        })
            // set state variables using response data, selected date, and access token
            .then(response => {
                setState({
                    volunteers: response.data,
                    date: date,
                    token: token
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    /**
     * Display list of volunteers
     * @returns rows of Volunteer hooks
     */
    const volunteerList = () => {
        return state.volunteers.map(currentVolunteer => {
            return <Volunteer date={state.date} volunteer={currentVolunteer} onDownload={onDownload} key={currentVolunteer.volunteer_id} />;
        })
    }

    return (
        <div>
            <h3>Logged Volunteers</h3>
            <Form className='d-flex'>
                <Form.Group className="mb-3">
                    <Form.Label>Search by Date:</Form.Label>
                    <ReactDatePicker
                        className="input"
                        onChange={onChangeDate}
                        selected={state.date}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Search by Volunteer:</Form.Label><br />
                    <input type="text" value={searchTerm} onChange={userSerach} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label style={{marginLeft:'80px'}}>Filter by Title:</Form.Label><br />
                    <select id="title" value={selectedTitle} onChange={titleSearch} style={{marginLeft:'80px', height:'30px', width:'185px'}}>
                        <option value="">All Titles</option>
                        <option value="Intern Scientist">Intern Scientist</option>
                        <option value="Lab Explorer">Lab Explorer</option>
                        <option value="Science Sidekick">Science Sidekick</option>
                        <option value="Research Rockstar">Research Rockstar</option>
                        <option value="Experiment Hunter">Experiment Hunter</option>
                        <option value="Lab Ninja">Lab Ninja</option>
                        <option value="Dr. Cerebro">Dr. Cerebro</option>
                        <option value="Jedi of Science">Jedi of Science</option>
                        <option value="Master of Science">Master of Science</option>
                        <option value="Science Sensei">Science Sensei</option>
                        <option value="Mad Scientist">Mad Scientist</option>
                    </select>
                </Form.Group>
            </Form>
            <Form>
                <Form.Group className="mb-3">
                    <Button variant="success" >Export Table to XLS</Button>&nbsp;
                    <Button variant="success" onClick={getVolunteers}>View All Members</Button>
                </Form.Group>
            </Form>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} ref={tableRef} aria-label="customized table">
                    <TableHead >
                        <TableRow>
                            <StyledTableCell><b>User ID / ID de Usuario</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Name / Nombre</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Total Hours</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Logged in?</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Force Log Out?</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Phone Number</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Volunteer Title</b></StyledTableCell>
                            <StyledTableCell align="right"><b>Print Report?</b></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {volunteerList()}
                    </TableBody>
                </Table>
            </TableContainer>
            <br />
        </div>
    )
}

export default withAuth0(VolunteerList);
