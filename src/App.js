import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VolunteerHistory from './components/VolunteerHistory';
import Home from './components/Home';
import './App.css';

function App() {
  return (
      <Router>
        <div className="App">
            <nav>
              <Link to="/">Home</Link> | <Link to="/volunteer-history">Volunteer History</Link>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/volunteer-history" element={<VolunteerHistory />} />
            </Routes>
        </div>
      </Router>
  );
}

export default App;
