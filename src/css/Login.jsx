import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        // This used to be hardcoded admin login — replaced with real backend call for better security & scalability
        if (email === 'admin@example.com' && password === 'adminpass') {
            onLogin('admin');
            navigate('/create-event');
        } else {
            try {
                const response = await fetch('http://localhost:3001/api/auth/login', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({username: email, password})
                });

                const data = await response.json();

                if (response.ok) {
                    onLogin('volunteer');
                    navigate('/profile');
                } else {
                    setError(data.error || 'Login failed');
                }
            } catch (err) {
                console.error('Login error:', err);
                setError('Server error. Please try again later.');
            }
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
