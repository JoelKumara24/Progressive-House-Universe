import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.scss';

function AdminDashboard() {
  const [tracks, setTracks] = useState([]);
  const [form, setForm] = useState({ title: '', artist: '', audioUrl: '', releaseDate: '' });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem('phuAdminToken') || '');
  const [error, setError] = useState('');

  const isAuthenticated = !!token;

  useEffect(() => {
    if (isAuthenticated) fetchTracks();
  }, [isAuthenticated]);

  const fetchTracks = async () => {
    try {
      const res = await axios.get('https://phu-backend.onrender.com/api/tracks');
      setTracks(res.data);
    } catch (err) {
      console.error('Failed to fetch tracks', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://phu-backend.onrender.com/api/login', { email, password });
      sessionStorage.setItem('phuAdminToken', res.data.token);
      setToken(res.data.token);
      setError('');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('phuAdminToken');
    setToken('');
    setTracks([]);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://phu-backend.onrender.com/api/tracks', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm({ title: '', artist: '', audioUrl: '', releaseDate: '' });
      fetchTracks();
    } catch (err) {
      console.error('Failed to add track', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://phu-backend.onrender.com/api/tracks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTracks();
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-box">
        <h2>🔐 Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="admin@phu.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
          {error && <p className="error-msg">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>🎛️ Admin Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="artist" placeholder="Artist" value={form.artist} onChange={handleChange} required />
        <input name="audioUrl" placeholder="Audio URL" value={form.audioUrl} onChange={handleChange} required />
        <input name="releaseDate" placeholder="Release Date" value={form.releaseDate} onChange={handleChange} required />
        <button type="submit">Add Track</button>
      </form>

      <h3>📀 All Tracks</h3>
      <ul className="track-list">
        {tracks.map((track) => (
          <li key={track._id}>
            <strong>{track.title}</strong> — {track.artist}
            <button onClick={() => handleDelete(track._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
