import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { FaImages } from "react-icons/fa";
import { MdOutlineKeyboardVoice } from "react-icons/md";

const ChatInput = ({ selectedChat, onSend }) => {
  const [userMessage, setUserMessage] = useState("");

  const handleInputChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSend = () => {
    if (userMessage.trim() !== "") {
      onSend(userMessage);
      setUserMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="bg-white border border-solid border-gray-300 shadow-none hover:shadow-md rounded-full mx-auto mb-3">
      <div className="p-4 border-t flex">
        <span className="flex items-center px-2">
          <FaImages className="w-6 h-6  text-red-500" />
        </span>
        <span className="flex items-center px-2">
          <MdOutlineKeyboardVoice className="w-6 h-6  text-red-500" />
        </span>
        <input
          type="text"
          placeholder="Type a message"
          value={userMessage}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-1 focus:ring-red-500"
        />
        <button
          onClick={handleSend}
          className="bg-red-500 text-white px-4 py-3 rounded-r-md hover:bg-red-700 transition duration-300"
        >
          <IoSend className="w-6 h-6  text-white" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
