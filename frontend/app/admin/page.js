'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Admin(){
  const [sensorData, setSensorData] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'sensors'
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const api = process.env.NEXT_PUBLIC_API || 'http://localhost:5000/api';
        
        if(activeTab === 'users') {
          const res = await axios.get(api + '/auth/users', { 
            headers: { Authorization: 'Bearer ' + token } 
          });
          setUsers(res.data);
        } else {
          const res = await axios.get(api + '/sensor/all', { 
            headers: { Authorization: 'Bearer ' + token } 
          });
          setSensorData(res.data);
        }
      } catch(err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if(token) fetchData();
  }, [activeTab, token]);

  return (
    <section>
      <h2>Admin Panel</h2>
      
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('users')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'users' ? '#667eea' : '#e0e0e0',
            color: activeTab === 'users' ? 'white' : '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          All Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('sensors')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'sensors' ? '#667eea' : '#e0e0e0',
            color: activeTab === 'sensors' ? 'white' : '#333',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Sensor Data ({sensorData.length})
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="card">
          <h3>All Registered Users</h3>
          {loading ? (
            <p>Loading users...</p>
          ) : users.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f5f5f5' }}>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Name</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Email</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Phone</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Phone Verified</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Role</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Google Sign-in</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid #ddd' }}>Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px' }}>{user.name || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>{user.email || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>{user.phone || 'N/A'}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          background: user.phoneVerified ? '#d4edda' : '#f8d7da',
                          color: user.phoneVerified ? '#155724' : '#721c24',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {user.phoneVerified ? '✓ Verified' : '✗ Not Verified'}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: '4px',
                          background: user.role === 'admin' ? '#667eea' : '#e0e0e0',
                          color: user.role === 'admin' ? 'white' : '#333',
                          fontSize: '12px',
                          fontWeight: '600'
                        }}>
                          {user.role || 'farmer'}
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        {user.googleId ? (
                          <span style={{ color: '#4285F4', fontWeight: '600' }}>✓ Yes</span>
                        ) : (
                          <span style={{ color: '#999' }}>No</span>
                        )}
                      </td>
                      <td style={{ padding: '12px', fontSize: '12px', color: '#666' }}>
                        {new Date(user.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No users found or unauthorized (login as admin)</p>
          )}
        </div>
      )}

      {activeTab === 'sensors' && (
        <div className="card">
          <h3>Sensor Data</h3>
          {loading ? (
            <p>Loading sensor data...</p>
          ) : sensorData.length > 0 ? (
            <div>
              {sensorData.slice(0, 20).map((d, i) => (
                <div key={i} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
                  <strong>{d.user?.name || 'Unknown'}</strong> — {new Date(d.createdAt).toLocaleString()}<br/>
                  Moisture: {d.moisture}%, Temp: {d.temperature}°C, pH: {d.ph}
                </div>
              ))}
            </div>
          ) : (
            <p>No sensor data or unauthorized (login as admin)</p>
          )}
        </div>
      )}
    </section>
  )
}
