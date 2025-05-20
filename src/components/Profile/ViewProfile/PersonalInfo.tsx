import React from 'react';

const PersonalInfo = () => {
  return (
    <>
      <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3 py-6">
        <div className="flex flex-col gap-2 w-full">
          <div className="text-2xl font-bold">Personal Info</div>
          <div className="flex justify-between">
            <div className="flex flex-col w-full">
              <div className="text-sm">Date Of Birth</div>
              <div className="font-bold text-sm">1999-05-07</div>
            </div>
            <div className="flex flex-col w-full">
              <div className="text-sm">Gender</div>
              <div className="font-bold text-sm">Male</div>
            </div>
            <div className="flex flex-col w-full">
              <div className="text-sm">Website</div>
              <div className="font-bold text-sm">https://www.indianic.com/</div>
            </div>
            <div className="flex flex-col w-full">
              <div className="text-sm">Address</div>
              <div className="font-bold text-sm">201, Dev Arc, Sgr road, Ahemdabad</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
