const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const httpServer = http.createServer();
const PORT = 7000;
httpServer.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});

const Bid = require("./models/bid");
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User with id-${socket.id} joined room - ${roomId}`);
  });

  // socket.on("send_bid", async (data) => {
  //   console.log(data, "DATA");

  //   try {
  //     // Store the bid message in the database using Sequelize
  //     const newBid = await Bid.create({
  //       bidAmount: data.bidAmount,
  //     });
  //     // Emit the newly stored bid to the room
  //     socket
  //       .to(data.roomId)
  //       .emit("receive_bid", { bid: newBid, roomId: data.roomId });
  //   } catch (error) {
  //     console.error("Error occurred while saving bid pric:", error);
  //   }
  // });

  socket.on("send_bid", async (data) => {
    try {
      const newBid = await Bid.create({
        bidAmount: data.bidAmount,
        itemId: data.itemId,
        ClientId: data.ClientId, // Ensure you use the correct property
      });
      console.log(data, "data");
      console.log("Bid saved:", newBid);
      console.log(newBid, " newBid111");
      // Emit the newly stored bid to the room
      socket
        .to(data.roomId)
        .emit("receive_bid", { bid: newBid, itemId: data.ClientId });
    } catch (error) {
      console.error("Error occurred while saving bid price:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});
