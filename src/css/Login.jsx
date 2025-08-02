// src/components/Login.jsx
import React, { useState } from 'react';
import '../css/Login.css';

const Login = () => {
  const [username, setUsername] = useState(''); // CHANGED from email to username
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }) // match backend
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Login successful!");
        setError('');
        console.log("User ID:", data.user_id);
        // you can redirect or set user state here
      } else {
        setError(data.error || 'Invalid credentials.');
        setSuccess('');
      }
    } catch (err) {
      setError("Something went wrong.");
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username (email):</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // CHANGED
              required
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default Login;
