require("dotenv").config;

const stripe = require("stripe")(
  "sk_test_51Oa23kFgyHOf8MRLBiQ7NHVMbtwjQadZr4dQEePKGWzkjL5y1xpBDSD7COvLpuLiTXe5LQe3GUuQlEp7aF4Qf76l009Im1ojcX"
);

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
const sellersRoutes = require("./routes/seller");
const clientRoutes = require("./routes/client");
const adminRoutes = require("./routes/admin");
const dashboard = require("./routes/AdminDashboardRouter");
const itemsRoute = require("./routes/itemsRoute");
const cloudRoute = require("./routes/cloudinary");
const cors = require("cors");
const ProductsRouter = require("./routes/products");
const sellerRouter = require("./routes/seller");
const getInTouch=require("./routes/getInTouch.js")

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + "/../react-client/dist"));
app.use(express.urlencoded({ extended: true }));
const PORT = 5000;

const storeItemMap = new Map();

// Assume you have store items defined in some way, for example:
storeItemMap.set("item1", { id: "item1", name: "Product A", priceInDt: 100 });
storeItemMap.set("item2", { id: "item2", name: "Product B", priceInDt: 150 });
// Add more store items as needed

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
      success_url: `http://localhost:3000/secsess`, // Update with your frontend success URL
      cancel_url: `http://localhost:3000/cancel`, // Update with your frontend cancel URL
    });

    // Handle the session object as needed (e.g., send it as a response)
    res.json({ sessionId: session.id });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: e.message });
  }
});

app.use("/dash", dashboard);
app.use("/seller", sellerRouter);
app.use("/client", clientRoutes);
app.use("/admin", adminRoutes);
app.use("/products", ProductsRouter);
app.use("/items", itemsRoute);
app.use("/cloudinary", cloudRoute);
app.use("/getInTouch",getInTouch)
app.get("/getallusers", async (req, res) => {
  let d = await Client.findAll();
  let s = await Seller.findAll();
  res.status(200).json({ total: d.length + s.length });
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
