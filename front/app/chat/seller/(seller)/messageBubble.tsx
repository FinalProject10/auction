import { Avatar } from "antd";
import React from "react";

const MessageBubble = ({ message }) => {
  const isSender = message.sender === "Lina Dry";

  return (
    <div
      className={`mb-4 flex items-center ${isSender ? "flex-row-reverse" : ""}`}
    >
      <Avatar
        className="flex-shrink-0"
        src="https://docs.material-tailwind.com/img/face-2.jpg"
        alt="avatar"
      />
      <div
        style={{
          maxWidth: "50%",
          marginLeft: isSender ? "0" : "10px",
          marginRight: isSender ? "10px" : "0",
        }}
        className={`inline-block ${
          isSender
            ? "bg-red-500 text-white rounded-lg py-2 px-4 inline-block ml-2"
            : "bg-white border border-gray-300 rounded-lg py-2 px-4 inline-block mr-2"
        } p-2 rounded max-w-1/2`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
