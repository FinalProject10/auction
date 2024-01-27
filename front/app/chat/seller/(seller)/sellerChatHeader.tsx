import React from "react";
const ChatHeader = () => {
  return (
    <div className="bg-red-500 text-white  flex end-0 justify-end overflow-hidden ">
      <img
        className="w-12 h-12 object-cover mr-1 mb-1 rounded-full"
        src="https://i.pinimg.com/originals/c5/38/46/c53846feb978fe55f6ca633d05a30c7a.jpg"
        alt=""
      />
      <h2 className="text-xl font-bold">Chat Header</h2>
    </div>
  );
};

export default ChatHeader;
