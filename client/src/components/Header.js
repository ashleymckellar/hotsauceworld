
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserProvider.js';
import '../Header.css'; // Make sure to create this CSS file

function Header() {
    const navigate = useNavigate();
    const { token, logout } = useContext(UserContext);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-links">
                    <Link to="/" className="link">Home</Link>
                    <Link to="/profile" className="link">Profile</Link>
                    <Link to="/saucelist" className="link">Sauce List</Link>
                    <Link to="/search" className="link">Sauce Search</Link>
                    <Link to="/random" className="link">Random Sauce</Link>
                    {token && <button className="logout-btn" onClick={logout}>Logout</button>}
                </div>
            </div>
        </nav>
    );
};

export default Header;
