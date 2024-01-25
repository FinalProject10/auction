import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import { Avatar, Badge, Typography } from "@material-tailwind/react";
import { List, ListItem, ListItemPrefix, Card } from "@material-tailwind/react";
import "./css/scrollbar.css";

const ChatList = ({ onSelect }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnectivityChange = () => {
      setIsConnected(navigator.onLine);
    };

    window.addEventListener("online", handleConnectivityChange);
    window.addEventListener("offline", handleConnectivityChange);

    return () => {
      window.removeEventListener("online", handleConnectivityChange);
      window.removeEventListener("offline", handleConnectivityChange);
    };
  }, []);

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
    <div className="w-1/4 p-4 border-r bg-gray-100 h-screen">
      <div className="flex items-center gap-4 mb-4">
        <Avatar
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
        />
        <div>
          <Typography variant="h6 " className="text-xl font-bold  ">
            Khelifi salmen
          </Typography>{" "}
          <Typography variant="h6 " className="text-sm font-bold  ">
            Web Developer{" "}
          </Typography>
        </div>
      </div>{" "}
      <SearchBar />
      <ul className="overflow-y-scroll h-full">
        {" "}
        {/* Set height to 100% */}
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={`flex cursor-pointer hover:bg-gray-200  drop-shadow-md text-black p-1 rounded-md  ${
              isConnected ? "border-green-500" : "border-red-500"
            }`}
            onClick={() => onSelect(chat)}
          >
            <ListWithAvatar name={chat.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Define a new component to render the list with avatar
const ListWithAvatar = ({ name }) => (
  <Card className="w-96">
    <List>
      <ListItem>
        <ListItemPrefix>
          <Avatar
            variant="circular"
            alt={name}
            src="https://docs.material-tailwind.com/img/face-1.jpg"
          />
        </ListItemPrefix>
        <div>
          <Typography variant="h6" color="blue-gray">
            {name}
          </Typography>
          <Typography variant="small" color="gray" className="font-normal">
            Online
          </Typography>
        </div>
      </ListItem>
    </List>
  </Card>
);

export default ChatList;
