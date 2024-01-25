import { Avatar, Typography } from "antd";
import React from "react";

const ChatHeader = ({ chat }) => {
  return (
    <div className="bg-gray-100 drop-shadow-md text-black p-4 rounded-md">
      <div className="flex items-center gap-4">
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
        />
        <div>
          <Typography variant="h6 " className="text-xl font-bold">
            {chat.name}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            Online
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
