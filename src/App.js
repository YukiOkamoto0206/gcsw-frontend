import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Home from "./components/home.component";
import CreateUser from "./components/create-user.component"; 
import NavbarComponent from "./components/navbar.component";


function App() {
  return (
    <div className="App">
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/user" element={<CreateUser />}  />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
