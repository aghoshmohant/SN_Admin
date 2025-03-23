import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./home.css";

export default function AdminHome() {
  const navigate = useNavigate();
  const [authorities, setAuthorities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    const fetchAuthorities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/adminhome");
        setAuthorities(response.data);
      } catch (error) {
        setError("Error fetching authorities. Please try again.");
        console.error("Fetch error:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorities();
  }, [navigate]);

  return (
    <div className="admin-container">
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </aside>

      <div className="main-content">
        <div className="top-bar">
          <h3>Admin Panel Management</h3>
          <div className="top-icons">
            <Link to="/profile" className="profile-link">
              <span className="icon"><User size={20} />Profile</span>
            </Link>
          </div>
        </div>

        <div className="authority-list">
          <button className="verify-btn" onClick={() => navigate("/verify")}>Verification</button>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>{error}</p>
          ) : authorities.length > 0 ? (
            <table className="authority-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>District</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {authorities.map((auth, index) => (
                  <tr key={auth.id}>
                    <td>{index + 1}</td>
                    <td>{auth.profile_photo ? <img src={auth.profile_photo} alt="Profile" className="profile-photo" /> : "No Image"}</td>
                    <td>{auth.name || "N/A"}</td>
                    <td>{auth.email || "N/A"}</td>
                    <td>{auth.phone_number || "N/A"}</td>
                    <td>{auth.district || "N/A"}</td>
                    <td>
                      <button className="view-btn" onClick={() => navigate(`/authority-details/${auth.id}`)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No verified authorities available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
