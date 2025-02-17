import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/home';
import Verify from './components/verify';
import AuthorityDetails from './components/AuthorityDeatils';
import Profile from './components/AdminProfile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/authority-details" element={<AuthorityDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;