import React, { useState } from "react";
import "./style.css"; // Ensure these styles exist
//import "./style2.css";
import Backbutton from '../icons/back-button.png';
import Logo from '../image/SafeNet Logo no bg.png';

const VolunteerVerification = () => {
  // Sample Data (Replace with actual API data)
  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone_number: "1234567890",
      office_address: "XYZ Street",
      designation: "Manager",
      department: "Relief",
      employee_id: "EMP123",
      id_proof: "/images/id1.png",
      photo: "/images/photo1.png",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone_number: "9876543210",
      office_address: "ABC Avenue",
      designation: "Coordinator",
      department: "Rescue",
      employee_id: "EMP456",
      id_proof: "/images/id2.png",
      photo: "/images/photo2.png",
    },
  ]);

  // Function to show image modal
  const showImageModal = (imageSrc) => {
    alert(`Show Image: ${imageSrc}`); // Replace with modal logic
  };

  // Function to handle approve
  const authoVerify = (id) => {
    alert(`Approved user with ID: ${id}`);
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
                  <button className="reject-btn">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VolunteerVerification;
