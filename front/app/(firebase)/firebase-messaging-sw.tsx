"use client";

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyAXZFWcRQsv_7limGUoRCmYQT-cfuKagqA",
  authDomain: "auction-adca9.firebaseapp.com",
  projectId: "auction-adca9",
  storageBucket: "auction-adca9.appspot.com",
  messagingSenderId: "983966824819",
  appId: "1:983966824819:web:ed881ec63d138541c16d06",
  measurementId: "G-ZDLWMGHEBG",
};

firebase.initializeApp(firebaseConfig);

const messaging = getMessaging();
const db = firebase.database();
const username = prompt("user");
function sendMessage(e) {
  e.preventDefault();

  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  messageInput.value = "";

  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

const fetchChat = db.ref("messages/");

// /////////////////
// import React, { useState, useEffect, useRef } from "react";

// function ChatMessages() {
//   const [messages, setMessages] = useState([]);
//   const messagesRef = useRef(null);

//   useEffect(() => {
//     // Assuming fetchChat is a Firebase reference
//     const fetchChatRef = fetchChat();
//     const unsubscribe = fetchChatRef.on("child_added", (snapshot) => {
//       const newMessage = snapshot.val();
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//     });

//     return () => unsubscribe(); // Cleanup function to prevent memory leaks
//   }, []);

//   return (
//     <ul ref={messagesRef}>
//       {messages.map((message) => (
//         <li
//           key={message.id}
//           className={username === message.username ? "sent" : "receive"}
//         >
//           <span>{message.username}: </span>
//           {message.message}
//         </li>
//       ))}
//     </ul>
//   );
// }
