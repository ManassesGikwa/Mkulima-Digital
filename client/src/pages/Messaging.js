// import React, { useState, useRef } from 'react';  // Ensure useRef is imported
// import './Messaging.css';

// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, query, orderBy, limit, addDoc, serverTimestamp } from 'firebase/firestore';
// import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyAK1RPLo269pwPD9YcrnFVPh_pouVGSV30",
//   authDomain: "messaging-func.firebaseapp.com",
//   projectId: "messaging-func",
//   storageBucket: "messaging-func.appspot.com",
//   messagingSenderId: "335693014780",
//   appId: "1:335693014780:web:98e32a72508f2d85ae1979"
// };

// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);
// const firestore = getFirestore(app);

// const Messaging = () => {
//     const [user] = useAuthState(auth);

//     return (
//         <div className='App'>
//             <header>
//                 <SignOut />
//             </header>

//             <section>
//                 {user ? <ChatRoom /> : <SignIn />}
//             </section>
//         </div>
//     );
// };

// function SignIn() {
//     const signInWithGoogle = () => {
//         const provider = new GoogleAuthProvider();
//         signInWithPopup(auth, provider);
//     };

//     return (
//         <button onClick={signInWithGoogle}>Sign in</button>
//     );
// }

// function SignOut() {
//     return auth.currentUser && (
//         <button onClick={() => signOut(auth)}>Sign Out</button>
//     );
// }

// function ChatRoom() {
//     const dummy = useRef();

//     const messageRef = collection(firestore, 'messages');
//     const q = query(messageRef, orderBy('createdAt'), limit(25));

//     const [messages] = useCollectionData(q, { idField: 'id' });
//     const [formValue, setFormValue] = useState('');

//     const sendMessage = async (e) => {
//         e.preventDefault();

//         const { uid, photoURL } = auth.currentUser;

//         await addDoc(messageRef, {
//             text: formValue,
//             createdAt: serverTimestamp(),
//             uid,
//             photoURL
//         });

//         setFormValue('');
//         dummy.current.scrollIntoView({ behavior: 'smooth' });
//     };

//     return (
//         <>
//             <main>
//                 {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

//                 <div ref={dummy}></div>
//             </main>
//             <div className='mess-form'>
//                 <form onSubmit={sendMessage}>
//                     <input placeholder='message' value={formValue} onChange={(e) => setFormValue(e.target.value)} />
//                     <button type="submit">🕊️</button>
//                 </form>
//             </div>
//         </>
//     );
// }

// function ChatMessage(props) {
//     const { text, uid, photoURL } = props.message;

//     const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

//     return (
//         <div className={`message ${messageClass}`}>
//             <img src={photoURL} alt="User avatar" />
//             <p>{text}</p>
//         </div>
//     );
// }

// export default Messaging;
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
    const user = auth.currentUser;
    return user && (
        <div className='email-header'>
            <span >{user.email}</span>
            <button onClick={() => signOut(auth)}>Sign Out</button>
        </div>
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