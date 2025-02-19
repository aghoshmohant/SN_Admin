import React, { useState } from 'react';
import axios from '../config/axiosconfig';
import './Login.css';
import Logo from '../image/SafeNet Logo no bg.png';

const Login = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClick = () => {
    setShowForm(true);
    setShowSection(false);
    setTimeout(() => setShowSection(true), 1000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/login', { username: username, password });

      console.log("Login successful:", response.data);
      localStorage.setItem('token', response.data.token);

      window.location.href = "/home";

    } catch (error) {
      console.log(error)
      console.error("Login error:", error.response?.data?.error || "Something went wrong" );
      setError(error.response?.data?.error || "Invalid credentials");
    }
  };

  return (
    <div className={`login ${!showForm ? 'hide-login' : ''}`}>
      <form className={`login-container ${!showForm ? 'hide-form' : ''}`} onSubmit={handleSubmit}>
        <img src={Logo} alt="Logo" onClick={handleClick} />
        <div className={`input-container ${!showSection ? 'hide-section' : ''}`}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </p>
          <p>
            <input type="submit" value="Log in"  />
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
