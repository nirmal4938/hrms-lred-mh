import React from 'react';
import NotificationCard from './Components/NotificationCard';

const GeneralNotification = () => {
    const notifications = [
        { title: "Payouts", text: "Receive payout notification updates" },
        { title: "Chargebacks", text: "New chargeback and dispute status update" },
        { title: "Notification Failures", text: "Get notify if and IPN is failing" },
        { title: "New Sale", text: "On every new sale" },
        { title: "Refunds", text: "When a payment gets refunded" },
        { title: "Payouts", text: "Receive payout notification updates" },
        { title: "Chargebacks", text: "New chargeback and dispute status update." },

    ];
    return (
        <>
          <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3 gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="font-bold text-xl">General Notifications</div>
            <div className=" text-sm">Notification emails that you would like to receive.</div>
          </div>
             <div className='flex flex-wrap gap-6'>
            {notifications.map((notification, index) => (
                <NotificationCard
                    key={index}
                    title={notification.title}
                    text={notification.text}
                />
            ))}
        </div>
        </div>
        </div>
        </>
    );
};

export default GeneralNotification;
