// ChatContext.js
import React, { createContext, useContext, useState } from "react";
import { messagesData } from "./(seller)/messagesData.tsx";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatMessages, setChatMessages] = useState({});

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  if (!chatMessages[selectedChat?.id]) {
    setChatMessages((prevMessages) => ({
      ...prevMessages,
      [selectedChat?.id]: messagesData.filter(
        (message) => message.roomId === selectedChat?.id
      ),
    }));
  }

  const addMessageToRoom = (message) => {
    setChatMessages((prevMessages) => ({
      ...prevMessages,
      [selectedChat]: [...(prevMessages[selectedChat] || []), message],
    }));
  };

  return (
    <ChatContext.Provider
      value={{ selectedChat, chatMessages, handleChatSelect, addMessageToRoom }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
