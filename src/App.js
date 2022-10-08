import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./components/home.component";
import UserList from "./components/user-list.component"
import CreateUser from "./components/create-user.component"; 
import NavbarComponent from "./components/navbar.component";


function App() {
  return (
    <Router>
      <div className="container">
      <NavbarComponent />
      <br />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/create" element={<CreateUser />}  />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
