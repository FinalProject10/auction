import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../../../../utils/api";

// Create socket instance - will be initialized on client side
let socket: Socket | null = null;

const initializeSocket = (): Socket => {
  if (typeof window === "undefined") {
    // Return a mock socket for SSR
    return {
      emit: () => {},
      on: () => {},
      off: () => {},
      connect: () => {},
      disconnect: () => {},
    } as Socket;
  }

  if (!socket) {
    const userId = localStorage.getItem("userId");
    
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      query: { userId: userId || undefined },
      autoConnect: true,
    });
  }

  return socket;
};

// Export a function to get socket instance (lazy initialization)
let socketInstance: Socket | null = null;

const getSocket = (): Socket => {
  if (typeof window === "undefined") {
    // Return a mock socket for SSR
    return {
      emit: () => {},
      on: () => {},
      off: () => {},
      connect: () => {},
      disconnect: () => {},
    } as Socket;
  }

  if (!socketInstance) {
    socketInstance = initializeSocket();
  }

  return socketInstance;
};

export default getSocket;
