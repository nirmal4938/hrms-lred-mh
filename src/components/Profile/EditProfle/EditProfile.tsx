import React, { useState } from 'react';
import Sidebar from '../../Sidebar/Sidebar';
import { AiOutlineBell, AiOutlineLogout } from 'react-icons/ai';
import EditInfo from './EditInfo';
import EditPersonalInf from './EditPersonalInf';
import EditSocialInfo from './EditSocialInfo';
import EditSettings from './EditSettings';
import TopNavBar from '../../Navbar/TopNavbar';



const EditProfile = () => {
    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
    };
    return (
        <>
             <div className="flex h-screen">
             <div className={`transition-all duration-300 ${showSidebar ? 'w-64' : 'w-12'}`}>
                    <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
                </div>
                <div className="flex-1 flex flex-col  gap-4">
                    <TopNavBar toggleSidebar={toggleSidebar} showSidebar={showSidebar} />
          <hr />
          <div className='px-4'>
          <div className=' bg-white rounded-lg p-4 gap-4 flex flex-col'>
          <div className='text-2xl font-bold'>
                      Edit Profile
                    </div>
          <EditInfo/>
         <EditPersonalInf/>
         <EditSocialInfo/>
         <EditSettings/>
         
       <div className='flex justify-end gap-3'>
        <button className='bg-gray-400 text-white rounded-md p-2'>
          Cancel
        </button>
        <button className='bg-blue-500 text-white rounded-md p-2'>
          Save
        </button>
        <button>

        </button>
       </div>
          </div>
          </div>
          </div>
         
        </div>
        </>
    );
};

export default EditProfile;
