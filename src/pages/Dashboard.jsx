import axios from 'axios';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const API = 'http://localhost:3000';

function Dashboard() {
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);

    const token = localStorage.getItem('token');
    const user = token ? jwtDecode(token) : null;

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

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

    const checkIn = async () => {
        try {
            await axios.post(`${API}/attendance/check-in`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Check-in success');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to check in');
        }
    };

    const checkOut = async () => {
        try {
        await axios.post(`${API}/attendance/check-out`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Check-out success');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to check out');
        }
    };

    const getAttendance = async () => {
        try{
            const res = await axios.get(`${API}/attendance`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    ...(from && { from }),
                    ...(to && { to }),
                }
            });

            setData(res.data);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to load attendance');
        }
    };

    const getAllAttendance = async () => {
        try {
            const res = await axios.get(`${API}/attendance/all`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    ...(from && { from }),
                    ...(to && { to }),
                }
            });

            setAllData(res.data);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to load all attendance');
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <div style={{ 
            background: '#f5f6fa',
            minHeight: '100vh',
            color: '#333',
            padding: 20
        }}>
            <h1 style={{color: '#333'}}>Dashboard</h1>

            <p>Welcome, {user?.name || 'User'}!</p>
            <p>You are logged in as {(user?.position || 'Staff')}.</p>

            <button style={buttonStyle} onClick={() => window.location.href = '/profile'}>Profile</button>
            <br /><hr></hr><br />
            <button style={buttonStyle} onClick={checkIn}>Check In</button> - 
            <button style={buttonStyle} onClick={checkOut}>Check Out</button>
            <br />
            <br /><hr></hr><br />
            <h2 style={{color: '#333'}}>Attendance Records</h2>
            <div>
                <label>From: </label>
                <input style={inputStyle}
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />

                <label style={{ marginLeft: 10 }}>To: </label>
                <input style={inputStyle}
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />

                <button style={buttonStyle} onClick={() => { setFrom(''); setTo(''); }}>
                    Reset Filter
                </button>
            </div>

            <br />
            {user?.position === 'admin' && (
                <div>
                    <button style={buttonStyle} onClick={getAllAttendance}>
                        Load All Attendance (Admin)
                    </button>
                    <br /><br />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <table border="1" style={{
                            width: '100%',
                            borderCollapse: 'collapse',
                            marginTop: 20
                        }}>
                            <thead style={{
                                backgroundColor: '#f2f2f2',
                                color: '#333'
                            }}>
                                <tr>
                                    <th>Date</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                    <th>User</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allData.map((item) => (
                                    <tr key={item.id}>
                                        <td>{new Date(item.checkIn).toLocaleDateString()}</td>
                                        <td>{new Date(item.checkIn).toLocaleTimeString()}</td>
                                        <td>{item.checkOut ? new Date(item.checkOut).toLocaleTimeString() : '-'}</td>
                                        <td>{item.user?.name || '-'}</td>
                                        <td>{item.user?.email || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {user?.position !== 'admin' && (
                <div>
                    <button style={buttonStyle} onClick={getAttendance}>
                        Load Attendance
                    </button>
                    <br /><br />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <table border="1">
                            <thead style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                marginTop: 20
                            }}>
                                <tr>
                                    <th>Date</th>
                                    <th>Check In</th>
                                    <th>Check Out</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.id}>
                                        <td>{new Date(item.checkIn).toLocaleDateString()}</td>
                                        <td>{new Date(item.checkIn).toLocaleTimeString()}</td>
                                        <td>{item.checkOut ? new Date(item.checkOut).toLocaleTimeString() : '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <br />
            <button style={buttonStyle} onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;