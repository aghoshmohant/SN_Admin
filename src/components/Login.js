import React, { useState } from 'react';
import axios from '../config/axiosconfig'; // Import axios instance
import './Login.css';
import Logo from '../image/SafeNet Logo no bgroun;t.png'

const Login = () => {
  const [showForm, setShowForm] = useState(false);
  const [showSection, setShowSection] = useState(false);
  const [error, setError] = useState('');

  const handleClick = () => {
    setShowForm(true);
    setShowSection(false);
    setTimeout(() => {
      setShowSection(true);
    }, 1000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    try {
        const response = await axios.post('/admin/login', { name: username, password });

        console.log("Login successful:", response.data);

        // Save token to localStorage
        localStorage.setItem('token', response.data.token);

        // Redirect to home page (or dashboard)
        window.location.href = "/home"; // Change to your actual home page path

    } catch (error) {
        console.error("Login error:", error.response?.data?.error || "Something went wrong");
        setError(error.response?.data?.error || "Invalid credentials");
    }
};

  return (
    <div className={`login ${!showForm ? 'hide-login' : ''}`}>
      <form className={`login-container ${!showForm ? 'hide-form' : ''}`} onSubmit={handleSubmit}>
        <img src={Logo} alt="" onClick={handleClick} />
        <div className={`input-container ${!showSection ? 'hide-section' : ''}`}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p>
            <input type="text" placeholder="Username" name="username" required />
          </p>
          <p>
            <input type="password" placeholder="Password" name="password" required />
          </p>
          <p>
            <input type="submit" value="Log in" />
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
