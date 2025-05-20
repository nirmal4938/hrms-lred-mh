import React from 'react';

const Settings = () => {
  return (
    <>
      <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3">
        <div className="flex flex-col gap-2 w-full">
          <div className="text-2xl font-bold">Settings</div>
          <div className="flex justify-start w-full">
            <div className="flex flex-col w-full">
              <div className="text-sm">Time zone</div>
              <div className="font-bold text-sm">(GMT-+05:30) Asia/Kolkata</div>
            </div>
            <div className="flex flex-col w-full">
              <div className="text-sm">Date Format</div>
              <div className="font-bold text-sm">YY-MM-DD</div>
            </div>
            <div className="flex flex-col w-full">
              <div className="text-sm">Time Format</div>
              <div className="font-bold text-sm">12 hours</div>
            </div>
            <div className="flex flex-col w-full">
              <div className="text-sm">Currency</div>
              <div className="font-bold text-sm">INR</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
