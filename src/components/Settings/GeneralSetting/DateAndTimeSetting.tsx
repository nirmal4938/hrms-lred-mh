import React, { useState } from 'react';
import { AiOutlineClockCircle } from "react-icons/ai";

const DateAndTimeSetting = () => {
    const [selectedTimeZone, setSelectedTimeZone] = useState('');
    const [selectedDateFormat, setSelectedDateFormat] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState('');
    const [selectedTimeFormat, setSelectedTimeFormat] = useState('');

    const handleTimeZoneChange = (event:any) => {
        setSelectedTimeZone(event.target.value);
    }

    const handleDateFormatChange = (event:any) => {
        setSelectedDateFormat(event.target.value);
    }

    const handleCurrencyChange = (event:any) => {
        setSelectedCurrency(event.target.value);
    }

    const handleTimeFormatChange = (event:any) => {
        setSelectedTimeFormat(event.target.value);
    }

    return (
        <>
            <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3 gap-3">
                <div className="flex items-center gap-1">
                    <AiOutlineClockCircle />
                    <div className="font-bold">Date And Time Settings</div>
                </div>

                <div >
                    <label htmlFor="timeZone" className="block font-semibold mb-1">Time Zone<span className='text-red-500'>*</span></label>
                    <select id="timeZone" className="w-full border rounded-md py-2 pl-3 pr-5 focus:outline-none focus:border-blue-500" value={selectedTimeZone} onChange={handleTimeZoneChange}>
                        <option value="GMT">GMT</option>
                        <option value="UTC">UTC</option>
                 
                    </select>
                </div>

                <div >
                    <label htmlFor="dateFormat" className="block font-semibold mb-1">Date Format<span className='text-red-500'>*</span></label>
                    <select id="dateFormat" className="w-full border rounded-md py-2 pl-3 pr-5 focus:outline-none focus:border-blue-500" value={selectedDateFormat} onChange={handleDateFormatChange}>
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      
                    </select>
                </div>

                <div >
                    <label htmlFor="currency" className="block font-semibold mb-1">Currency<span className='text-red-500'>*</span></label>
                    <select id="currency" className="w-full border rounded-md py-2 pl-3 pr-5 focus:outline-none focus:border-blue-500" value={selectedCurrency} onChange={handleCurrencyChange}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      
                    </select>
                </div>

                <div>
                    <label htmlFor="timeFormat" className="block font-semibold mb-1">Time Format<span className='text-red-500'>*</span></label>
                    <select id="timeFormat" className="w-full border rounded-md py-2 pl-3 pr-5 focus:outline-none focus:border-blue-500" value={selectedTimeFormat} onChange={handleTimeFormatChange}>
                        <option value="12-hour">12-hour</option>
                        <option value="24-hour">24-hour</option>
                       
                    </select>
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

export default DateAndTimeSetting;
