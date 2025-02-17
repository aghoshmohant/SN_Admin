import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"; // Import CSS
import { Bell, User } from "lucide-react"; // Icons for notifications and profile
import { Link } from "react-router-dom";
export default function AdminHome() {
  const navigate = useNavigate();
  
  // Sample Authority Data
  const [authorities, setAuthorities] = useState([
    { 
      id: 1, 
      name: "Neeraj", 
      role: "Collector", 
      location: "Kozhikode",
      email: "neeraj@example.com",
      phone: "+91 9876543210",
      designation: "District Officer",
      department: "Disaster Management",
      employeeId: "EMP12345",
      districtOffice: "Kozhikode",
      profilePhoto: "https://via.placeholder.com/100", 
      idProofPhoto: "https://via.placeholder.com/200"
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      role: "Volunteer Manager", 
      location: "Kozhikode",
      email: "jane@example.com",
      phone: "+91 1234567890",
      designation: "Volunteer Head",
      department: "Relief Operations",
      employeeId: "EMP67890",
      districtOffice: "Kozhikode",
      profilePhoto: "https://via.placeholder.com/100", 
      idProofPhoto: "https://via.placeholder.com/200"
    }
  ]);

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Remove Administrator</a></li>
          <li><a href="#">Logout</a></li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navbar */}
        <div className="top-bar">
          <h3>Admin Panel Management</h3>
          <div className="top-icons">
            <span className="icon"><Bell size={20} /> Notifications</span>
            <Link to="/profile" className="profile-link">
            <span className="icon"><User size={20} /> Profile</span>
            </Link>
          </div>
        </div>

        <a href="/verify">
          <button className="new-request">New Request</button>
        </a>

        {/* Authorities List */}
        <div className="authority-list">
          {authorities.map((auth) => (
            <div className="authority-card" key={auth.id}>
              <div className="profile-placeholder"></div>
              <div className="authority-info">
                <h4>{auth.name}</h4>
                <p>{auth.role}</p>
                <p>{auth.location}</p>
              </div>
              <div className="action-buttons">
                {/* Navigate to AuthorityDetails with state */}
                <button 
                  className="view-btn" 
                  onClick={() => navigate("/authority-details", { state: { authority: auth } })}
                >
                  View
                </button>
                <button className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
