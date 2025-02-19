import React, { useState, useEffect } from 'react';
import axios from '../config/axiosconfig'; // Ensure this points to the correct API config
import './AdminProfile.css';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({ id: '', name: '' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin-profile'); // Adjust API path
        setAdmin(response.data); 
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        setMessage("Failed to load admin profile");
      }
    };

    fetchAdmin();
  }, []);

  // ✅ Handle Password Reset
  const handlePasswordReset = async () => {
    if (!newPassword || !confirmPassword) {
      setMessage('Please enter a new password.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.put('http://localhost:5000/api/admin-profile/update-password', {
        id: admin.id, // Send admin ID
        newPassword: newPassword
      });

      setMessage(response.data.message);
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Failed to update password.");
    }
  };

  return (
    <div className="admin-profile-container">
      <h2>Admin Profile</h2>
      <div className="profile-details">
        <div className="detail-row">
          <label htmlFor="adminName">Admin Name:</label>
          <input
            type="text"
            id="adminName"
            value={admin.name}
            readOnly // Prevent editing admin name
          />
        </div>
        <div className="password-reset">
          <h3>Reset Password</h3>
          <div className="detail-row">
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="detail-row">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button onClick={handlePasswordReset}>Reset Password</button>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
