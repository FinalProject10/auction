import React, { useState } from "react";
import ChatHeader from "./chatHeader";
import MessageList from "./messageList";
const ChatInput = dynamic(() => import("./chatInpout"));
import { useChat } from "../chatContext";
import dynamic from "next/dynamic";
import { TbMenu2 } from "react-icons/tb";
import ChatInfoPanel from "./chatInfoPanel";
const ChatWindow = () => {
  const { selectedChat } = useChat();
  const [infoPanelVisible, setInfoPanelVisible] = useState(false);
  // const [selectedChat, setSelectedChat] = useState(false);

  // const handleChatSelect = (chat) => {
  //   setSelectedChat(chat);
  //   // console.log("dddddddddddddds", selectedChat);

  //   // setInfoPanelVisible(true);
  // };
  const handleToggleInfoPanel = () => {
    setInfoPanelVisible((prevVisible) => !prevVisible);
  };
  if (!selectedChat) {
    return (
      <>
        <div className="w-full grid place-content-center">
          <img
            className="w-[300px] h-[300px]"
            src="https://res.cloudinary.com/dubduh12x/image/upload/v1706275988/emptymessage_zrjkaj.webp"
            alt=""
          />
          <div className="p-4 text-center  text-sm font-bold">
            Select a chat to start messaging
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="flex-1 h-4/ relative">
      {selectedChat !== null && (
        <button
          onClick={handleToggleInfoPanel}
          className="absolute top-4 right-2 hello"
        >
          <TbMenu2 className="text-red-500 h-11 w-11 absolute z-50 right-4" />
        </button>
      )}

      <div className="flex">
        <div className="flex-1">
          <ChatHeader chat={selectedChat} />
          <MessageList chat={selectedChat} />
          <ChatInput />
        </div>

        {infoPanelVisible && (
          <ChatInfoPanel chats={selectedChat} className="ml-10 " />
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
