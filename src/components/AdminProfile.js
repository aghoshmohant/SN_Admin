import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  // ... other imports
  IconButton, // Import IconButton
  // ...
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import axios from '../config/axiosconfig';



const AdminProfile = () => {
  const [admin, setAdmin] = useState({ id: '', name: '' });
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin-profile'); 
        setAdmin(response.data); 
      } catch (error) {
        console.error("Error fetching admin profile:", error);
        setMessage("Failed to load admin profile");
      }
    };

    fetchAdmin();
  }, []);

 
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
        id: admin.id,
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

  const handleBack = () => {

    window.history.back();
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: '#2E7D32' }}>
        <Toolbar>
        <IconButton onClick={handleBack} color="inherit" aria-label="back"> {/* Back button */}
              <ArrowBackIcon />
            </IconButton>
          <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white', flexGrow: 1 }}
          align='center'>
            Admin Profile
          </Typography>
        </Toolbar>
      </AppBar>

      <Container component="main" maxWidth="xs" sx={{ mt: 8, mb: 2, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', p: 4, border: '1px solid #ccc', borderRadius: '5px' }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
            Admin Name:
          </Typography>
          <Typography variant="h6" component="h3" gutterBottom>
            aswanth
          </Typography>

          <Box component="form" noValidate onSubmit={handlePasswordReset} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="newPassword"
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, backgroundColor: '#1976D2', color: 'white', fontWeight: 'bold' }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminProfile;
