import React from "react";
import ChatHeader from "./chatHeader";
import MessageList from "./messageList";
const ChatInput = dynamic(() => import("./chatInpout"));
import { useChat } from "../chatContext";
import dynamic from "next/dynamic";

const ChatWindow = () => {
  const { selectedChat } = useChat();

  if (!selectedChat) {
    return <div className="flex-1 p-4">Select a chat to start messaging</div>;
  }

  return (
    <div className="flex-1 h-4/">
      <ChatHeader chat={selectedChat} />
      <MessageList chat={selectedChat} />

      <ChatInput />

      {/* onSend={addUserMessage} */}
    </div>
  );
};

export default ChatWindow;
