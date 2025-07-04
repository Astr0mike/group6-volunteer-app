import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Notifications from "./components/Notifications";
import VolunteerMatching from "./components/VolunteerMatching";
import VolunteerHistory from './components/VolunteerHistory';
import Home from './components/Home';
import EventManagementForm from "./components/EventManagementForm";
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
      <Router>
        <div className="App">
            <nav>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
                <Link to="/create-event">Create Event</Link>
                <Link to="/profile">Profile</Link>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/volunteer-history" element={<VolunteerHistory />} />
              <Route path="/volunteer-matching" element={<VolunteerMatching />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/create-event" element={<EventManagementForm />} />
              <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </div>
      </Router>
  );
}

export default App;