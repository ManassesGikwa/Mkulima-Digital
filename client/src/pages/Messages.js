import React, { useState, useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import './Messages.css';

function Messages() {
    const [messages, setMessages] = useState([]);
    const [newMessagesCount, setNewMessagesCount] = useState(0);

    useEffect(() => {
        fetch('/messages')
            .then(response => response.json())
            .then(data => {
                setMessages(data);
                const newMessages = data.filter(message => !message.read);
                setNewMessagesCount(newMessages.length);
            })
            .catch(error => console.error('Error fetching messages:', error));
    }, []);

    return (
        <div className="messages-container">
            <h2>Inbox</h2>
            <ul className="messages-list">
                {messages.map(message => (
                    <li key={message.id} className="message-item">
                        <h3>{message.subject}</h3>
                        <p>{message.body}</p>
                        <span>{message.sender}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Messages;
