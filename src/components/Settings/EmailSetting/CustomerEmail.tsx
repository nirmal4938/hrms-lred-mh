import React from 'react';
import NotificationCard from './Components/NotificationCard';

const CustomerEmail = () => {
    const notifications = [
        { title: "Receipts", text: "Customer's transaction receipts after each transaction" },
        { title: "Invoice Shortfall", text: "If a customer makes a payment in an incorrect amount" },
        { title: "Paypal Failed Payments", text: "If a paypal transaction fails" },
        { title: "Subscriptions", text: "For a failed recurring payments attempts or cancellations" },


    ];
    return (
        <>
          <div className="flex flex-col border border-r-2 rounded-xl border-gray-300 p-3 gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <div className="font-bold text-xl">Customer Emails</div>
            <div className=" text-sm">Notification emails that get sent to your Customers.</div>
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

export default CustomerEmail;
