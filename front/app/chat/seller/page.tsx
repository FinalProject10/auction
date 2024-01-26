"use client";
import React, { useState } from "react";
import ChatList from "./(seller)/chatList";
import ChatWindow from "./(seller)/chatWindow";
// import SellerChatHeader from "./(seller)/sellerChatHeader";
import ChatInfoPanel from "./(seller)/chatInfoPanel";
import { ChatProvider } from "./chatContext";

const ChatSeller = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };
  const chats = [
    { id: 1, name: "zaki zakou" },
    { id: 2, name: "Kina Mayer" },
    { id: 3, name: "salmen khelifi" },
    { id: 4, name: "salim ben selim " },
    { id: 5, name: "salah hlel " },
    { id: 6, name: "adib " },
    { id: 7, name: "Kina Mayer" },
    { id: 8, name: "salmen khelifi" },
    { id: 9, name: "salim ben selim " },
    { id: 10, name: "salah hlel " },
    { id: 11, name: "adib " },
  ];
  return (
    <>
      <ChatProvider>
        <div className="" style={{ height: "100vh", overflow: "hidden" }}>
          <div className="flex">
            <ChatList onSelect={handleChatSelect} />
            <ChatWindow selectedChat={selectedChat} />
            <ChatInfoPanel chats={chats} />
          </div>
        </div>
      </ChatProvider>
    </>
  );
};

export default ChatSeller;
