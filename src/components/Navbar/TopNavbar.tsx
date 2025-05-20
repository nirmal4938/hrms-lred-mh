import React from 'react';
import { AiOutlineDoubleLeft, AiOutlineDoubleRight, AiOutlineBell } from 'react-icons/ai';
import { FaRegUserCircle } from 'react-icons/fa';
import { LuLogOut } from "react-icons/lu";
import { NavLink } from 'react-router-dom';

interface Props {
    toggleSidebar: () => void; 
    showSidebar: boolean;
}

const TopNavBar: React.FC<Props> = ({ toggleSidebar, showSidebar }) => {

    return (
        <div className="bg-gray-900 text-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
            <div className="flex items-center">
                {showSidebar ? (
                    <AiOutlineDoubleLeft size={24} onClick={toggleSidebar} />
                ) : (
                    <AiOutlineDoubleRight size={24} onClick={toggleSidebar} />
                )}
            </div>
            
            <div className="flex items-center space-x-4 text-red-500 relative">
                <div className="relative text-gray-500 cursor-not-allowed">
                    <div className="text-gray-500 cursor-not-allowed">
                        <AiOutlineBell title='notifications' size={24} />
                    </div>
                    <div className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></div>
                </div>
                <div className="text-gray-500 cursor-not-allowed">
                    <FaRegUserCircle title='profile' size={24} />
                </div>
                <NavLink to="" className="hover:text-white transition-colors duration-200"
                onClick={async() => {
                    console.log('Logout clicked');
                    localStorage.clear();
                }}
                >
                    <LuLogOut title='logout' size={24} />
                </NavLink>
            </div>
        </div>
    );
};

export default TopNavBar;
