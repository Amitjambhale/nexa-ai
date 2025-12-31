import React from "react";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import "./Header.scss";

const UserHeader = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <header className={`user-header ${sidebarOpen ? "shifted" : ""}`}>
            <div className="left">
                <button
                    className="menu-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <FaBars />
                </button>
            </div>
            <div className="right">
                <div className="icon-wrapper">
                    <FaBell className="icon" />
                    <span className="badge">3</span>
                </div>
                <div className="profile">
                    <FaUserCircle className="avatar" />
                    <span className="username">Marcus White</span>
                </div>
            </div>
        </header>
    );
};

export default UserHeader;
