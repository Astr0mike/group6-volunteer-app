// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Notifications from "./components/Notifications";
import VolunteerMatching from "./components/VolunteerMatching";
import VolunteerHistory from './components/VolunteerHistory';
import Home from './components/Home';
import EventManagementForm from "./components/EventManagementForm";
import UserProfile from './components/UserProfile';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';

function Navigation({ isLoggedIn, role, onLogout }) {
    const location = useLocation();

    if (!isLoggedIn && location.pathname === '/') {
        return (
            <nav>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </nav>
        );
    }

    return (
        <nav>
            {role === 'volunteer' && (
                <>
                    <Link to="/profile">Profile</Link>
                    <Link to="/notifications">Notifications</Link>
                    <Link to="/events">Events</Link>
                </>
            )}
            {role === 'admin' && (
                <>
                    <Link to="/create-event">Create Event</Link>
                    <Link to="/volunteer-matching">Volunteer Matching</Link>
                    <Link to="/volunteer-history">Volunteer History</Link>
                </>
            )}
            {(location.pathname === '/login' || location.pathname === '/register') && (
                <Link to="/">Back</Link>
            )}
            {(location.pathname !== '/login' && location.pathname !== '/register') && (
                <Link to="/" onClick={onLogout}>Logout</Link>
            )}
        </nav>
    );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [role, setRole] = useState('');

    const handleLogin = (userRole = 'volunteer') => {
        setIsLoggedIn(true);
        setRole(userRole);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setRole('');
        localStorage.clear(); // also clear stored user data
    };

    return (
        <Router>
            <div className="App">
                <Navigation
                    isLoggedIn={isLoggedIn}
                    role={role}
                    onLogout={handleLogout}
                />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/volunteer-history" element={<VolunteerHistory />} />
                    <Route path="/volunteer-matching" element={<VolunteerMatching />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/create-event" element={<EventManagementForm />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
