require("dotenv").config();
const { Server } = require("socket.io");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const express = require("express");
const compression = require("compression");
const { networkInterfaces } = require("os");
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

// Initialize Firebase Admin SDK (optional - only if service account file exists)
let firebaseAdmin = null;
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 
  path.join(__dirname, "auction-adca9-77aeb27bd088.json");

// Check if Firebase service account file exists
if (fs.existsSync(serviceAccountPath)) {
  try {
    const admin = require("firebase-admin");
    const serviceAccount = require(serviceAccountPath);
    const adminConfig = {
      credential: admin.credential.cert(serviceAccount),
    };
    admin.initializeApp(adminConfig);
    firebaseAdmin = admin;
    console.log("✅ Firebase Admin SDK initialized successfully");
  } catch (error) {
    console.log("⚠️  Firebase service account file exists but failed to initialize:", error.message);
    console.log("   Firebase features will be disabled.");
  }
} else {
  console.log("ℹ️  Firebase service account file not found. Firebase features disabled.");
  console.log("   To enable Firebase, add service account file at:", serviceAccountPath);
}

// Helper function to get network IP address
const getNetworkIP = () => {
  const nets = networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip internal (i.e. 127.0.0.1) and non-IPv4 addresses
      if (net.family === 'IPv4' && !net.internal) {
        return net.address;
      }
    }
  }
  return 'localhost';
};

const app = express();
const userSocketMap = new Map();

// Compression middleware - reduces response size and memory usage
app.use(compression({
  level: 6, // Compression level (1-9, 6 is a good balance)
  threshold: 1024, // Only compress responses larger than 1KB
  filter: (req, res) => {
    // Don't compress if client doesn't support it
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  }
}));

// Request timeout middleware - prevent hanging requests from consuming memory
app.use((req, res, next) => {
  const timeout = 30000; // 30 seconds timeout
  req.setTimeout(timeout, () => {
    if (!res.headersSent) {
      res.status(408).json({ error: 'Request timeout' });
    }
  });
  next();
});
// Validate required environment variables
const requiredEnvVars = ['PORT', 'CORS_ORIGINS', 'JWT_SECRET', 'FRONTEND_URL', 'STRIPE_SECRET_KEY'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:');
  missingEnvVars.forEach(varName => console.error(`   - ${varName}`));
  console.error('\nPlease create a .env file with all required variables.');
  console.error('See .env.example for reference.');
  process.exit(1);
}

// CORS Configuration from environment variables - CACHED for performance
const allowedOrigins = process.env.CORS_ORIGINS.split(',').map(origin => origin.trim());
const getAllowedOrigins = () => allowedOrigins;

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, or same-origin requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = getAllowedOrigins();
    
    // In development, allow all origins (including network IPs); in production, check against allowed list
    if (process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      // Check if origin matches allowed origins or is a network IP
      const isAllowed = allowedOrigins.includes(origin) || 
                        origin.includes(getNetworkIP()) ||
                        origin.startsWith('http://192.168.') ||
                        origin.startsWith('http://172.') ||
                        origin.startsWith('http://10.');
      
      if (isAllowed) {
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

// Body parser with memory limits to prevent DoS attacks
app.use(express.json({ limit: '10mb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Limit URL-encoded payload size
app.use(express.static(__dirname + "/../react-client/dist", {
  maxAge: '1d', // Cache static files for 1 day
  etag: true,   // Enable ETag for better caching
  lastModified: true
}));
const PORT = process.env.PORT;

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
      success_url: `${process.env.FRONTEND_URL}/secsess`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
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

// Firebase routes (only if Firebase is initialized)
// Reuse Firestore instance to avoid creating new instances on each request
let firestoreInstance = null;
if (firebaseAdmin) {
  firestoreInstance = firebaseAdmin.firestore();
  
  app.post("/api/firebase/sendFCM", async (req, res) => {
    try {
      const { data, topic } = req.body;
      
      const message = {
        data: data || {
          title: "FCM Notification",
          body: "This is a test notification.",
        },
        topic: topic || "testTopic",
      };

      // Send FCM message
      await firebaseAdmin.messaging().send(message);

      // Save message details in Firestore (reuse instance)
      const messagesCollection = firestoreInstance.collection("messages");

      const newMessage = {
        title: message.data.title,
        body: message.data.body,
        timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      };

      await messagesCollection.add(newMessage);

      res.status(200).send("FCM message sent and saved successfully.");
    } catch (error) {
      console.error("Error sending/saving FCM message:", error);
      res.status(500).send("Error sending/saving FCM message: " + error.message);
    }
  });

  app.post("/api/firebase/secure", async (req, res) => {
    try {
      const jwtToken = req.headers.authorization;

      if (!jwtToken) {
        throw new Error("Authorization header is missing.");
      }

      // Check for the "Bearer " prefix and extract the actual token
      const tokenParts = jwtToken.split(" ");

      if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
        throw new Error("Invalid Authorization header format.");
      }

      const actualToken = tokenParts[1];
      const jwtSecret = process.env.JWT_SECRET;

      // Verify and decode the JWT token
      const decodedToken = jwt.verify(actualToken, jwtSecret);

      console.log("Decoded Token:", decodedToken);

      // Send FCM message directly
      const message = {
        data: {
          title: "FCM Notification",
          body: "This is a test notification.",
        },
        topic: "testTopic",
      };

      await firebaseAdmin.messaging().send(message);

      // Save message details in Firestore (reuse instance)
      const messagesCollection = firestoreInstance.collection("messages");

      const newMessage = {
        title: message.data.title,
        body: message.data.body,
        timestamp: firebaseAdmin.firestore.FieldValue.serverTimestamp(),
      };

      await messagesCollection.add(newMessage);

      res.status(200).send("Token is valid!");
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).send("Unauthorized: " + error.message);
    }
  });
} else {
  // Firebase routes disabled - return helpful error messages
  app.post("/api/firebase/sendFCM", (req, res) => {
    res.status(503).json({ 
      error: "Firebase is not configured", 
      message: "Firebase service account file not found. Add service account file to enable Firebase features." 
    });
  });

  app.post("/api/firebase/secure", (req, res) => {
    res.status(503).json({ 
      error: "Firebase is not configured", 
      message: "Firebase service account file not found. Add service account file to enable Firebase features." 
    });
  });
}

app.get("/getallusers", async (req, res) => {
  try {
    // Use count instead of loading all records into memory
    const clientCount = await Client.count();
    const sellerCount = await Seller.count();
    res.status(200).json({ total: clientCount + sellerCount });
  } catch (error) {
    console.error("Error getting user count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Listen on all network interfaces (0.0.0.0) to allow network access
const HOST = process.env.HOST || '0.0.0.0';
const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`📡 Network access: http://${getNetworkIP()}:${PORT}`);
  console.log(`🔗 Local access: http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use.`);
    console.error(`   Please either:`);
    console.error(`   1. Stop the process using port ${PORT}`);
    console.error(`   2. Change the PORT in your .env file`);
    console.error(`\n   To find and kill the process on port ${PORT}, run:`);
    console.error(`   lsof -ti:${PORT} | xargs kill -9`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
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
  
  // Clean up any existing socket for this user to prevent memory leaks
  const existingSocket = userSocketMap.get(userId);
  if (existingSocket && existingSocket.id !== socket.id) {
    existingSocket.disconnect(true);
  }
  
  userSocketMap.set(userId, socket);
  console.log("User Connected ", userId);

  socket.on("create", function (room) {
    if (!room) return; // Validate room parameter
    
    const rooms = Array.from(socket.rooms);
    // Remove the default room from the list (if present)
    const currentRoom = rooms.find((r) => r !== socket.id);

    // Leave the current room if exists
    if (currentRoom) {
      socket.leave(currentRoom);
    }

    // Join the new room
    socket.join(room.toString());
  });

  socket.on("placeBid", (message) => {
    if (!message || !message.itemId) return; // Validate message
    
    // Broadcast to all sockets in the same room (item room)
    const itemId = message.itemId.toString();
    socket.to(itemId).emit("placedBid", message);
  });

  socket.on("disconnect", (reason) => {
    console.log("User disconnected", userId, "Reason:", reason);

    // Clean up all rooms
    const rooms = Array.from(socket.rooms);
    rooms.forEach(room => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });

    // Remove from user map
    if (userSocketMap.get(userId)?.id === socket.id) {
      userSocketMap.delete(userId);
    }
  });

  // Handle connection errors
  socket.on("error", (error) => {
    console.error("Socket error for user", userId, ":", error);
    if (userSocketMap.get(userId)?.id === socket.id) {
      userSocketMap.delete(userId);
    }
  });
});
