import React, { useState } from 'react';
import './Dashboard.css';

const ChatSidebar = ({ chats }) => {
  return (
    <aside className="sidebar chat-sidebar">
      <div className="logo">Chats</div>
      <ul className="menu">
        {chats.map(chat => (
          <li key={chat.id} className="menu-item">{chat.name}</li>
        ))}
      </ul>
    </aside>
  );
};

export default function Dashboard() {
  const [messages, setMessages] = useState([
    { id: 1, content: "Hello!", type: "individual" },
    { id: 2, content: "How are you?", type: "community" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [chats, setChats] = useState([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    // Add more chat objects as needed
  ]);

  const sendMessage = () => {
    if (inputValue.trim() === "") return; 
    setMessages([...messages, { id: messages.length + 1, content: inputValue, type: "individual" }]);
    setInputValue(''); // Clear input field after sending
  };

  return (
    <div className="dashboard">
      <aside className="sidebar main-sidebar">
        <div className="logo">AGRITECH</div>
        <ul className="menu">
          <li className="menu-item active">Dashboard</li>
          <li className="menu-item">My Posts</li>
          <li className="menu-item">Inbox</li>
          <li className="menu-item">Work</li>
          <li className="menu-item">Settings</li>
        </ul>
      </aside>
      <ChatSidebar chats={chats} />
      <main className="main">
        <section className="greeting">
          <h1>Hello Farmer 2023!</h1>
          <p>Your agriculture is going into safe future farming</p>
        </section>
        <div className="messaging-container">
          <div className="message-list">
            {messages.map(message => (
              <div key={message.id} className={`${message.type === "individual" ? "individual-message" : "community-message"}`}>
                {message.content}
              </div>
            ))}
          </div>
          <div className="message-input">
            <input 
              type="text" 
              placeholder="Type a message..." 
              value={inputValue} 
              onChange={(e) => setInputValue(e.target.value)} 
              onKeyPress={(e) => { if (e.key === 'Enter') sendMessage(); }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      </main>
    </div>
  );
}
