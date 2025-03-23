import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"; // Add styles in this file

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <button className="back-btn" onClick={() => navigate(-1)}>
                &#8592; Back
            </button>
        </div>
    );
};

export default Navbar;