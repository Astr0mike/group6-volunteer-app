import React from "react";
import '../css/Notifications.css'

const Notifications = () => {
    const openedMessages = [
        "We'd like to invite you to our event on...",
        "EVENT NOTICE: Help wanted at charity event matches your skills!",
        "EVENT NOTICE: Help wanted at animal shelter matches your skills!",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "please finsih account set-up in profile management"
    ];

    return (
        <div className="notifications">
            <h1>Notifications</h1>

            <div className="new-messages">
                <p className="no-new">No new messages at this time.</p>
            </div>
            <div className="opened-messages">
                <h2>Opened Messages</h2>
                <ul>
                    {openedMessages.map((message, index) => (
                        <li key={index}>{message}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Notifications;