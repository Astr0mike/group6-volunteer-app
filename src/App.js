import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Notifications from "./components/Notifications";
import VolunteerMatching from "./components/VolunteerMatching";
import VolunteerHistory from './components/VolunteerHistory';
import Home from './components/Home';
import EventManagementForm "./components/EventManagementForm";
import './App.css';

function App() {
  return (
      <Router>
        <div className="App">
            <nav>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/volunteer-history" element={<VolunteerHistory />} />
              <Route path="/volunteer-matching" element={<VolunteerMatching />} />
              <Route path="/notifications" element={<Notifications />} />
            </Routes>
        </div>
      </Router>
  );
}

export default App;
