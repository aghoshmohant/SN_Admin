import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Logo from '../image/SafeNet Logo no bg.png';

const Profile = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/'); // Redirect to login if no token
    }
  }, [navigate]);

  const handleUpdatePassword = async (event) => {
    event.preventDefault();

    if (!oldPassword || !newPassword) {
      setError("Both fields are required");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("Unauthorized access. Please log in again.");
        navigate('/');
        return;
      }

      const response = await axios.post('http://localhost:5000/api/updatepassword', {
        oldPassword,
        newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessage(response.data.message);
      setError('');
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
      setMessage('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleBack = () => {
    navigate('/home'); // Change to your actual home/dashboard route
  };

  return (
    <div className="profile-container">
      {/* Navigation Bar at the Top */}
      <nav className="navbar">
        <button className="back-btn" onClick={handleBack}>⬅ Back</button>
      </nav>

      {/* Centered Profile Box */}
      <div className="profile-box">
        <img src={Logo} alt="Logo" className="profile-logo" />
        <h2>Update Password</h2>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <form onSubmit={handleUpdatePassword}>
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="update-btn">Update Password</button>
        </form>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
