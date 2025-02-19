import React, { useEffect, useState } from "react";
import axios from "../config/axiosconfig"; // Ensure axios instance is correctly configured
import "./style.css";
import Backbutton from "../icons/back-button.png";
import Logo from "../image/SafeNet Logo no bg.png";

const VolunteerVerification = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // ✅ Fetch data from backend
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await axios.get("http://192.168.20.10:5000/api/autho-verify");
        setData(response.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  // ✅ Show image in a modal (replace alert)
  const showImageModal = (imageSrc) => {
    window.open(imageSrc, "_blank");
  };

  // ✅ Approve volunteer
  const authoVerify = async (id) => {
    try {
      const response = await axios.put('http://192.168.20.10:5000/api/autho-verify', { id });
  
      console.log("Approval successful:", response.data);
      alert("Volunteer approved successfully!");
  
      // Refresh data after approval
      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error approving volunteer:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error approving volunteer");
    }
  };

  const authoReject = async (id) => {
    try {
      const response = await axios.delete(`http://192.168.20.10:5000/api/autho-verify/autho-reject/${id}`);
    
      console.log("Authority rejected:", response.data);
      alert("Authority rejected successfully!");
  
      // Remove the authority from the list after rejection
      setData((prevData) => prevData.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error rejecting authority:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Error rejecting authority");
    }
  };

  return (
    <div>
      {/* Navigation */}
      <div className="nav">
        <a href="/home">
          <div className="back">
            <img src={Backbutton} alt="logout" className="back-icon" />
          </div>
        </a>
        <div>
          <img src={Logo} alt="logo" className="logo" />
        </div>
      </div>

      {/* Main Content */}
      <div className="main">
        <h1 className="title">Volunteer Verification</h1>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <table className="table" border={1}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Office Address</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Employee ID</th>
                <th>ID Proof</th>
                <th>Photo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.office_address}</td>
                  <td>{user.designation}</td>
                  <td>{user.department}</td>
                  <td>{user.employee_id}</td>
                  <td>
                    <button onClick={() => showImageModal(user.id_proof)}>View ID Proof</button>
                  </td>
                  <td>
                    <button onClick={() => showImageModal(user.photo)}>View Photo</button>
                  </td>
                  <td>
                    <button className="approve-btn" onClick={() => authoVerify(user.id)}>Approve</button>
                    <button className="reject-btn" onClick={() => authoReject(user.id)}>Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default VolunteerVerification;
