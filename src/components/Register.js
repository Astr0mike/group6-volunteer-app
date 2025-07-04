import React from 'react';
import '../css/Register.css';

const Register = () => {
    return (
        <div className="register-container">
            <div className="register-form">
                <h2>Register</h2>
                <form>
                    <div className="input-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit">Register</button>
                </form>
                <div className="auth-links">
                    <a href="/login">Login</a>
                    <a href="/create-event">Create Event</a>
                </div>
            </div>
        </div>
    );
};

export default Register;