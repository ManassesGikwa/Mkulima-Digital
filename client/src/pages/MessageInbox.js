import React from 'react';
import { useNavigate } from 'react-router-dom';

function MessageInbox({ messages, currentUserId, onSelectConversation }) {
    const navigate = useNavigate();

    const handleConversationClick = (senderId, receiverId) => {
        const conversation = messages.filter(msg =>
            (msg.sender_id === senderId && msg.receiver_id === receiverId) ||
            (msg.sender_id === receiverId && msg.receiver_id === senderId)
        );
        onSelectConversation(conversation);
        navigate(`/conversation/${receiverId === currentUserId ? senderId : receiverId}`);
    };

    return (
        <div className='inbox'>
            <h3>Inbox</h3>
            <ul>
                {messages.filter(msg => msg.receiver_id === currentUserId || msg.sender_id === currentUserId)
                    .map((msg, index) => (
                        <li key={index} onClick={() => handleConversationClick(msg.sender_id, msg.receiver_id)}>
                            <strong>{msg.sender_id === currentUserId ? msg.receiver_id : msg.sender_id}</strong>: {msg.content}
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default MessageInbox;