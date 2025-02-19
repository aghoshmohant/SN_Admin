import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminHome() {
  const navigate = useNavigate();
  const [authorities, setAuthorities] = useState([]);

  // Fetch authorities from API
  useEffect(() => {
    const fetchAuthorities = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/home");
            console.log("Fetched Authorities:", response.data); 
            setAuthorities(response.data.filter(auth => auth.verified));
        } catch (error) {
            console.error("Error fetching authorities:", error);
        }
    };
    fetchAuthorities();
}, []);

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><a href="/home">Home</a></li>
          
          <li><a href="/">Logout</a></li>
        </ul>
      </aside>

      <div className="main-content">
        <div className="top-bar">
          <h3>Admin Panel Management</h3>
          <div className="top-icons">
            <Link to="/profile" className="profile-link">
              <span className="icon"><User size={20} /> Profile</span>
            </Link>
          </div>
        </div>

        <a href="/verify">
          <button className="new-request">New Request</button>
        </a>

        <div className="authority-list">
          {authorities.length > 0 ? (
            authorities.map((auth) => (
              <div className="authority-card" key={auth.id}>
                <div className="profile-placeholder"></div>
                <div className="authority-info">
                  <h4>{auth.name}</h4>
                  <p>{auth.designation}</p>
                  <p>{auth.district}</p>
                </div>
                <div className="action-buttons">
                  <button 
                    className="view-btn" 
                    onClick={() => navigate("/authority-details", { state: { authority: auth } })}
                  >
                    View
                  </button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p>No verified authorities available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
