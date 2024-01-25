// import { Avatar } from "antd";
import React from "react";
import { FaVideo, FaUser } from "react-icons/fa";
import { Avatar } from "@material-tailwind/react";
import { FiPhoneCall } from "react-icons/fi";
import { MdAccountCircle } from "react-icons/md";

const ChatInfoPanel = () => {
  // Placeholder data for seller info
  const clientInfo = {
    name: "Kina Mayer",
    status: "Online",
    attachments: [
      "https://i.pinimg.com/originals/e0/a1/7f/e0a17f490d0e7a479b2a38325b269846.jpg",
      "https://i.pinimg.com/originals/c5/38/46/c53846feb978fe55f6ca633d05a30c7a.jpg",

      "https://i.pinimg.com/originals/e0/a1/7f/e0a17f490d0e7a479b2a38325b269846.jpg",
      "https://i.pinimg.com/originals/c5/38/46/c53846feb978fe55f6ca633d05a30c7a.jpg",
      "https://i.pinimg.com/originals/e0/a1/7f/e0a17f490d0e7a479b2a38325b269846.jpg",
      "https://i.pinimg.com/originals/c5/38/46/c53846feb978fe55f6ca633d05a30c7a.jpg",

      "https://i.pinimg.com/originals/e0/a1/7f/e0a17f490d0e7a479b2a38325b269846.jpg",
      "https://i.pinimg.com/originals/c5/38/46/c53846feb978fe55f6ca633d05a30c7a.jpg",
    ],
  };

  return (
    <div className="w-1/4 p-4 border-l  bg-gray-100 h-screen">
      <div className="flex flex-col items-center justify-center">
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          className="w-[108px] h-[108px] rounded-full mb-4"
        />
        <h2 className="text-xl font-bold mb-4">Client Info</h2>
        <p>Status: {clientInfo.status}</p>
      </div>
      <div className="flex  items-center justify-center gap-10 mt-4">
        <div className="flex flex-col items-center mt-2">
          <div className="bg-red-400 rounded-full p-8">
            <FiPhoneCall className="text-white w-8 h-8" />
          </div>
          <br />
          <p className="text-sm font-bold">
            {" "}
            <p className="text-sm font-bold"> Check Profile</p>
          </p>
        </div>
        <div className="flex flex-col items-center mt-2">
          <div className="bg-red-400 rounded-full p-8">
            <MdAccountCircle className="text-white w-8 h-8" />
          </div>
          <br />
          <p className="text-sm font-bold"> Check Profile</p>
        </div>
      </div>
      <p className="text-sm font-bold mt-10"> Attachment</p>

      <div className="mt-4 grid grid-cols-4 ">
        {clientInfo.attachments.map((attachment, index) => (
          <img
            key={index}
            src={attachment}
            alt={`Attachment ${index}`}
            className="w-16 h-16 object-cover mr-3 mb-2"
          />
        ))}
      </div>
    </div>
  );
};

export default ChatInfoPanel;
