// Socket utility functions to avoid circular dependencies
let io = null;
let userSocketMap = null;

function initializeSocketUtils(socketIO, socketMap) {
  io = socketIO;
  userSocketMap = socketMap;
}

function sendMessageToRoom(roomId, message, userId = null) {
  if (!io) {
    console.warn("Socket.IO not initialized. Cannot send message to room.");
    return;
  }

  // Convert roomId to string to ensure consistent room naming
  const roomIdStr = roomId.toString();

  console.log(`📢 Sending notification to room ${roomIdStr}:`, message);
  // Emit to all sockets in the room
  io.to(roomIdStr).emit("notification", message);
  // Also emit placedBid event for real-time bid updates with userId
  io.to(roomIdStr).emit("placedBid", { 
    bidAmount: parseFloat(message), 
    itemId: roomIdStr,
    userId: userId ? parseInt(userId) : null,
    timestamp: new Date().toISOString()
  });
}

function emitAuctionCountdown(roomId, stage, timeLeft) {
  if (!io) {
    console.warn("Socket.IO not initialized. Cannot emit countdown.");
    return;
  }

  const roomIdStr = roomId.toString();
  io.to(roomIdStr).emit("auctionCountdown", {
    stage, // 'goingOnce', 'goingTwice', 'sold'
    timeLeft, // seconds remaining
    itemId: roomIdStr,
    timestamp: new Date().toISOString()
  });
}

function emitProxyBidExecuted(roomId, bidAmount, userId) {
  if (!io) {
    console.warn("Socket.IO not initialized. Cannot emit proxy bid.");
    return;
  }

  const roomIdStr = roomId.toString();
  io.to(roomIdStr).emit("proxyBidExecuted", {
    bidAmount,
    itemId: roomIdStr,
    userId,
    timestamp: new Date().toISOString()
  });
}

function emitApprovalStatusChanged(roomId, status, approvalData) {
  if (!io) {
    console.warn("Socket.IO not initialized. Cannot emit approval status.");
    return;
  }

  const roomIdStr = roomId.toString();
  io.to(roomIdStr).emit("approvalStatusChanged", {
    status,
    itemId: roomIdStr,
    ...approvalData,
    timestamp: new Date().toISOString()
  });
}

function emitPaymentProcessed(roomId, paymentData) {
  if (!io) {
    console.warn("Socket.IO not initialized. Cannot emit payment status.");
    return;
  }

  const roomIdStr = roomId.toString();
  io.to(roomIdStr).emit("paymentProcessed", {
    itemId: roomIdStr,
    ...paymentData,
    timestamp: new Date().toISOString()
  });
}

function sendMessageToUser(userId, message) {
  if (!userSocketMap) {
    console.warn("User socket map not initialized. Cannot send message to user.");
    return;
  }

  let userSocket = null;
  if (userId?.id) {
    userSocket = userSocketMap.get(userId.id);
  } else {
    userSocket = userSocketMap.get(userId);
  }

  if (userSocket) {
    console.log("sending message to user ", userId);
    userSocket.emit("notification", message);
  } else {
    console.log(userId, " do not exist");
  }
}

module.exports = {
  initializeSocketUtils,
  sendMessageToRoom,
  sendMessageToUser,
  emitAuctionCountdown,
  emitProxyBidExecuted,
  emitApprovalStatusChanged,
  emitPaymentProcessed,
};

