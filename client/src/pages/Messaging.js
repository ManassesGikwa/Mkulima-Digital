import React, { useState, useRef, useEffect } from 'react';
import './Messaging.css';
import axios from 'axios';

const Messaging = () => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [formValue, setFormValue] = useState('');

    useEffect(() => {
        // Fetch user data to check if logged in
        axios.get('http://127.0.0.1:5555/users')
            .then(response => {
                // Assuming there's a way to identify the logged-in user, e.g., via a session token
                const loggedInUser = response.data.find(u => u.email === "currentUserEmail@example.com");
                if (loggedInUser) {
                    setUser(loggedInUser);
                }
            })
            .catch(error => console.error('Error fetching users:', error));

        // Fetch messages
        fetchMessages();
    }, []);

    const fetchMessages = () => {
        axios.get('http://127.0.0.1:5555/messages')
            .then(response => setMessages(response.data))
            .catch(error => console.error('Error fetching messages:', error));
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!user) return;

        const newMessage = {
            content: formValue,
            created_at: new Date().toISOString(),
            sender_id: user.id,
            receiver_id: 1, // Set the appropriate receiver_id
        };

        try {
            await axios.post('http://127.0.0.1:5555/messages', newMessage);
            setFormValue('');
            fetchMessages();
            dummy.current.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const dummy = useRef();

    return (
        <div className='App'>
            <header>
                <SignOut user={user} setUser={setUser} />
            </header>

            <section>
                {user ? <ChatRoom messages={messages} sendMessage={sendMessage} formValue={formValue} setFormValue={setFormValue} dummy={dummy} /> : <SignIn setUser={setUser} />}
            </section>
        </div>
    );
};

function SignIn({ setUser }) {
    const signInWithGoogle = () => {
        // Redirect to your login/register page
        window.location.href = 'http://127.0.0.1:3000/login';
    };

    return (
        <button onClick={signInWithGoogle}>Sign in</button>
    );
}

function SignOut({ user, setUser }) {
    const handleSignOut = () => {
        // Handle sign out logic, e.g., clearing user state and session
        setUser(null);
        // Optionally redirect to login page
    };

    return user && (
        <button onClick={handleSignOut}>Sign Out</button>
    );
}

function ChatRoom({ messages, sendMessage, formValue, setFormValue, dummy }) {
    return (
        <>
            <main>
                {messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

                <div ref={dummy}></div>
            </main>
            <div className='mess-form'>
                <form onSubmit={sendMessage}>
                    <input placeholder='message' value={formValue} onChange={(e) => setFormValue(e.target.value)} />
                    <button type="submit">🕊️</button>
                </form>
            </div>
        </>
    );
}

function ChatMessage({ message }) {
    const { content, sender_id, receiver_id } = message;

    // Assuming user is available globally or passed as prop to identify sent/received messages
    const user = {}; // Replace with actual user context or prop
    const messageClass = sender_id === user.id ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img src="https://via.placeholder.com/50" alt="User avatar" />
            <p>{content}</p>
        </div>
    );
}

export default Messaging;
