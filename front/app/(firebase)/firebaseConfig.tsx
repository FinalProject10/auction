"use client";
import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAXZFWcRQsv_7limGUoRCmYQT-cfuKagqA",
  authDomain: "auction-adca9.firebaseapp.com",
  projectId: "auction-adca9",
  storageBucket: "auction-adca9.appspot.com",
  messagingSenderId: "983966824819",
  appId: "1:983966824819:web:ed881ec63d138541c16d06",
  measurementId: "G-ZDLWMGHEBG",
};

const useInitializeFirebase = () => {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);
};

const useFirebaseMessaging = () => {
  useEffect(() => {
    firebase.messaging().onBackgroundMessage(showNotification);

    if ("Notification" in window) {
      if (Notification.permission === "granted") {
        firebase
          .messaging()
          .getToken()
          .then((token) => {
            console.log("token: ", token);
          });
      } else if (Notification.permission !== "denied") {
        askPermission();
      }
    }
  }, []);
};

const askPermission = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log("token: ", token);
  } catch (error) {
    console.error("Error during asking for permission: ", error);
  }
};

const showNotification = (payload) => {
  console.log("Received background message: ", payload);

  const notificationOptions = {
    body: payload.notification.body,
  };

  if (self.registration) {
    self.registration.showNotification(
      payload.notification.title,
      notificationOptions
    );
  } else {
    console.error(
      "self.registration is not available, cannot show notification"
    );
  }
};

const Home: React.FC = () => {
  useInitializeFirebase();
  useFirebaseMessaging();

  return <div>test</div>;
};

export default Home;
