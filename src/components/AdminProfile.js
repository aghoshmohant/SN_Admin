// AdminProfile.js
import React, { useState } from 'react';
import './AdminProfile.css';

const AdminProfile = () => {
  const [adminName, setAdminName] = useState('Admin User'); // Replace with actual admin name
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordReset = () => {
    if (newPassword === confirmPassword && newPassword !== '') {
        // Here you would typically make an API call to reset the password.
        // For this example, we'll just display a success message.
        setMessage('Password reset successfully!');
        setNewPassword('');
        setConfirmPassword('');
    } else if (newPassword === ''){
        setMessage('Please enter a new password')
    }
    else {
      setMessage('Passwords do not match.');
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
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            readOnly // Make it read-only for now
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