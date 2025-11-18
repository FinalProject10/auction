"use client";
import React, { useState } from "react";
import ChatPage from "../firebase/chatpage";
import { FaComment, FaTimes } from "react-icons/fa";
import "../firebase/css.css";
import "./ChatBubble.css";

const ChatBubble = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="chat-widget-container">
          <ChatPage onClose={toggleChat} />
        </div>
      )}

      {/* Chat Bubble Button */}
      <button
        className={`chat-bubble-button ${isOpen ? "chat-bubble-open" : ""}`}
        onClick={toggleChat}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <FaTimes className="chat-bubble-icon" />
        ) : (
          <FaComment className="chat-bubble-icon" />
        )}
      </button>
    </>
  );
};

export default ChatBubble;

