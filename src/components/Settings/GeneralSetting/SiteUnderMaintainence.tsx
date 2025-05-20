import React, { useState } from 'react';
import { AiFillProduct, AiOutlineCalendar } from 'react-icons/ai'; 
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';  

interface CustomDatePickerInputProps {
    value: any;
    onClick: () => void;
}

const CustomDatePickerInput: React.FC<CustomDatePickerInputProps> = ({ value, onClick }) => (
    <div className="relative">
        <input
            type="text"
            value={value}
            onClick={onClick}
            placeholder="Select Date"
            className="border border-gray-300 p-1 pl-5 rounded outline-none"
            readOnly
        />
        <div className="absolute top-0 right-0 h-full flex items-center px-2 pointer-events-none">
            <AiOutlineCalendar className="h-6 w-6 text-gray-400 cursor-pointer" onClick={onClick} />
        </div>
    </div>
);

const SiteUnderMaintenance = () => {
    const [selectedLanguage, setSelectedLanguage] = useState("English(India)");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [toggleState, setToggleState] = useState(false);
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedLanguage(event.target.value);
    }

    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    }

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date);
    }
   
    const handleToggleChange = () => {
        setToggleState(!toggleState);
    }

    return (
        <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3 gap-3">
            <div className='flex justify-between'>
                <div className="flex items-center gap-1">
                    <AiFillProduct />
                    <div className="font-bold">Site Under Maintenance</div>
                </div>
                <div className='flex items-center gap-2'>
                <div className="flex px-2 py-2 border border-r-2 border-gray-300 rounded">
                    <div style={{ borderRight: "1px solid #ccc", paddingRight: "8px" }}>
                        Lang
                    </div>
                    <select
                        className="outline-none"
                        value={selectedLanguage}
                        onChange={handleLanguageChange}
                    >
                        <option value="English(India)">English(India)</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                    </select>
                </div>
                <div className={`relative inline-block w-10 h-6 rounded-full bg-gray-300 ${toggleState ? 'bg-green-500' : ''} overflow-hidden cursor-pointer`} onClick={handleToggleChange}>
                            <div className={`absolute left-0 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${toggleState ? 'translate-x-full' : ''}`}></div>
                        </div>
                </div>
               
            </div>

            <div className='text-xs'>
                Set the website status to offline. Display the site offline messages.<span className='text-red-500'>*</span>
            </div>
            <div className="flex gap-12">
                <DatePicker
                    selected={startDate}
                    onChange={handleStartDateChange}
                    customInput={<CustomDatePickerInput value={startDate} onClick={() => {}} />}
                />
                <DatePicker
                    selected={endDate}
                    onChange={handleEndDateChange}
                    customInput={<CustomDatePickerInput value={endDate} onClick={() => {}} />}
                />
            </div>
            <div className="mt-2">
                <label htmlFor="offlineMessage" className="block text-sm font-bold mb-1">Offline Message<span className='text-red-500'>*</span></label>
                <textarea
                    id="offlineMessage"
                    className="w-full border rounded-md py-2 pl-3 pr-5 focus:outline-none focus:border-blue-500"
                    rows={4}
                    placeholder="Enter offline message here..."
                />
            </div>
            <hr/>
            <div className='flex justify-end'>
                <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default SiteUnderMaintenance;
