import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import ParticipantSignin from "./components/participant-signin.component"
import Loading from "./components/loading.component";
import Footer from "./components/footer.component";
import ProtectedRoute from "./auth/protected-route";
import ParticipantList from "./components/participant-list.component"
import EditParticipant from "./components/edit-participant.component";
import NavBar from "./components/navbar.component";
<<<<<<< HEAD
import Print from "./components/print-button.component";

=======
import VolunteerList from "./components/volunteer-list.component";
>>>>>>> edf67a045a09fdd6fa7d5bf40e0dd8674d58d6c5


const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }
  
  return (
<<<<<<< HEAD
      <div id="app" className="d-flex flex-column h-100">    
       <div  id='printablediv' >
    
        <NavBar />
        {/* <MulitselectDrop></MulitselectDrop> */}

          
          <div className="container flex-grow-1">
            
              
            <Routes>
              <Route path="/" exact element={<ParticipantSignin />} />
              <Route element={<ProtectedRoute />} >
                  <Route path="/participants" element={<ParticipantList />} />
                  <Route path="/edit/:id" element={<EditParticipant />} />
              </Route>
            </Routes>
            <button type="button" onClick={Print} > Print page</button>
          </div>


          
         <Footer />
        </div>
=======
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <div className="container flex-grow-1">
          <Routes>
            <Route path="/" exact element={<ParticipantSignin />} />
            <Route element={<ProtectedRoute />} >
                <Route path="/participants" element={<ParticipantList />} />
                <Route path="/edit/:id" element={<EditParticipant />} />
                <Route path="/volunteers" element={<VolunteerList/>}/>
            </Route>
          </Routes>
        </div>
        <Footer />
>>>>>>> edf67a045a09fdd6fa7d5bf40e0dd8674d58d6c5
      </div>
  );
}

export default App;
