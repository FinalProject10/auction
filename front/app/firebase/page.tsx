"use client";
import React, { useEffect } from "react";
import { messaging } from "./firebase";
import ChatPage from "./chatpage";
import "./css.css";

const useFirebaseMessaging = () => {
  const askPermission = async () => {
    try {
      await messaging.requestPermission();
      const token = await messaging.getToken();
      console.log("token: ", token);
    } catch (error) {
      console.error("Error during asking for permission: ", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof navigator !== "undefined") {
          if ("Notification" in window) {
            if (Notification.permission === "granted") {
              const token = await messaging.getToken();
              console.log("token: ", token);
            } else if (Notification.permission !== "denied") {
              await askPermission();
            }
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [messaging, askPermission]);

  const showNotification = (payload: any) => {
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
};

const Chat: React.FC = () => {
  // useFirebaseMessaging();

  return (
    <>
      <ChatPage />
    </>
  );
};

export default Chat;
