import React from "react";
import { FiX } from "react-icons/fi";

const ChatHeader = ({ onClose, onToggle }) => {
  return (
    <div className="p-4 border-b bg-red-500 text-white rounded-t-lg flex justify-between items-center">
      <p className="text-lg font-semibold">Salmen</p>
      <div>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400 mr-2"
        >
          <FiX className="mr-3 size-6" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
