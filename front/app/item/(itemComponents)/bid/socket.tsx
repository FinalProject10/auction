import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../../../../utils/api";

// Create socket instance - will be initialized on client side
let socket: Socket | null = null;
let socketInstance: Socket | null = null;

// Mock socket for SSR
const createMockSocket = (): Socket => {
  return {
    emit: () => {},
    on: () => {},
    off: () => {},
    connect: () => {},
    disconnect: () => {},
    close: () => {},
  } as unknown as Socket;
};

const initializeSocket = (): Socket => {
  if (typeof window === "undefined") {
    return createMockSocket();
  }

  if (!socket) {
    const userId = localStorage.getItem("userId");
    
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      query: { userId: userId || undefined },
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      timeout: 20000,
    });
    
    // Handle connection errors
    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });
    
    // Handle disconnection
    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        // Server disconnected, reconnect manually
        socket?.connect();
      }
    });
  }

  return socket;
};

// Export a function to get socket instance (lazy initialization)
const getSocket = (): Socket => {
  if (typeof window === "undefined") {
    return createMockSocket();
  }

  if (!socketInstance) {
    socketInstance = initializeSocket();
  }

  return socketInstance;
};

// Cleanup function to disconnect socket (useful for cleanup)
export const disconnectSocket = (): void => {
  if (socketInstance && socketInstance.connected) {
    socketInstance.disconnect();
    socketInstance = null;
    socket = null;
  }
};

export default getSocket;
