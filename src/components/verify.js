import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import Backbutton from "../icons/back-button.png";

const DistrictHeadVerification = () => {
  const [districtHeads, setDistrictHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null); // State to manage the image in the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchDistrictHeads();
  }, [navigate]);

  const fetchDistrictHeads = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/district-verify");
      setDistrictHeads(response.data);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  // Function to open the modal with the selected image
  const showImageModal = (imageSrc) => {
    setModalImage(imageSrc);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalImage(null);
    setIsModalOpen(false);
  };

  const approveDistrictHead = async (id) => {
    try {
      await axios.put("http://localhost:5000/api/district-verify", { id });
      alert("District Head approved successfully!");

      // Remove approved district head from state
      setDistrictHeads((prev) => prev.filter((head) => head.id !== id));
    } catch (error) {
      alert("Error approving district head");
    }
  };

  const rejectDistrictHead = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/district-verify/reject/${id}`);
      alert("District Head rejected successfully!");

      // Remove rejected district head from state
      setDistrictHeads((prev) => prev.filter((head) => head.id !== id));
    } catch (error) {
      alert("Error rejecting district head");
    }
  };

  return (
    <div className="district-head-verification-container">
      <div className="nav">
        <a href="/home">
          <div className="back">
            <img src={Backbutton} alt="Back" className="back-icon" />
          </div>
        </a>
      </div>

      <div className="main">
        <h1 className="title">District Head Verification</h1>

        {loading ? (
          <p className="loading-message">Loading...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : districtHeads.length === 0 ? (
          <p className="no-data-message">No pending district head verifications.</p>
        ) : (
          <table className="district-head-table" border={1}>
            <thead>
              <tr className="table-header-row">
                <th className="table-header-index">#</th>
                <th className="table-header-name">Name</th>
                <th className="table-header-email">Email</th>
                <th className="table-header-phone">Phone</th>
                <th className="table-header-district">District</th>
                <th className="table-header-designation">Designation</th>
                <th className="table-header-department">Department</th>
                <th className="table-header-employee-id">Employee ID</th>
                <th className="table-header-office-address">Office Address</th>
                <th className="table-header-id-proof">ID Proof</th>
                <th className="table-header-photo">Photo</th>
                <th className="table-header-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {districtHeads.map((head, index) => (
                <tr key={head.id} className="table-data-row">
                  <td className="table-data-index">{index + 1}</td>
                  <td className="table-data-name">{head.name}</td>
                  <td className="table-data-email">{head.email}</td>
                  <td className="table-data-phone">{head.phone_number}</td>
                  <td className="table-data-district">{head.district}</td>
                  <td className="table-data-designation">{head.designation}</td>
                  <td className="table-data-department">{head.department}</td>
                  <td className="table-data-employee-id">{head.employee_id}</td>
                  <td className="table-data-office-address">{head.office_address}</td>
                  <td className="table-data-id-proof">
                    <button className="view-id-proof-btn" onClick={() => showImageModal(head.id_proof)}>View ID Proof</button>
                  </td>
                  <td className="table-data-photo">
                    <button className="view-photo-btn" onClick={() => showImageModal(head.profile_photo)}>View Photo</button>
                  </td>
                  <td className="table-data-actions">
                    <div className="action-buttons">
                      <button className="approve-btn" onClick={() => approveDistrictHead(head.id)}>Approve</button>
                      <button className="reject-btn" onClick={() => rejectDistrictHead(head.id)}>Reject</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div className="image-modal-overlay">
          <div className="image-modal">
            <button className="close-modal-btn" onClick={closeModal}>❌</button>
            <img src={modalImage} alt="Modal" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DistrictHeadVerification;