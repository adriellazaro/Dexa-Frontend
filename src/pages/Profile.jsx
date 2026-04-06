import { useState, useEffect } from 'react';
import axios from 'axios';

const API = 'http://localhost:3000';

function Profile() {
    const token = localStorage.getItem('token');

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

    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        photo: '',
        password: '',
    });

    const getProfile = async () => {
        try {
            const res = await axios.get(`${API}/user/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setForm({
                name: res.data.name || '',
                email: res.data.email || '',
                phone: res.data.phone || '',
                photo: res.data.photo || '',
                password: '',
            });
        } catch (err) {
            console.error(err);
            alert('Failed to load profile');
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const updateProfile = async () => {
        try {
            await axios.put(`${API}/user/profile`, form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Profile updated');
        } catch (err) {
            alert('Update failed');
        }
    };

    return (
        <div style={{ 
            background: '#f5f6fa',
            minHeight: '100vh',
            color: '#333',
            padding: 20
        }}>
            <h1 style={{color: '#333'}}>Profile</h1>

            <input style={inputStyle}
                name="name"
                placeholder="Name"
                value={form.name}
                disabled
            />
            <br />

            <input style={inputStyle}
                name="email"
                placeholder="Email"
                value={form.email}
                disabled
            />
            <br />

            <input style={inputStyle}
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
            />
            <br />

            <input style={inputStyle}
                name="photo"
                placeholder="Photo URL"
                value={form.photo}
                onChange={handleChange}
            />
            <br />

            <input style={inputStyle}
                name="password"
                type="password"
                placeholder="New Password"
                value={form.password}
                onChange={handleChange}
            />
            <br /><br />

            <button style={buttonStyle} onClick={() => window.location.href = '/'}>Back to Dashboard</button>
            <button style={buttonStyle} onClick={updateProfile}>Update Profile</button>
        </div>
    );
}

export default Profile;