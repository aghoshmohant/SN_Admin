import React from "react";
import { useLocation } from "react-router-dom";
import "./AuthorityDeatils.css"; // Import CSS
import Navbar from "./Navbar";

const AuthorityDetails = () => {
    const location = useLocation();
    console.log("location state :",location.state);
    const authority = location.state?.authority; // Get data from navigation state

    if (!authority) {
        return <div className="error">No authority details found.</div>;
    }

    return (
        <div className="authority-details-container">
            <Navbar/>
            <div className="card">
                <div className="profile-section">
                    <img src={authority.profilePhoto} alt="Profile" className="profile-photo" />
                    <h2>{authority.name}</h2>
                    <p>{authority.designation}</p>
                </div>

                <div className="details-section">
                    <div className="info-row">
                        <strong>Email:</strong> <span>{authority.email}</span>
                    </div>
                    <div className="info-row">
                        <strong>Phone:</strong> <span>{authority.phone}</span>
                    </div>
                    <div className="info-row">
                        <strong>Department:</strong> <span>{authority.department}</span>
                    </div>
                    <div className="info-row">
                        <strong>Employee ID:</strong> <span>{authority.employeeId}</span>
                    </div>
                    <div className="info-row">
                        <strong>District Office:</strong> <span>{authority.districtOffice}</span>
                    </div>
                    <div className="id-proof-section">
                        <strong>ID Proof:</strong>
                        <img src={authority.idProofPhoto} alt="ID Proof" className="id-proof-photo" />
                    </div>
                </div>
                <div>
                <button className="delete-btn">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default AuthorityDetails;
