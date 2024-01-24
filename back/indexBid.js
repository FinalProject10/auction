const { Server } = require("socket.io");
const Bid = require("./models/bid");
const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 7000 });

server.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User with id-${socket.id} joined room - ${roomId}`);
  });

  socket.on("send_bid", async (data) => {
    try {
      const newBid = await Bid.create({
        bidAmount: data.bidAmount,
        itemId: data.itemId,
        ClientId: data.ClientId,
      });

      io.to(data.roomId).emit("receive_bid", {
        bid: newBid,
        itemId: data.ClientId,
      });
    } catch (error) {
      console.error("Error occurred while saving bid price:", error);
      // Inform the client about the error
      socket.emit("bid_error", { message: "Error submitting bid." });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.on("connection", (socket) => {
  console.log("A user connected:", socket._socket.remoteAddress);

  // Rest of your server code...

  socket.on("message", (message) => {
    console.log(
      `Received message from user ${socket._socket.remoteAddress}: ${message}`
    );
    // Handle the message here...
  });

  socket.on("close", () => {
    console.log("A user disconnected:", socket._socket.remoteAddress);
  });
}); // const http = require("http");
// const { Server } = require("socket.io");

// const cors = {
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST"],
//   allowedHeaders: ["my-custom-header"],
//   credentials: true,
// };

// const httpServer = http.createServer((req, res) => {
//   // Handle your HTTP requests here if needed
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("WebSocket server is running");
// });

// const io = new Server(httpServer, { cors });

// io.on("connection", (socket) => {
//   console.log("A user connected:", socket.id);

//   socket.on("join_room", (roomId) => {
//     socket.join(roomId);
//     console.log(`User with id-${socket.id} joined room - ${roomId}`);
//   });

//   socket.on("send_bid", async (data) => {
//     try {
//       const newBid = await Bid.create({
//         bidAmount: data.bidAmount,
//         itemId: data.itemId,
//         ClientId: data.ClientId,
//       });

//       io.to(data.roomId).emit("receive_bid", {
//         bid: newBid,
//         itemId: data.ClientId,
//       });
//     } catch (error) {
//       console.error("Error occurred while saving bid price:", error);
//       // Inform the client about the error
//       socket.emit("bid_error", { message: "Error submitting bid." });
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected:", socket.id);
//   });
// });

// const PORT = 7000;

// httpServer.listen(PORT, () => {
//   console.log(`Socket.io server is running on port ${PORT}`);
// });
