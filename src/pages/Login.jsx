import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:3000';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const buttonStyle = {
        padding: '8px 12px',
        margin: '5px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white'
    };

    const inputStyle = {
        width: '20%',
        padding: '10px',
        margin: '8px 0',
        borderRadius: '6px',
        border: '1px solid #ccc',
        backgroundColor: '#ffffff',
        color: '#000000',
        outline: 'none',
    };

    const login = async () => {
        try {
            const res = await axios.post(`${API}/auth/login`, {
                email,
                password,
            });

            localStorage.setItem('token', res.data.access_token);
            // alert('Login success');
            window.location.href = '/';
        } catch (err) {
            alert('Failed to login');
        }
    };

    return (
        <div style={{ 
            background: '#f5f6fa',
            minHeight: '100vh',
            color: '#333',
            padding: 20
        }}>
            <h1 style={{color: '#333'}}>Login</h1>

            <input style={inputStyle} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <br />
            <input style={inputStyle} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <br /><br />

            <button style={buttonStyle} onClick={login}>Login</button>

            <p>
                Don't have an account? <button style={buttonStyle} onClick={() => navigate('/register')}>Register</button>
            </p>
        </div>
    );
}

export default Login;