import React, { useState } from "react";
import UserHeader from "components/header/User/Header";
import Sidebar from "components/sidebar/Sidebar";
import "./UserHeaderOutlet.scss"; // We'll create this for layout styles
import { Outlet } from "react-router-dom";

const UserHeaderOutletContent = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="user-layout">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="user-main">
                <UserHeader
                    sidebarOpen={isOpen}
                    setSidebarOpen={setIsOpen}
                />

                <div className="user-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default UserHeaderOutletContent;
