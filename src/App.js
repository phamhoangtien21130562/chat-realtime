// import logo from './logo.svg';
import React from "react";  

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import HomePage from "./components/homePage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/Homepage" element={<HomePage/>}/>
            </Routes>
        </Router>
    );
}

export default App;