"use client";
import React, { useEffect } from "react";
import { getMessaging } from "firebase/messaging";

import "firebase/messaging";
import { app } from "../../firebase";
import "./css.css";
console.log(app, "########################################");

const useFirebaseMessaging = () => {
  useEffect(() => {
    try {
      console.log("###");

      const messaging = getMessaging(app);
      console.log(messaging, "messaging");

      // messaging().onBackgroundMessage(showNotification);

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
    } catch (err) {
      console.log(err, err);
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
  // useInitializeFirebase();
  useFirebaseMessaging();
  return (
    <>
      <div className="container">
        <div className="nav-bar">
          <a>Chat</a>
          <div className="close">
            <div className="line one"></div>
            <div className="line two"></div>
          </div>
        </div>
        <div className="messages-area">
          <div className="message one"></div>
          <div className="message two"></div>
          <div className="message three"></div>
          <div className="message four"></div>
          <div className="message five"></div>
          <div className="message six"></div>
        </div>
        <div className="sender-area">
          <div className="input-place">
            <input
              placeholder="Send a message."
              className="send-input"
              type="text"
            />
            <div className="send">
              <svg
                className="send-icon"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 512 512"
                style={{ enableBackground: "new 0 0 512 512" }}
                xmlSpace="preserve"
              >
                <g>
                  <g>
                    <path
                      fill="#6B6C7B"
                      d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808 L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193 c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409 C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"
                    ></path>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
