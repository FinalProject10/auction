"use client";
import React, { useState } from "react";
import ChatList from "./(seller)/chatList";
import ChatWindow from "./(seller)/chatWindow";
// import SellerChatHeader from "./(seller)/sellerChatHeader";
import ChatInfoPanel from "./(seller)/chatInfoPanel";

const ChatSeller = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <>
      <div className="" style={{ height: "100vh", overflow: "" }}>
        {/* <SellerChatHeader /> */}
        <div className="flex">
          <ChatList onSelect={handleChatSelect} />
          <ChatWindow selectedChat={selectedChat} />
          <ChatInfoPanel />
        </div>
      </div>
    </>
  );
};

export default ChatSeller;
