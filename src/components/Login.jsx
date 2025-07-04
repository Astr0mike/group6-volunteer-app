import React, { useState } from 'react';
import '../css/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'user@example.com' && password === 'password') {
            console.log("Login successful!");
        } else {
            setError("Invalid credentials, please try again.");
        }
    };

    return (
        <div className="login-container"> {/* Changed this wrapper class */}
            <div className="login-form"> {/* Form container */}
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group"> {/* New wrapper for label+input */}
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group"> {/* New wrapper for label+input */}
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
            </div>
        </div>
    );
};

export default Login;