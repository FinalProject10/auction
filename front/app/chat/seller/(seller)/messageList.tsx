import React from "react";
import MessageBubble from "./messageBubble";
import { useChat } from "../chatContext";

import "./css/scrollbar.css";
const MessageList = () => {
  const { selectedChat, chatMessages } = useChat();

  // Assume you have a list of messages for the selected chat

  // Filter messages related to the selected chat
  const chatMessagesForSelectedChat = chatMessages[selectedChat?.id] || [];

  return (
    <div className="flex-1 p-4 h-[75vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-y-scroll ">
      {chatMessagesForSelectedChat.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
