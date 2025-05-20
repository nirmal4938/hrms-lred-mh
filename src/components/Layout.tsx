import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import TopNavBar from "./Navbar/TopNavbar";

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-screen">
      <div className={`transition-all duration-300 ${showSidebar ? 'w-64' : 'w-12'}`}>
        <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <TopNavBar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
        <div className="px-4 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
