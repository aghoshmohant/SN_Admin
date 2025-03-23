import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthorityDetails.css";
import Navbar from "./Navbar";

const AuthorityDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [authority, setAuthority] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false); // State for modal

    useEffect(() => {
        const token = localStorage.getItem("token"); // Check for token

        if (!token) {
            navigate("/"); // Redirect to login if no token
            return;
        }

        const fetchAuthorityDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/authority/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }, // Send token in headers
                });
                setAuthority(response.data);
            } catch (error) {
                setError(error.response?.status === 404 ? "Authority not found." : "Error fetching authority details.");
            } finally {
                setLoading(false);
            }
        };

        fetchAuthorityDetails();
    }, [id, navigate]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this authority?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token"); // Retrieve token again
            await axios.delete(`http://localhost:5000/api/authority/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Authority deleted successfully!");
            navigate("/home"); // Redirect to home after deletion
        } catch (error) {
            setError("Error deleting authority.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!authority) return <div className="error">No authority details found.</div>;

    return (
        <div className="authority-details-container">
            <Navbar />
            <div className="card">
                <div className="profile-section">
                    <img src={authority.profile_photo || "/images/default-profile.png"} alt="Profile" className="profile-photo" />
                    <h2>{authority.full_name}</h2>
                    <p>{authority.designation}</p>
                </div>

                <div className="details-section">
                    <div className="info-row"><strong>Email:</strong> <span>{authority.email}</span></div>
                    <div className="info-row"><strong>Phone:</strong> <span>{authority.phone_number}</span></div>
                    <div className="info-row"><strong>Department:</strong> <span>{authority.department}</span></div>
                    <div className="info-row"><strong>Employee ID:</strong> <span>{authority.employee_id}</span></div>
                    <div className="info-row"><strong>District Office:</strong> <span>{authority.office_address}</span></div>

                    {/* Button to Open Modal */}
                    <div className="id-proof-section">
                        <strong>ID Proof:</strong>
                        <button className="id-proof-btn" onClick={() => setShowModal(true)}>View ID Proof</button>
                    </div>
                </div>

                <div className="actions-section">
                    <button className="delete-btn" onClick={handleDelete}>Delete</button>
                </div>
            </div>

            {/* Modal for ID Proof */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-btn" onClick={() => setShowModal(false)}>&times;</button>
                        <img src={authority.id_proof || "/images/default-id-proof.png"} alt="ID Proof" className="id-proof-photo" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthorityDetails;
