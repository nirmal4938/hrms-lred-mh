import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const SocialLinks = () => {
    const [facebookUrl, setFacebookUrl] = useState('');
    const [twitterUrl, setTwitterUrl] = useState('');
    const [instagramUrl, setInstagramUrl] = useState('');
    const [linkedInUrl, setLinkedInUrl] = useState('');

    const handleFacebookUrlChange = (e:any) => {
        setFacebookUrl(e.target.value);
    }

    const handleTwitterUrlChange = (e:any) => {
        setTwitterUrl(e.target.value);
    }

    const handleInstagramUrlChange = (e:any) => {
        setInstagramUrl(e.target.value);
    }

    const handleLinkedInUrlChange = (e:any) => {
        setLinkedInUrl(e.target.value);
    }

    return (
        <>
            <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3 gap-3">
                <div className="font-bold text-lg">Social Media Links</div>
                
        
                <div>
                    <div className='font-semibold'>
                        Facebook URL
                    </div>
                    <div className="flex items-center relative">
                        <input
                            type="text"
                            placeholder="Facebook URL"
                            value={facebookUrl}
                            onChange={handleFacebookUrlChange}
                            className="w-full border rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute left-3">
                            <FaFacebook />
                        </span>
                    </div>
                </div>

             
                <div>
                    <div className='font-semibold'>
                        Twitter URL
                    </div>
                    <div className="flex items-center relative">
                        <input
                            type="text"
                            placeholder="Twitter URL"
                            value={twitterUrl}
                            onChange={handleTwitterUrlChange}
                            className="w-full border rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute left-3">
                            <FaTwitter />
                        </span>
                    </div>
                </div>

               
                <div>
                    <div className='font-semibold'>
                        Instagram URL
                    </div>
                    <div className="flex items-center relative">
                        <input
                            type="text"
                            placeholder="Instagram URL"
                            value={instagramUrl}
                            onChange={handleInstagramUrlChange}
                            className="w-full border rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute left-3">
                            <FaInstagram />
                        </span>
                    </div>
                </div>

                <div>
                    <div className='font-semibold'>
                        LinkedIn URL
                    </div>
                    <div className="flex items-center relative">
                        <input
                            type="text"
                            placeholder="LinkedIn URL"
                            value={linkedInUrl}
                            onChange={handleLinkedInUrlChange}
                            className="w-full border rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                        />
                        <span className="absolute left-3">
                            <FaLinkedin />
                        </span>
                    </div>
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

export default SocialLinks;
