import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAXZFWcRQsv_7limGUoRCmYQT-cfuKagqA",
  authDomain: "auction-adca9.firebaseapp.com",
  projectId: "auction-adca9",
  storageBucket: "auction-adca9.appspot.com",
  messagingSenderId: "983966824819",
  appId: "1:983966824819:web:ed881ec63d138541c16d06",
  measurementId: "G-ZDLWMGHEBG",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
