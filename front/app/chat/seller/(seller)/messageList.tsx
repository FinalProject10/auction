import React from "react";
import MessageBubble from "./messageBubble";
import "./css/scrollbar.css";
const MessageList = ({ chat }) => {
  // Assume you have a list of messages for the selected chat
  const messages = [
    { id: 1, text: "Hello", sender: "Lina Dry" },
    { id: 2, text: "Hi there!", sender: "Kina Mayer" },
    {
      id: 1,
      text: "I heard you're interested in car auctions. Is that correct?",
      sender: "Lina Dry",
    },
    {
      id: 2,
      text: "Yes, I am! I'm looking to buy a used car.",
      sender: "Kina Mayer",
    },
    {
      id: 1,
      text: "Great! There are various types of auctions, such as online auctions and live auctions. Do you have a preference?",
      sender: "Lina Dry",
    },
    {
      id: 2,
      text: "I'm open to both options. What do you recommend?",
      sender: "Kina Mayer",
    },
    {
      id: 1,
      text: "Online auctions provide convenience, while live auctions offer the excitement of bidding in person. It depends on your preference. Are you looking for any specific make or model?",
      sender: "Lina Dry",
    },
    {
      id: 2,
      text: "I'm interested in compact cars, preferably from the last few years. Any tips on what to look for during the auction?",
      sender: "Kina Mayer",
    },
    // Continue the conversation with more messages
  ];

  return (
    <div className="flex-1 p-4 h-[75vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 overflow-y-scroll ">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
