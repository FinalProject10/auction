"use client"
import React, { useEffect } from "react";
import { messaging } from "./firebase";
import ChatPage from "./chatpage";
import "./css.css";

const askPermission = async () => {
  try {
    await messaging.requestPermission();
    console.log('hello')
    const token = await messaging.getToken();
    console.log("token: ", token);
  } catch (error) {
    console.error("Error during asking for permission: ", error);
  }
};

const Chat: React.FC = () => {
  const useFirebaseMessaging = () => {
    console.log('raa')
    useEffect(() => {
      const fetchData = async () => {
        console.log('ena')
        try {
          if (typeof navigator !== "undefined" && "Notification" in window) {
            if (Notification.permission === "granted") {
              const token = await messaging.getToken();
              console.log("token: ", token);
            } else if (Notification.permission !== "denied") {
              await askPermission();
            }
          }
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
    }, []);

    const showNotification = (payload: any) => {
      console.log("Received background message: ", payload);

      const notificationOptions = {
        body: payload.notification.body,
      };

      if ((self as any).registration) {
        (self as any).registration.showNotification(
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

  useFirebaseMessaging();

  return (
    <>
      <ChatPage />
    </>
  );
};

export default Chat;
