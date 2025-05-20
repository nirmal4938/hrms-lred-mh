import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaSlack, FaCodepen } from 'react-icons/fa';

const SocialLinks = () => {
  return (
    <>
      <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3">
        <div className="flex flex-col gap-2 w-full">
          <div className="text-2xl font-bold">Social Links</div>
          <div className="flex flex-col gap-4 flex-wrap">
            <div className='flex justify-between w-full'>
              
                <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                <FaTwitter className=" text-blue-500" />
                  <div className="text-sm">Twitter</div>
                  </div>
                  <div className="font-bold text-sm text-blue-500">https://twitter.com/indianic</div>
              
              </div>
           
                <div className="flex flex-col">
                <div className="flex items-center gap-1">
                <FaFacebook className=" text-blue-500" />
                  <div className="text-sm">Facebook</div>
                  </div>
                  <div className="font-bold text-sm text-blue-500">https://facebook.com/example</div>
            
              </div>
             
                <div className="flex flex-col">
                <div className="flex items-center gap-1">
                <FaInstagram className=" text-pink-500" />
                  <div className="text-sm">Instagram</div>
                  </div>
                  <div className="font-bold text-sm text-blue-500">https://instagram.com/example</div>
               
              </div>
             
                <div className="flex flex-col">
                <div className="flex items-center gap-1">
                <FaSlack className=" text-red-500" />
                  <div className="text-sm">Slack</div>
                  </div>
                  <div className="font-bold text-sm text-blue-500">https://slack.com/example</div>
                </div>
            
            </div>

            
            
                <div className="flex flex-col">
                <div className="flex items-center gap-1">
                <FaCodepen className=" text-teal-500" />
                  <div className="text-sm">CodePen</div>
                  </div>
                  <div className="font-bold text-sm text-blue-500">https://codepen.io/example</div>
               
              </div>
            </div>
          </div>
 
      </div>
    </>
  );
};

export default SocialLinks;
