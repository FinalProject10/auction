import { io } from "socket.io-client";
const userId = localStorage.getItem("userId");

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  query: { userId },
});

export default socket;
