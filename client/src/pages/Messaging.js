// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function MessagingComponent() {
//   const [message, setMessage] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const currentUserId = 1; // This should be dynamically set to the logged-in user's ID

//   useEffect(() => {
//     if (selectedUser) {
//       loadMessages();
//     }
//   }, [selectedUser]);

//   const loadMessages = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`http://localhost:5555/messages`, {
//         params: {
//           sender_id: currentUserId,
//           receiver_id: selectedUser.id
//         }
//       });

//       const responseReverse = await axios.get(`http://localhost:5555/messages`, {
//         params: {
//           sender_id: selectedUser.id,
//           receiver_id: currentUserId
//         }
//       });

//       setMessages([...response.data, ...responseReverse.data].sort((a, b) => new Date(a.created_at) - new Date(b.created_at)));
//     } catch (error) {
//       console.error('Error loading messages:', error);
//       setError('Failed to load messages. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleMessageChange = (e) => {
//     setMessage(e.target.value);
//   };

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const searchUsers = async () => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.get(`http://localhost:5555/users`, {
//         params: {
//           q: searchQuery
//         }
//       });
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error('Error searching users:', error);
//       setError('Failed to search users. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const sendMessage = async () => {
//     if (!selectedUser) {
//       setError('Please select a user to send a message.');
//       return;
//     }
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post('http://localhost:5555/messages', {
//         sender_id: currentUserId,
//         receiver_id: selectedUser.id,
//         content: message,
//         created_at: new Date().toISOString()
//       });

//       console.log('Message sent:', response.data);
//       loadMessages();
//       setMessage('');
//     } catch (error) {
//       console.error('Error sending message:', error);
//       setError('Failed to send message. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="messaging-container">
//       <div className="search-bar">
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="Search for users by username"
//         />
//         <button onClick={searchUsers} disabled={isLoading}>
//           {isLoading ? 'Searching...' : 'Search'}
//         </button>
//       </div>
//       <div className="search-results">
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : (
//           <ul>
//             {searchResults.map((user) => (
//               <li key={user.id} onClick={() => setSelectedUser(user)}>
//                 {user.username}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//       {selectedUser && (
//         <>
//           <div className="message-history">
//             {messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`message ${msg.sender_id === currentUserId ? 'sent' : 'received'}`}
//               >
//                 {msg.content}
//               </div>
//             ))}
//           </div>
//           <div className="message-input">
//             <textarea
//               value={message}
//               onChange={handleMessageChange}
//               placeholder="Type your message here..."
//               rows={4}
//               cols={50}
//             />
//             <button onClick={sendMessage} disabled={isLoading}>
//               {isLoading ? 'Sending...' : 'Send'}
//             </button>
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default MessagingComponent;
import React, { useState, useRef } from 'react';  // Ensure useRef is imported
import './Messaging.css';

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAK1RPLo269pwPD9YcrnFVPh_pouVGSV30",
  authDomain: "messaging-func.firebaseapp.com",
  projectId: "messaging-func",
  storageBucket: "messaging-func.appspot.com",
  messagingSenderId: "335693014780",
  appId: "1:335693014780:web:98e32a72508f2d85ae1979"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

const Messaging = () => {
    const [user] = useAuthState(auth);

    return (
        <div className='App'>
            <header>
                <SignOut />
            </header>

            <section>
                {user ? <ChatRoom /> : <SignIn />}
            </section>
        </div>
    );
};

function SignIn() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };

    return (
        <button onClick={signInWithGoogle}>Sign in</button>
    );
}

function SignOut() {
    return auth.currentUser && (
        <button onClick={() => signOut(auth)}>Sign Out</button>
    );
}

function ChatRoom() {
    const dummy = useRef();

    const messageRef = collection(firestore, 'messages');
    const q = query(messageRef, orderBy('createdAt'), limit(25));

    const [messages] = useCollectionData(q, { idField: 'id' });
    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {
        e.preventDefault();

        const { uid, photoURL } = auth.currentUser;

        await addDoc(messageRef, {
            text: formValue,
            createdAt: serverTimestamp(),
            uid,
            photoURL
        });

        setFormValue('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <main>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

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

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img src={photoURL} alt="User avatar" />
            <p>{text}</p>
        </div>
    );
}

export default Messaging;