import React, { useState } from 'react';
interface Notification {
    title: string;
    text: string;
}

const NotificationCard: React.FC<Notification> = ({ title, text }) => {
    const [toggleState, setToggleState] = useState(false);
    const handleToggleChange = () => {
        setToggleState(!toggleState);
    }

    return (
        <div className="bg-purple-100 flex flex-col p-4 rounded-md gap-7 w-[20rem]">
            <div className='flex flex-col gap-1'>
            <h2 className="text-lg font-bold">{title}</h2>
            <p>{text}</p>
            </div>
          
            <div className={`relative inline-block w-10 h-6 rounded-full bg-gray-300 ${toggleState ? 'bg-green-500' : ''} overflow-hidden cursor-pointer`} onClick={handleToggleChange}>
                        <div className={`absolute left-0 w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-in-out ${toggleState ? 'translate-x-full' : ''}`}></div>
                    </div>
        </div>
    );
};

export default NotificationCard;