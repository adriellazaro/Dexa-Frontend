import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:3000';

function Register() {
    const [form, setForm] = useState({});
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

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const register = async () => {
        try {
        await axios.post(`${API}/auth/register`, form);
            alert('Register success');
            navigate('/login');
        } catch (err) {
            alert('Failed to register');
        }
    };

    return (
        <div style={{ 
            background: '#f5f6fa',
            minHeight: '100vh',
            color: '#333',
            padding: 20
        }}>
            <h1 style={{color: '#333'}}>Create Your Account</h1>

            <input style={inputStyle} name="name" placeholder="Name" onChange={handleChange} />
            <br />
            <input style={inputStyle} name="email" placeholder="Email" onChange={handleChange} />
            <br />
            <input style={inputStyle} name="password" type="password" placeholder="Password" onChange={handleChange} />

            <br /><br />

            <button style={buttonStyle} onClick={() => navigate('/login')}>Back</button>
            <button style={buttonStyle} onClick={register}>Register</button>
        </div>
    );
}

export default Register;