import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'volunteer@example.com' && password === 'password') {
            onLogin('volunteer'); // Notify App component
            navigate('/profile'); // Redirect to profile page
        } else if (email === 'admin@example.com' && password === 'adminpass') {
            onLogin('admin');
            navigate('/create-event');
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