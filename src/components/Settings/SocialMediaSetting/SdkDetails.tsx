import React, { useState } from 'react';
import { FaTwitter, FaLinkedin, FaEye, FaFacebook } from 'react-icons/fa';

const SdkDetails = () => {
    const [toggleState, setToggleState] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const [facebookId, setFacebookId] = useState('');
    const [password, setPassword] = useState('');
    const [twitterId, setTwitterId] = useState('');
    const [linkedInId, setLinkedInId] = useState('');

    const handleToggleChange = () => {
        setToggleState(!toggleState);
    }

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const handleFacebookIdChange = (e:any) => {
        setFacebookId(e.target.value);
    }

    const handleTwitterIdChange = (e:any) => {
        setTwitterId(e.target.value);
    }

    const handleLinkedInIdChange = (e:any) => {
        setLinkedInId(e.target.value);
    }

    const handlePasswordChange = (e:any) => {
        setPassword(e.target.value);
    }

    return (
        <>
            <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3 gap-3">
                <div className="font-bold text-lg">Social Media SDK Details</div>
                <div className='flex justify-between'>
                    <div className='font-semibold'>
                        Facebook
                    </div>
                    <div className={`relative inline-block w-10 h-6 rounded-full bg-gray-300 ${toggleState ? 'bg-green-500' : ''} overflow-hidden cursor-pointer`} onClick={handleToggleChange}>
                        <div className={`absolute left-0 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${toggleState ? 'translate-x-full' : ''}`}></div>
                    </div>
                </div>
         
                <div className="flex items-center relative">
                    <input
                        type="text"
                        placeholder="Facebook ID"
                        value={facebookId}
                        onChange={handleFacebookIdChange}
                        className="w-full border rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                    />
                    <span className="absolute left-3">
                        <FaFacebook />
                    </span>
                </div>
              
                <div className="flex items-center relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full border rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                    />
                    <span className="absolute left-3">
                        <FaFacebook />
                    </span>
                    <span className="absolute right-3 cursor-pointer" onClick={handlePasswordVisibility}>
                        <FaEye />
                    </span>
                </div>
              
                <div className='font-semibold'>
                    Twitter
                </div>
               
                <div className="flex items-center relative">
                    <input
                        type="text"
                        placeholder="Twitter ID"
                        value={twitterId}
                        onChange={handleTwitterIdChange}
                        className="w-full border rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                    />
                    <span className="absolute left-3">
                        <FaTwitter />
                    </span>
                </div>
               
                <div className="flex items-center relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full border rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                    />
                    <span className="absolute left-3">
                        <FaTwitter />
                    </span>
                    <span className="absolute right-3 cursor-pointer" onClick={handlePasswordVisibility}>
                        <FaEye />
                    </span>
                </div>
         
                <div className='font-semibold'>
                    LinkedIn
                </div>
               
                <div className="flex items-center relative">
                    <input
                        type="text"
                        placeholder="LinkedIn ID"
                        value={linkedInId}
                        onChange={handleLinkedInIdChange}
                        className="w-full border rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                    />
                    <span className="absolute left-3">
                        <FaLinkedin />
                    </span>
                </div>
                
                <div className="flex items-center relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className="w-full border rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                    />
                    <span className="absolute left-3">
                        <FaLinkedin />
                    </span>
                    <span className="absolute right-3 cursor-pointer" onClick={handlePasswordVisibility}>
                        <FaEye />
                    </span>
                </div>
                <hr />
              <div className=" w-full flex justify-end">
                <button
                  type="submit"
                  className="flex bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </div>
        </>
    );
};

export default SdkDetails;
