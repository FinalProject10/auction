// import { initializeApp } from "firebase/app";
// import {
//   getFirestore,
//   useEmulator as useFirestoreEmulator,
// } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getMessaging } from "firebase/messaging";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAXZFWcRQsv_7limGUoRCmYQT-cfuKagqA",
//   authDomain: "auction-adca9.firebaseapp.com",
//   databaseURL:
//     "https://auction-adca9-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "auction-adca9",
//   storageBucket: "auction-adca9.appspot.com",
//   messagingSenderId: "983966824819",
//   appId: "1:983966824819:web:ed881ec63d138541c16d06",
//   measurementId: "G-ZDLWMGHEBG",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Use emulators for local development (only on the client side)
// if (typeof window !== "undefined" && window.location.hostname === "localhost") {
//   // Emulator for Firestore
//   useFirestoreEmulator(getFirestore(app), "localhost", 5005);
//   // Add other emulator configurations if needed
// }

// // Initialize Firebase services
// const auth = getAuth(app);
// const firestore = getFirestore(app);

// // Initialize Firebase messaging only on the client side
// let messaging;
// if (typeof window !== "undefined" && "serviceWorker" in navigator) {
//   messaging = getMessaging(app);
// }

// // Export the initialized services
// export { auth, messaging, firestore };
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, useFirestoreEmulator } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXZFWcRQsv_7limGUoRCmYQT-cfuKagqA",
  authDomain: "auction-adca9.firebaseapp.com",
  databaseURL:
    "https://auction-adca9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "auction-adca9",
  storageBucket: "auction-adca9.appspot.com",
  messagingSenderId: "983966824819",
  appId: "1:983966824819:web:ed881ec63d138541c16d06",
  measurementId: "G-ZDLWMGHEBG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Use emulators for local development (only on the client side)
if (typeof window !== "undefined" && window.location.hostname === "localhost") {
  // Emulator for Firestore
  useFirestoreEmulator(getFirestore(app), "localhost", 5005);
  // Add other emulator configurations if needed
}

// Initialize Firebase services
const auth = getAuth(app);
const firestore = getFirestore(app);

// Initialize Firebase messaging only on the client side
let messaging;
if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  messaging = getMessaging(app);
}

// Export the initialized services
export { auth, messaging, firestore };
