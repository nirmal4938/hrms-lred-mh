
import React, { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import UserProfile from './UserProfile';
import TopNavBar from '../../Navbar/TopNavbar';

const ViewProfile = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    return (
        <div className="flex h-screen">
            <div className={`transition-all duration-300 ${showSidebar ? 'w-64' : 'w-12'}`}>
                <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
            </div>
            <div className="flex flex-col flex-1">
                <TopNavBar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
                <div className='px-4 pt-5'>
                <div className="bg-white rounded-lg p-4 flex flex-col gap-3">
               
                    <UserProfile />
                
                </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProfile;
