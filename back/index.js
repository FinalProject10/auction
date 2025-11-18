require("dotenv").config();
const { Server } = require("socket.io");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const express = require("express");
const db = require("./database/index");
const {
  Bid,
  Client,
  Admin,
  Items,
  Memberships,
  Seller,
  Reclamation,
} = require("./models/relations");
const { initializeSocketUtils, sendMessageToRoom } = require("./utils/socketUtils");
const clientRoutes = require("./routes/client");
const adminRoutes = require("./routes/admin");
const dashboard = require("./routes/AdminDashboardRouter");
const itemsRoute = require("./routes/itemsRoute");
const cloudRoute = require("./routes/cloudinary");
const cors = require("cors");
const ProductsRouter = require("./routes/products");
const sellerRouter = require("./routes/seller");
const memRouter = require("./routes/memberships");
const bidRouter = require("./routes/bidRouter");

const app = express();
const userSocketMap = new Map();
// CORS Configuration from environment variables
const getAllowedOrigins = () => {
  if (process.env.CORS_ORIGINS) {
    return process.env.CORS_ORIGINS.split(',').map(origin => origin.trim());
  }
  // Default to localhost for development
  return ['http://localhost:3000', 'http://localhost:3001'];
};

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or same-origin requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = getAllowedOrigins();
    
    // In development, allow all origins; in production, check against allowed list
    if (process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};
app.use(cors(corsOptions));

// Handle preflight OPTIONS requests explicitly
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5001;

const storeItemMap = new Map();

// Assume you have store items defined in some way, for example:
storeItemMap.set("item1", { id: "item1", name: "basic", priceInDt: 100 });
storeItemMap.set("item2", { id: "item2", name: "vip", priceInDt: 100 });
storeItemMap.set("item3", { id: "item3", name: "basic", priceInDt: 100 });
storeItemMap.set("item4", { id: "item4", name: "vip", priceInDt: 100 });
// Add more store items as needed
////
// app.get("/bidNotification", async (req, res) => {
//   try {
//     sendMessageToUser(3, JSON.stringify(bidData));
//     console.log(JSON.stringify(bidData), "bidData##########");
//     return res.json({ bidData });
//   } catch (e) {
//     console.error(e.message);
//     res.status(500).json({ error: e.message });
//   }
// });
/////////////

app.get("/bidNotification/:id", async (req, res) => {
  try {
    const lastBid = await Bid.findOne({
      attributes: ["bidAmount", "createdAt"],
      include: {
        model: Client,
        attributes: ["name"],
      },
      order: [["createdAt", "DESC"]],
    });

    if (lastBid) {
      const bidAmount = parseInt(lastBid.bidAmount, 10);

      sendMessageToRoom(parseInt(req.params.id), bidAmount.toString());
      console.log(bidAmount, "bidAmount##########");
      return res.json(bidAmount);
    } else {
      return res.json({ message: "No bids found" });
    }
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: e.message });
  }
});
///

///
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { id, quantity } = req.body;

    if (!id || !quantity) {
      throw new Error("Invalid or missing items in the request body");
    }

    const storeItem = storeItemMap.get(id);

    if (!storeItem) {
      throw new Error(`Store item with id ${id} not found`);
    }

    const lineItems = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: storeItem.name || "Unnamed Product",
          },
          unit_amount: storeItem.priceInDt || 0,
        },
        quantity: quantity || 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/secsess`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/cancel`,
    });

    // Handle the session object as needed (e.g., send it as a response)
    res.json({ sessionId: session.id });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: e.message });
  }
});
app.use("/membership", memRouter);
app.use("/bid", bidRouter);
app.use("/dash", dashboard);
app.use("/seller", sellerRouter);
app.use("/client", clientRoutes);
app.use("/admin", adminRoutes);
app.use("/products", ProductsRouter);
app.use("/items", itemsRoute);
app.use("/cloudinary", cloudRoute);
app.get("/getallusers", async (req, res) => {
  let d = await Client.findAll();
  let s = await Seller.findAll();
  res.status(200).json({ total: d.length + s.length });
});
const server = app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
const socketCorsOrigins = process.env.SOCKET_CORS_ORIGINS 
  ? process.env.SOCKET_CORS_ORIGINS.split(',').map(origin => origin.trim())
  : getAllowedOrigins();

const io = new Server(server, {
  cors: {
    origin: socketCorsOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  },
});

// Initialize socket utilities to avoid circular dependency
initializeSocketUtils(io, userSocketMap);

io.on("connection", (socket) => {
  const userId = +socket.handshake.query.userId;
  const itemsId = +socket.handshake.query.itemsId;
  console.log(userId, itemsId);
  userSocketMap.set(userId, socket);
  console.log("User Connected ", userId);

  socket.on("create", function (room) {
    console.log("room", room);

    const rooms = Array.from(socket.rooms);

    // Remove the default room from the list (if present)
    const currentRoom = rooms.find((room) => room !== socket.id);

    // Leave the current room if exists
    if (currentRoom) {
      socket.leave(currentRoom);
      console.log("Left room: ", currentRoom);
    }

    // Join the new room
    socket.join(room);
  });

  socket.on("placeBid", (message) => {
    console.log("Socket placeBid event:", message);
    // Broadcast to all sockets in the same room (item room)
    const itemId = message.itemId;
    if (itemId) {
      socket.to(itemId.toString()).emit("placedBid", message);
      console.log(`Broadcasted bid to room ${itemId}:`, message);
    } else {
      // Fallback: broadcast to all connected clients
      socket.broadcast.emit("placedBid", message);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected", userId);

    // Get the list of rooms the user is currently in
    const rooms = Array.from(socket.rooms);

    // Remove the default room from the list (if present)
    const currentRoom = rooms.find((room) => room !== socket.id);

    if (currentRoom) {
      socket.leave(currentRoom);
      console.log("Left room: ", currentRoom);
    }

    userSocketMap.delete(userId);
  });
});
